const admin = require("../config/db");
const db = admin.firestore();

const reviewRef = db.collection("Reviews");

const getReviews = async () => {
  let reviews_data = [];
  const snapshot = await reviewRef.get();
  snapshot.forEach((doc) => {
    //console.log(doc.id, "=>", doc.data());
    reviews_data.push(doc.data());
  });
  return reviews_data;
};

module.exports = { getReviews };
