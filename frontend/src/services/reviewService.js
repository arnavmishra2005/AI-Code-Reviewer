import api from "./api";

const analyzeCode = async (code, language) => {
  const { data } = await api.post("/reviews", {
    code,
    language,
  });

  return data.review;
};

const getReviews = async () => {
  const { data } = await api.get("/reviews");

  return data.reviews || [];
};

const getReview = async (id) => {
  const { data } = await api.get(
    `/reviews/${id}`
  );

  return data.review;
};

const deleteReview = async (id) => {
  const { data } = await api.delete(
    `/reviews/${id}`
  );

  return data;
};

export default {
  analyzeCode,
  getReviews,
  getReview,
  deleteReview,
};