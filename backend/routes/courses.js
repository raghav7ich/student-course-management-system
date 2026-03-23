const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses.', error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { course_name, course_code, credit_hours } = req.body;

    if (!course_name || !course_code || !credit_hours) {
      return res.status(400).json({ message: 'All course fields are required.' });
    }

    await pool.query(
      'INSERT INTO courses (course_name, course_code, credit_hours) VALUES (?, ?, ?)',
      [course_name, course_code, credit_hours]
    );

    res.status(201).json({ message: 'Course added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add course.', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { course_name, course_code, credit_hours } = req.body;

    if (!course_name || !course_code || !credit_hours) {
      return res.status(400).json({ message: 'All course fields are required.' });
    }

    await pool.query(
      'UPDATE courses SET course_name = ?, course_code = ?, credit_hours = ? WHERE id = ?',
      [course_name, course_code, credit_hours, id]
    );

    res.json({ message: 'Course updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course.', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    res.json({ message: 'Course deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course.', error: error.message });
  }
});

module.exports = router;
