import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div>
        <h2>Student Course Management</h2>
        {user && <p>Welcome, {user.name}</p>}
      </div>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/students">Students</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/enrollments">Enrollments</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
