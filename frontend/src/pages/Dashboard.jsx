function Dashboard() {
  return (
    <div className="card">
      <h1>Dashboard</h1>

      <p>
        Welcome to the <b>Student Course Management System</b>. This application
        allows users to manage students, courses, and enrollments efficiently
        using a full-stack web architecture.
      </p>

      <h3>Key Features:</h3>
      <ul>
        <li>User Authentication (Register & Login)</li>
        <li>Student Management (Add, View, Update, Delete)</li>
        <li>Course Management (Create and Manage Courses)</li>
        <li>Enrollment System (Assign students to courses)</li>
      </ul>

      <h3>Technologies Used:</h3>
      <ul>
        <li>Frontend: React + Vite</li>
        <li>Backend: Node.js + Express</li>
        <li>Database: MySQL</li>
        <li>Authentication: JWT</li>
      </ul>

      <p>
        This dashboard provides a central overview of the system and helps users
        navigate through different modules easily.
      </p>
    </div>
  );
}

export default Dashboard;