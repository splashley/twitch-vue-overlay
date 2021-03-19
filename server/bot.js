var firebase = require("firebase/app");
require("firebase/firestore");

const config = {
  //config here
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const overlayCollection = db.collection("overlay");

const tmi = require("tmi.js");

const client = new tmi.Client({
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: "0NEGUY",
    password: "oauth:xxxx",
  },
  channels: ["0neguy", "splashley"],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (message === "!toggleConfetti") {
    overlayCollection
      .doc("state")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.ref.update({ active: !doc.data().active });
        } else {
          // Throw an error
        }
      })
      .then(function () {
        console.log("State successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating state: ", error);
      });
  }
});
