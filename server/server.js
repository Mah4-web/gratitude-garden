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

// ✅ Enhanced GET all posts with sorting + limiting support
app.get('/gratitudewall', async (req, res) => {
  const sort = req.query.sort === 'likes' ? 'likes DESC' : 'created_at DESC';
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;

  try {
    const baseQuery = `SELECT * FROM gratitudewall ORDER BY ${sort}`;
    const query = limit ? `${baseQuery} LIMIT $1` : baseQuery;
    const values = limit ? [limit] : [];

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// POST new gratitude message
app.post('/gratitudewall', async (req, res) => {
  const { name, message, emoji, mood_tag } = req.body.formValues;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO gratitudewall (name, message, emoji, mood_tag, likes)
       VALUES ($1, $2, $3, $4, 0) RETURNING *`,
      [name, message, emoji || '🌱', mood_tag || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// DELETE /gratitudewall/:id
app.delete('/gratitudewall/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const result = await db.query('DELETE FROM gratitudewall WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Like a message
app.post('/gratitudewall/:id/like', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const result = await db.query(
      'UPDATE gratitudewall SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('LIKE error:', err);
    res.status(500).json({ error: 'Could not like message' });
  }
});

// Stats
app.get('/stats', async (req, res) => {
  try {
    const countResult = await db.query('SELECT COUNT(*) FROM gratitudewall');
    const likesResult = await db.query('SELECT SUM(likes) FROM gratitudewall');
    res.json({
      messages: parseInt(countResult.rows[0].count, 10),
      likes: parseInt(likesResult.rows[0].sum, 10) || 0,
    });
  } catch (err) {
    console.error('STATS error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Root route to verify server is live
app.get('/', (req, res) => {
  res.send('🌱 Gratitude Wall API is live!');
});
