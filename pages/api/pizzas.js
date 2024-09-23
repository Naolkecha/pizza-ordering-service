import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT * FROM pizzas');
    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ error: 'No pizzas found' });
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pizzas' });
  }
}
