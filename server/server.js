import express from 'express';
import cors from 'cors';
import { db } from "./dbConnection.js"; 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 2025;

app.listen(PORT, () => {
  console.log(`🌱 Server is running on port ${PORT}`);
});

// GET all posts
app.get('/gratitudeWall', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gratitudeWall ORDER BY created_at DESC;');
    res.json(result.rows);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// POST new gratitude message
app.post('/gratitudeWall', async (req, res) => {
  const { name, message, emoji, mood_tag } = req.body.formValues;
  try {
    const result = await db.query(
      `INSERT INTO gratitudeWall (name, message, emoji, mood_tag, likes)
       VALUES ($1, $2, $3, $4, 0) RETURNING *`,
      [name, message, emoji, mood_tag]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// Like a message
app.post('/gratitudeWall/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'UPDATE gratitudeWall SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Could not like message' });
  }
});

// Stats
app.get('/stats', async (req, res) => {
  try {
    const count = await db.query('SELECT COUNT(*) FROM gratitudeWall');
    const likes = await db.query('SELECT SUM(likes) FROM gratitudeWall');
    res.json({
      messages: count.rows[0].count,
      likes: likes.rows[0].sum || 0,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Root route to verify server is live
app.get('/', (req, res) => {
  res.send('🌱 Gratitude Wall API is live!');
});
