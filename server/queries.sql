

CREATE TABLE gratitudeWall (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  emoji TEXT,
  mood_tag TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO gratitudewall (name, message, emoji, mood_tag, likes)
VALUES
  ('Alice', 'Thank you for helping me through a tough week!', '💖', 'Supportive', 4),
  ('Oliver', 'Appreciate your constant positivity and energy!', '🌞', 'Motivation', 6),
  ('George', 'You always brighten up our meetings. Thanks!', '🌻', 'Happy', 5),
  ('Amelia', 'Grateful for your hard work and kindness.', '🌸', 'Grateful', 3),
  ('Eva', 'Thanks for lending an ear when I needed one.', '🌧️', 'Supportive', 2);

  SELECT * FROM gratitudewall;

SELECT name, message FROM gratitudewall;

-- the keyword WHERE adds a condition to our SELECT
SELECT * FROM gratitudewall WHERE name = 'Oliver';

SELECT timestampz FROM gratitudewall;