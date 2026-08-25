import ComplexityCard from "./ComplexityCard";

export default function ReviewResult({ review }) {
  if (!review) return null;

  const {
    score,
    summary,
    bugs = [],
    issues = [],
    suggestions = [],
    complexity = {},
    explanation,
  } = review;

  const getScoreClass = () => {
    if (score >= 80) return "score-good";
    if (score >= 60) return "score-medium";
    return "score-low";
  };

  return (
    <div className="review-result">
      <div className="review-header">
        <div>
          <div className="review-eyebrow">
            AI ANALYSIS COMPLETE
          </div>

          <h3>Code Review</h3>
        </div>

        <div className={`score-badge ${getScoreClass()}`}>
          <span className="score-number">{score}</span>
          <span className="score-total">/100</span>
        </div>
      </div>

      <div className="score-progress">
        <div
          className={`score-progress-fill ${getScoreClass()}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        ></div>
      </div>

      {summary && (
        <div className="review-summary-box">
          <span className="summary-icon">✦</span>
          <p>{summary}</p>
        </div>
      )}

      <ComplexityCard
        time={complexity.time}
        space={complexity.space}
      />

      <div className="review-section">
        <div className="section-heading">
          <span className="section-icon bug-icon">!</span>
          <h4>Bugs</h4>
          <span className="section-count">
            {bugs.length}
          </span>
        </div>

        {bugs.length === 0 ? (
          <div className="empty-review success-review">
            <span>✓</span>
            <p>No major bugs found</p>
          </div>
        ) : (
          <ul className="review-list bug-list">
            {bugs.map((bug, i) => (
              <li key={i}>{bug}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="review-section">
        <div className="section-heading">
          <span className="section-icon issue-icon">⚠</span>
          <h4>Issues</h4>
          <span className="section-count">
            {issues.length}
          </span>
        </div>

        {issues.length === 0 ? (
          <div className="empty-review success-review">
            <span>✓</span>
            <p>No issues found</p>
          </div>
        ) : (
          <ul className="review-list issue-list">
            {issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="review-section">
        <div className="section-heading">
          <span className="section-icon suggestion-icon">✦</span>
          <h4>Suggestions</h4>
          <span className="section-count">
            {suggestions.length}
          </span>
        </div>

        {suggestions.length === 0 ? (
          <div className="empty-review">
            <span>✓</span>
            <p>Nothing further to suggest</p>
          </div>
        ) : (
          <ul className="review-list suggestion-list">
            {suggestions.map((suggestion, i) => (
              <li key={i}>{suggestion}</li>
            ))}
          </ul>
        )}
      </div>

      {explanation && (
        <div className="review-section explanation-section">
          <div className="section-heading">
            <span className="section-icon explanation-icon">
              ?
            </span>
            <h4>Explanation</h4>
          </div>

          <div className="explanation-box">
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}