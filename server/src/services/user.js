const admin = require("../config/db");
const db = admin.firestore();

const docRef = db.collection("Users");

const newUser = async (userobj) => {
  console.log("user: ", userobj);
  await docRef.doc(userobj.user_id).set(userobj, { merge: true });

  return {
    id: userobj.user_id,
    thumbnail: userobj.thumbnail,
    name: userobj.name,
    user_id: userobj.user_id,
  };
};

const findById = async (id) => {
  const snapshot = await docRef.doc(id).get();
  const user_data = snapshot.data();
  return user_data;
};

const findOne = async (googleObj) => {
  const userid = googleObj.googleId;
  await docRef
    .doc(userid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

module.exports = { newUser, findById, findOne };
