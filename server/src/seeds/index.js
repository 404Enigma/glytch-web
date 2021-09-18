const admin = require("../config/db");
const db = admin.firestore();
const data = require("./reviews.json");

const add_data = async (data) => {
  const review_Ref = db.collection("Reviews");
  const res = await review_Ref.doc().set(data);
  console.log(res);
};

data.forEach(async function (obj) {
  //console.log("obj:", obj);
  await add_data(obj);
});

//module.exports = add_data;
