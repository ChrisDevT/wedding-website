/*
  # Add photo categories and seed gallery photos

  1. Changes
    - Add `category` column to wedding_photos table to distinguish between gallery photos and user uploads
    - Add `display_order` column for controlling photo display sequence
    - Insert existing gallery photos into the database
  
  2. Categories
    - 'gallery': Curated photos for the main gallery display
    - 'user_upload': Photos uploaded by guests
    - 'misc': Miscellaneous photos used in other sections
  
  3. Gallery Photos Seeded
    - kayaking.jpeg (wide format)
    - bali-waterfall.jpeg (tall format)
    - maldives-swings.jpeg (wide format)
    - sunset-pool.jpeg (wide format)
    - wedding-guest.jpeg (tall format)
    - forest-selfie.jpeg (tall format)
*/

-- Add category column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_photos' AND column_name = 'category'
  ) THEN
    ALTER TABLE wedding_photos ADD COLUMN category text DEFAULT 'user_upload';
  END IF;
END $$;

-- Add display_order column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_photos' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE wedding_photos ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

-- Add aspect_ratio column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_photos' AND column_name = 'aspect_ratio'
  ) THEN
    ALTER TABLE wedding_photos ADD COLUMN aspect_ratio text DEFAULT 'tall';
  END IF;
END $$;

-- Insert gallery photos if they don't already exist
INSERT INTO wedding_photos (guest_name, file_path, file_name, category, aspect_ratio, display_order, caption)
VALUES 
  ('Admin', 'gallery/kayaking.jpeg', 'kayaking.jpeg', 'gallery', 'wide', 1, 'Kayaking adventure'),
  ('Admin', 'gallery/bali-waterfall.jpeg', 'bali-waterfall.jpeg', 'gallery', 'tall', 2, 'Bali waterfall'),
  ('Admin', 'gallery/maldives-swings.jpeg', 'maldives-swings.jpeg', 'gallery', 'wide', 3, 'Maldives swings'),
  ('Admin', 'gallery/sunset-pool.jpeg', 'sunset-pool.jpeg', 'gallery', 'wide', 4, 'Sunset by the pool'),
  ('Admin', 'gallery/wedding-guest.jpeg', 'wedding-guest.jpeg', 'gallery', 'tall', 5, 'Wedding celebration'),
  ('Admin', 'gallery/forest-selfie.jpeg', 'forest-selfie.jpeg', 'gallery', 'tall', 6, 'Forest selfie')
ON CONFLICT DO NOTHING;