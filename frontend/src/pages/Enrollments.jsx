import { useEffect, useState } from 'react';
import API from '../api';

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ student_id: '', course_id: '', semester: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    const [enrollmentRes, studentRes, courseRes] = await Promise.all([
      API.get('/enrollments'),
      API.get('/students'),
      API.get('/courses')
    ]);
    setEnrollments(enrollmentRes.data);
    setStudents(studentRes.data);
    setCourses(courseRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/enrollments/${editingId}`, form);
        setMessage('Enrollment updated successfully.');
      } else {
        await API.post('/enrollments', form);
        setMessage('Enrollment added successfully.');
      }
      setForm({ student_id: '', course_id: '', semester: '' });
      setEditingId(null);
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Operation failed.');
    }
  };

  const handleEdit = (item) => {
    setForm({ student_id: item.student_id, course_id: item.course_id, semester: item.semester });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/enrollments/${id}`);
    fetchData();
  };

  return (
    <div className="grid">
      <div className="card">
        <h2>{editingId ? 'Edit Enrollment' : 'Add Enrollment'}</h2>
        <form onSubmit={handleSubmit}>
          <select value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })}>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>{student.full_name}</option>
            ))}
          </select>
          <select value={form.course_id} onChange={(e) => setForm({ ...form, course_id: e.target.value })}>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.course_name}</option>
            ))}
          </select>
          <input type="text" placeholder="Semester" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} />
          <button type="submit">{editingId ? 'Update Enrollment' : 'Add Enrollment'}</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="card">
        <h2>Enrollment List</h2>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((item) => (
              <tr key={item.id}>
                <td>{item.student_name}</td>
                <td>{item.course_name}</td>
                <td>{item.semester}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Enrollments;
