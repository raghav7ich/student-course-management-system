const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.id, s.full_name AS student_name, c.course_name, e.semester, e.enrolled_on,
             e.student_id, e.course_id
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enrollments.', error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { student_id, course_id, semester } = req.body;

    if (!student_id || !course_id || !semester) {
      return res.status(400).json({ message: 'Student, course, and semester are required.' });
    }

    await pool.query(
      'INSERT INTO enrollments (student_id, course_id, semester) VALUES (?, ?, ?)',
      [student_id, course_id, semester]
    );

    res.status(201).json({ message: 'Enrollment created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create enrollment.', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, course_id, semester } = req.body;

    if (!student_id || !course_id || !semester) {
      return res.status(400).json({ message: 'Student, course, and semester are required.' });
    }

    await pool.query(
      'UPDATE enrollments SET student_id = ?, course_id = ?, semester = ? WHERE id = ?',
      [student_id, course_id, semester, id]
    );

    res.json({ message: 'Enrollment updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update enrollment.', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM enrollments WHERE id = ?', [id]);
    res.json({ message: 'Enrollment deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete enrollment.', error: error.message });
  }
});

module.exports = router;
