/*
  # Add missing engagement and misc photos to database

  1. New Photos Added
    - `engagement/engagement.jpeg`: Engagement photo used in "We Said Yes" section
    - `misc/fall-couple.jpeg`: Decorative photo used in Photo Upload section
  
  2. Categories
    - 'engagement': Special category for engagement photos
    - 'misc': Miscellaneous photos used as decorative elements
  
  3. Purpose
    - Ensures all photos in storage are tracked in the database
    - Enables dynamic loading instead of hardcoded URLs
    - Maintains consistency across photo management system
*/

-- Insert engagement photo if it doesn't exist
INSERT INTO wedding_photos (guest_name, file_path, file_name, category, aspect_ratio, display_order, caption)
VALUES 
  ('Admin', 'engagement/engagement.jpeg', 'engagement.jpeg', 'engagement', 'wide', 1, 'We said yes!')
ON CONFLICT DO NOTHING;

-- Insert misc fall couple photo if it doesn't exist
INSERT INTO wedding_photos (guest_name, file_path, file_name, category, aspect_ratio, display_order, caption)
VALUES 
  ('Admin', 'misc/fall-couple.jpeg', 'fall-couple.jpeg', 'misc', 'tall', 1, 'Fall couple photo')
ON CONFLICT DO NOTHING;