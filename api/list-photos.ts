import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'tatiana-christian-wedding-photos';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'guest-uploads/',
      MaxKeys: 200,
    });

    const response = await s3Client.send(command);

    const photos = (response.Contents || [])
      .filter((obj) => obj.Key && !obj.Key.endsWith('/'))
      .sort((a, b) => {
        const aTime = a.LastModified?.getTime() || 0;
        const bTime = b.LastModified?.getTime() || 0;
        return bTime - aTime;
      })
      .map((obj) => ({
        key: obj.Key,
        url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'eu-west-1'}.amazonaws.com/${obj.Key}`,
        lastModified: obj.LastModified,
        size: obj.Size,
      }));

    // Cache for 30 seconds
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json({ photos });
  } catch (error: any) {
    console.error('Error listing photos:', error);
    return res.status(500).json({ error: 'Failed to list photos', details: error.message });
  }
}
