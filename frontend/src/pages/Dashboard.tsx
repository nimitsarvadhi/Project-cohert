import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

interface User {
  username: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (!token) {
      navigate("/");
      return;
    }

    if (username) {
      setUser({ username });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Cohort</span>
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👥</span>
            <span className="nav-text">Users</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📊</span>
            <span className="nav-text">Analytics</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📝</span>
            <span className="nav-text">Reports</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1>Dashboard</h1>
          </div>

          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="user-profile">
              <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
              <span className="user-name">{user.username}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h2>Welcome back, {user.username}! 👋</h2>
            <p>Here's what's happening with your project today</p>
          </section>

          {/* Stats Cards */}
          <section className="stats-section">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#e0e7ff" }}>
                👥
              </div>
              <div className="stat-content">
                <div className="stat-label">Total Users</div>
                <div className="stat-value">1,234</div>
                <div className="stat-change positive">+12% from last month</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#f0fdf4" }}>
                📊
              </div>
              <div className="stat-content">
                <div className="stat-label">Total Revenue</div>
                <div className="stat-value">$45,231</div>
                <div className="stat-change positive">+8% from last month</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#fef3c7" }}>
                📈
              </div>
              <div className="stat-content">
                <div className="stat-label">Growth Rate</div>
                <div className="stat-value">23.5%</div>
                <div className="stat-change positive">+5% from last month</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: "#fce7f3" }}>
                ✅
              </div>
              <div className="stat-content">
                <div className="stat-label">Tasks Completed</div>
                <div className="stat-value">128</div>
                <div className="stat-change">45 pending</div>
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <div className="chart-card">
              <h3>Revenue Overview</h3>
              <div className="chart-placeholder">
                <p>📈 Chart would be displayed here</p>
                <p>(Integrate Chart.js or similar library)</p>
              </div>
            </div>

            <div className="chart-card">
              <h3>User Activity</h3>
              <div className="chart-placeholder">
                <p>📊 Chart would be displayed here</p>
                <p>(Integrate Chart.js or similar library)</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="activity-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">👤</div>
                <div className="activity-content">
                  <p className="activity-title">New user registration</p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">💳</div>
                <div className="activity-content">
                  <p className="activity-title">Payment received</p>
                  <p className="activity-time">4 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">⚠️</div>
                <div className="activity-content">
                  <p className="activity-title">System update completed</p>
                  <p className="activity-time">1 day ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-content">
                  <p className="activity-title">Report generated</p>
                  <p className="activity-time">2 days ago</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
