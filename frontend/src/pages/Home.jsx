import { Link } from "react-router-dom";
import authService from "../services/authService";

export default function Home() {
  const user = authService.getCurrentUser();

  return (
    <div className="home-page">
      <div className="hero-glow"></div>

      <div className="hero-badge">
        <span className="hero-badge-dot"></span>
        AI-powered code analysis
      </div>

      <h1>
        Write Better.
        <br />
        <span>Ship Smarter.</span>
      </h1>

      <p className="home-tagline">
        Your intelligent code review assistant.
        <br />
        Find bugs, understand complexity and improve your code
        with AI-powered feedback.
      </p>

      <div className="hero-actions">
        <Link
          to={user ? "/dashboard" : "/register"}
          className="btn btn-primary hero-button"
        >
          Start Reviewing
          <span>→</span>
        </Link>

        {!user && (
          <Link
            to="/login"
            className="btn btn-secondary hero-button"
          >
            Sign In
          </Link>
        )}
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">⌘</div>
          <h3>Smart Analysis</h3>
          <p>
            AI examines your code for correctness and quality.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Complexity</h3>
          <p>
            Understand time and space complexity instantly.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">✦</div>
          <h3>Actionable Feedback</h3>
          <p>
            Get practical suggestions to improve your code.
          </p>
        </div>
      </div>
    </div>
  );
}