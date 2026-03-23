import { useEffect, useState } from 'react';
import API from '../api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ course_name: '', course_code: '', credit_hours: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchCourses = async () => {
    const res = await API.get('/courses');
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/courses/${editingId}`, form);
        setMessage('Course updated successfully.');
      } else {
        await API.post('/courses', form);
        setMessage('Course added successfully.');
      }
      setForm({ course_name: '', course_code: '', credit_hours: '' });
      setEditingId(null);
      fetchCourses();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Operation failed.');
    }
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditingId(course.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="grid">
      <div className="card">
        <h2>{editingId ? 'Edit Course' : 'Add Course'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Course Name" value={form.course_name} onChange={(e) => setForm({ ...form, course_name: e.target.value })} />
          <input type="text" placeholder="Course Code" value={form.course_code} onChange={(e) => setForm({ ...form, course_code: e.target.value })} />
          <input type="number" placeholder="Credit Hours" value={form.credit_hours} onChange={(e) => setForm({ ...form, credit_hours: e.target.value })} />
          <button type="submit">{editingId ? 'Update Course' : 'Add Course'}</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="card">
        <h2>Course List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Credit Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.course_name}</td>
                <td>{course.course_code}</td>
                <td>{course.credit_hours}</td>
                <td>
                  <button onClick={() => handleEdit(course)}>Edit</button>
                  <button onClick={() => handleDelete(course.id)} className="danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courses;
