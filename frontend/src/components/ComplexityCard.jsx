export default function ComplexityCard({ time, space }) {
  return (
    <div className="complexity-card">
      <div className="complexity-item">
        <div className="complexity-icon">⏱</div>

        <div>
          <span className="complexity-label">
            Time Complexity
          </span>

          <span className="complexity-value">
            {time || "N/A"}
          </span>
        </div>
      </div>

      <div className="complexity-item">
        <div className="complexity-icon">◈</div>

        <div>
          <span className="complexity-label">
            Space Complexity
          </span>

          <span className="complexity-value">
            {space || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}