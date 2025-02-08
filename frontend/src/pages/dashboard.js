import React from "react";
import { FaFileAlt, FaUpload, FaChartPie, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="user-info">
          <img
            src="https://via.placeholder.com/50"
            alt="User Avatar"
            className="avatar"
          />
          <h3>Welcome, User</h3>
        </div>
        <nav>
          <ul>
            <li className="active">
              <FaFileAlt /> CV Overview
            </li>
            <li onClick={() => navigate("/upload")}> {/* Navigate on click */}
              <FaUpload /> Upload CV
            </li>
            <li>
              <FaChartPie /> Analytics
            </li>
            <li>
              <FaCog /> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h2>Dashboard</h2>
          <input type="text" placeholder="Search..." className="search-bar" />
        </header>

        <section className="stats">
          <div className="card">
            <h3>Total CVs</h3>
            <p>15</p>
          </div>
          <div className="card">
            <h3>Recent Uploads</h3>
            <p>2 This Week</p>
          </div>
          <div className="card">
            <h3>Token Usage</h3>
            <p>75%</p>
          </div>
        </section>

        <section className="recent-activity">
          <h3>Recent Activity</h3>
          <ul>
            <li>Updated CV - Frontend Developer</li>
            <li>Uploaded CV - Data Analyst</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
