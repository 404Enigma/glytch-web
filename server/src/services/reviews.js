const admin = require("../config/db");
const db = admin.firestore();
const fbadmin = require("firebase-admin");

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

const updateAnalytics = async (sentiment_value) => {
  const Analytics_Ref = db.collection("Analytics");

  const counts = await Analytics_Ref.doc("Company")
    .get()
    .then((doc) => {
      total_count = doc.data().total_count;
      sentiment_0 = doc.data().sentiment_0;
      sentiment_1 = doc.data().sentiment_1;
      sentiment_2 = doc.data().sentiment_2;
      sentiment_3 = doc.data().sentiment_3;
      return { total_count, sentiment_0, sentiment_1, sentiment_2, sentiment_3 };
    });

  counts.total_count = fbadmin.firestore.FieldValue.increment(1);

  // let sentiment_category = {};
  // let sentiment_0, sentiment_1, sentiment_2, sentiment_3;

  console.log("sentiment_value: " + sentiment_value);

  if (sentiment_value == 0) {
    counts.sentiment_0 = fbadmin.firestore.FieldValue.increment(1);
  } else if (sentiment_value == 1) {
    counts.sentiment_1 = fbadmin.firestore.FieldValue.increment(1);
  } else if (sentiment_value == 2) {
    counts.sentiment_2 = fbadmin.firestore.FieldValue.increment(1);
  } else if (sentiment_value == 3) {
    counts.sentiment_3 = fbadmin.firestore.FieldValue.increment(1);
  } else if (sentiment_value == 4) {
    counts.sentiment_4 = fbadmin.firestore.FieldValue.increment(1);
  }

  //console.log("sentiment_category: " + sentiment_category.sentiment_0);
  console.log("countss:", counts);

  try {
    await Analytics_Ref.doc("Company").update(counts);
  } catch (err) {
    console.log(err);
  }
};

const get_Analytics = async () => {
  const Analytics_Ref = db.collection("Analytics");

  const data_Ref = Analytics_Ref.doc("Company");
  const doc = await data_Ref.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
    return doc.data();
  }
};

module.exports = { getReviews, add_feedback, getFeedbacks, updateAnalytics, get_Analytics };
