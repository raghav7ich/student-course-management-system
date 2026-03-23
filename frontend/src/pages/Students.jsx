import { useEffect, useState } from 'react';
import API from '../api';

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchStudents = async () => {
    const res = await API.get('/students');
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/students/${editingId}`, form);
        setMessage('Student updated successfully.');
      } else {
        await API.post('/students', form);
        setMessage('Student added successfully.');
      }
      setForm({ full_name: '', email: '', phone: '', address: '' });
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Operation failed.');
    }
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="grid">
      <div className="card">
        <h2>{editingId ? 'Edit Student' : 'Add Student'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="text" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <button type="submit">{editingId ? 'Update Student' : 'Add Student'}</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="card">
        <h2>Student List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.full_name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                  <button onClick={() => handleDelete(student.id)} className="danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
