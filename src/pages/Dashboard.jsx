import "../styles/dashboard.css"

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to Micro-Frontend Architecture</h2>
        <p>A scalable, modular approach to building enterprise applications</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Chat Application</h3>
          <p>Real-time messaging and communication features</p>
          <a href="/chat" className="feature-link">
            Explore Chat
          </a>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📧</div>
          <h3>Email Application</h3>
          <p>Email management and composition tools</p>
          <a href="/email" className="feature-link">
            Explore Email
          </a>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏗️</div>
          <h3>Module Federation</h3>
          <p>Webpack-based micro-frontend architecture</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Shared Design System</h3>
          <p>Consistent styling and components across apps</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📡</div>
          <h3>Event Communication</h3>
          <p>Seamless inter-app communication via events</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Scalability</h3>
          <p>Easy to add new micro-frontends</p>
        </div>
      </div>

      <div className="architecture-section">
        <h3>Architecture Overview</h3>
        <div className="architecture-diagram">
          <div className="arch-box">
            <strong>Host Application</strong>
            <p>Port 3000</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-box">
            <strong>Chat Micro-Frontend</strong>
            <p>Port 3001</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-box">
            <strong>Email Micro-Frontend</strong>
            <p>Port 3002</p>
          </div>
        </div>
      </div>
    </div>
  )
}
