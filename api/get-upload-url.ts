import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'tatiana-christian-wedding-photos';
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/heic',
  'image/heif',
  'image/webp',
  'video/mp4',
  'video/quicktime',
];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, fileType, fileSize } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'fileName and fileType are required' });
    }

    if (!ALLOWED_TYPES.includes(fileType.toLowerCase())) {
      return res.status(400).json({ error: 'File type not allowed' });
    }

    if (fileSize && fileSize > MAX_FILE_SIZE) {
      return res.status(400).json({ error: 'File too large (max 50MB)' });
    }

    // Generate unique key
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const ext = fileName.split('.').pop() || 'jpg';
    const key = `guest-uploads/${timestamp}-${randomString}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'eu-west-1'}.amazonaws.com/${key}`;

    return res.status(200).json({ uploadUrl, publicUrl, key });
  } catch (error: any) {
    console.error('Error generating presigned URL:', error);
    return res.status(500).json({ error: 'Failed to generate upload URL', details: error.message });
  }
}
