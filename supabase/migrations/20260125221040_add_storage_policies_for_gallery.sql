/*
  # Add Storage Policies for Wedding Photos Gallery

  This migration adds storage policies to allow public access to wedding gallery photos.
  
  1. Storage Policies
    - Allow public read access to all objects in wedding-photos bucket
    - Allow public insert access for uploading gallery photos
    - Allow public update access for modifying photos
    - Allow public delete access for removing photos
  
  2. Security
    - Bucket is already public, these policies enable file operations
    - No authentication required for gallery photos
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public Access to Wedding Photos'
  ) THEN
    CREATE POLICY "Public Access to Wedding Photos"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'wedding-photos');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public Upload to Wedding Photos'
  ) THEN
    CREATE POLICY "Public Upload to Wedding Photos"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'wedding-photos');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public Update Wedding Photos'
  ) THEN
    CREATE POLICY "Public Update Wedding Photos"
      ON storage.objects FOR UPDATE
      USING (bucket_id = 'wedding-photos')
      WITH CHECK (bucket_id = 'wedding-photos');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public Delete Wedding Photos'
  ) THEN
    CREATE POLICY "Public Delete Wedding Photos"
      ON storage.objects FOR DELETE
      USING (bucket_id = 'wedding-photos');
  END IF;
END $$;
