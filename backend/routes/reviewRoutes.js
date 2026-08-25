import express from "express";
import {
  analyzeCode,
  getReviews,
  getReviewById,
  deleteReview,
} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // every review route requires a logged-in user

router.post("/", analyzeCode);
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.delete("/:id", deleteReview);

export default router;
