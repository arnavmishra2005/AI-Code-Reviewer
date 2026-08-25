import CodeReview from "../models/CodeReview.js";
import aiService from "../services/aiService.js";

// @route  POST /api/reviews
// @desc   Send code to the AI, save the result, return it to the client
const analyzeCode = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      res.status(400);
      throw new Error("Please provide both code and language");
    }

    const aiResult = await aiService.reviewCode(code, language);

    const review = await CodeReview.create({
      userId: req.user._id,
      code,
      language,
      ...aiResult,
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/reviews
// @desc   Get all reviews for the logged-in user
const getReviews = async (req, res, next) => {
  try {
    const reviews = await CodeReview.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/reviews/:id
const getReviewById = async (req, res, next) => {
  try {
    const review = await CodeReview.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

// @route  DELETE /api/reviews/:id
const deleteReview = async (req, res, next) => {
  try {
    const review = await CodeReview.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};

export { analyzeCode, getReviews, getReviewById, deleteReview };
