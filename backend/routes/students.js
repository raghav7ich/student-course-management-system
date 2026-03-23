const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students.', error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { full_name, email, phone, address } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ message: 'Full name and email are required.' });
    }

    await pool.query(
      'INSERT INTO students (full_name, email, phone, address) VALUES (?, ?, ?, ?)',
      [full_name, email, phone || null, address || null]
    );

    res.status(201).json({ message: 'Student added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add student.', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone, address } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ message: 'Full name and email are required.' });
    }

    await pool.query(
      'UPDATE students SET full_name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [full_name, email, phone || null, address || null, id]
    );

    res.json({ message: 'Student updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update student.', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM students WHERE id = ?', [id]);
    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student.', error: error.message });
  }
});

module.exports = router;
