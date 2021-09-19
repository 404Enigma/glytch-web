const admin = require("../config/db");
const db = admin.firestore();

const getReviews = async () => {
  const reviewRef = db.collection("Reviews");
  let reviews_data = [];
  const snapshot = await reviewRef.get();
  snapshot.forEach((doc) => {
    //console.log(doc.id, "=>", doc.data());
    reviews_data.push(doc.data());
  });
  return reviews_data;
};

const add_feedback = async (data) => {
  const feedback_Ref = db.collection("Feedbacks");
  const res = await feedback_Ref.doc().set(data);
};

const getFeedbacks = async () => {
  const feedback_Ref = db.collection("Feedbacks");

  let feedback_data = [];
  const snapshot = await feedback_Ref.get();
  snapshot.forEach((doc) => {
    //console.log(doc.id, "=>", doc.data());
    feedback_data.push(doc.data());
  });
  return feedback_data;
};

module.exports = { getReviews, add_feedback, getFeedbacks };
