import { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import ReviewResult from "../components/ReviewResult";
import Loading from "../components/Loading";
import authService from "../services/authService";
import reviewService from "../services/reviewService";

export default function Dashboard() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [review, setReview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    bugs: 0,
    thisWeek: 0,
  });

  const user = authService.getCurrentUser();

  useEffect(() => {
    loadStats();

    // Every time Dashboard is opened,
    // start with a fresh analysis area.
    setCode("");
    setReview(null);
    setError("");
    setLanguage("cpp");
  }, []);

  const loadStats = async () => {
    try {
      const reviews = await reviewService.getReviews();

      const oneWeekAgo =
        Date.now() - 7 * 24 * 60 * 60 * 1000;

      const total = reviews.length;

      const bugs = reviews.reduce(
        (sum, review) =>
          sum + (review.bugs?.length || 0),
        0
      );

      const thisWeek = reviews.filter(
        (review) =>
          new Date(review.createdAt).getTime() >
          oneWeekAgo
      ).length;

      setStats({
        total,
        bugs,
        thisWeek,
      });

      // IMPORTANT:
      // Do NOT setReview() here.
      //
      // History should remain separate from the
      // currently displayed analysis.
    } catch (err) {
      console.error("Could not load stats", err);
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await reviewService.analyzeCode(
        code,
        language
      );

      // Show only the newly generated review.
      setReview(result);

      // Update dashboard statistics.
      await loadStats();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "AI review failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <div className="eyebrow">
            YOUR WORKSPACE
          </div>

          <h1>
            Welcome back, {user?.name} <span>👋</span>
          </h1>

          <p className="dashboard-subtitle">
            Analyze your code and get intelligent feedback.
          </p>
        </div>

        <div className="ai-status">
          <span className="status-dot"></span>
          AI Online
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <div className="stat-icon">◈</div>

          <div>
            <span className="stat-value">
              {stats.total}
            </span>

            <span className="stat-label">
              Total Reviews
            </span>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon bug-stat-icon">
            !
          </div>

          <div>
            <span className="stat-value">
              {stats.bugs}
            </span>

            <span className="stat-label">
              Bugs Found
            </span>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon">↗</div>

          <div>
            <span className="stat-value">
              {stats.thisWeek}
            </span>

            <span className="stat-label">
              Reviews This Week
            </span>
          </div>
        </div>
      </div>

      <div className="section-title">
        <div>
          <div className="eyebrow">
            CODE ANALYSIS
          </div>

          <h2>Review your code</h2>
        </div>
      </div>

      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
        onAnalyze={handleAnalyze}
        loading={loading}
      />

      {error && (
        <div className="analysis-error">
          <span>!</span>
          {error}
        </div>
      )}

      {loading && <Loading />}

      {!loading && review && (
        <ReviewResult review={review} />
      )}
    </div>
  );
}