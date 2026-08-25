import { useState, useEffect } from "react";
import reviewService from "../services/reviewService";
import ReviewResult from "../components/ReviewResult";
import Loading from "../components/Loading";

export default function ReviewHistory() {
  const [reviews, setReviews] = useState([]);
  const [selected, setSelected] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);

    try {
      const data = await reviewService.getReviews();

      setReviews(data);

      if (data.length > 0) {
        setSelected(data[0]);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load review history."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      await reviewService.deleteReview(id);

      const updatedReviews = reviews.filter(
        (review) => review._id !== id
      );

      setReviews(updatedReviews);

      if (selected?._id === id) {
        setSelected(
          updatedReviews.length > 0
            ? updatedReviews[0]
            : null
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  if (loading) {
    return <Loading text="Loading your history..." />;
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <div className="eyebrow">
            YOUR ACTIVITY
          </div>

          <h1>Review History</h1>

          <p>
            View and revisit your previous code reviews.
          </p>
        </div>

        <div className="history-count">
          {reviews.length}{" "}
          {reviews.length === 1
            ? "Review"
            : "Reviews"}
        </div>
      </div>

      {error && (
        <div className="analysis-error">
          <span>!</span>
          {error}
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="empty-history">
          <div className="empty-history-icon">
            ◈
          </div>

          <h2>No reviews yet</h2>

          <p>
            Analyze your first piece of code to see it
            here.
          </p>
        </div>
      ) : (
        <div className="history-layout">
          <div className="history-sidebar">
            <div className="history-sidebar-title">
              Recent Reviews
            </div>

            <ul className="history-list">
              {reviews.map((review) => (
                <li
                  key={review._id}
                  className={`history-item ${
                    selected?._id === review._id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelected(review)
                  }
                >
                  <div className="history-item-main">
                    <span className="history-language">
                      {review.language}
                    </span>

                    <span className="history-date">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="history-item-footer">
                    <span className="history-score">
                      Score{" "}
                      <strong>{review.score}</strong>
                    </span>

                    <button
                      className="link-button danger"
                      onClick={(e) =>
                        handleDelete(
                          review._id,
                          e
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="history-detail">
            {selected ? (
              <ReviewResult review={selected} />
            ) : (
              <div className="select-review">
                <span>←</span>
                Select a review to see its details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}