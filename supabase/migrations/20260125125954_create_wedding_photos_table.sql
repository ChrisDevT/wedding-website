/*
  # Create Wedding Photos Table
  
  1. New Tables
    - `wedding_photos`
      - `id` (uuid, primary key) - Unique identifier for each photo
      - `guest_name` (text) - Name of person uploading
      - `file_path` (text) - Path to photo in storage
      - `file_name` (text) - Original filename
      - `caption` (text, optional) - Optional caption
      - `created_at` (timestamptz) - Upload timestamp
  
  2. Security
    - Enable RLS
    - Allow public to insert and view photos
    - Allow authenticated users to delete photos (admin)
*/

-- Create wedding photos table
CREATE TABLE IF NOT EXISTS wedding_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  file_path text NOT NULL,
  file_name text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE wedding_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Wedding Photos
CREATE POLICY "Anyone can insert photos"
  ON wedding_photos FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view photos"
  ON wedding_photos FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can delete photos"
  ON wedding_photos FOR DELETE
  TO authenticated
  USING (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON wedding_photos(created_at DESC);