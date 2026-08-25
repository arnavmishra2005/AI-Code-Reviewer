export default function Loading({
  text = "Analyzing your code...",
}) {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="ai-loader">
          <div className="loader-ring"></div>
          <div className="loader-core">AI</div>
        </div>

        <div className="loading-content">
          <h3>{text}</h3>

          <p>
            Reviewing your code for bugs, issues and complexity.
          </p>

          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}