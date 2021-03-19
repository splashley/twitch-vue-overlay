var firebase = require("firebase/app");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyDVZRFAYf1eWp51IKklrJ0XMkV0dPTLyOg",
  authDomain: "testinggrounds-96659.firebaseapp.com",
  projectId: "testinggrounds-96659",
  storageBucket: "testinggrounds-96659.appspot.com",
  messagingSenderId: "662090940107",
  appId: "1:662090940107:web:60944f4bcc6e4d9613a54e",
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
    password: "oauth:eh79ruw2hdsjystq5uyksgj7an0wpn",
    _botAuth: "oauth:fmiubfkgn0qmoapvj0dfs0b0fh1j33",
    _mainAuth: "oauth:eh79ruw2hdsjystq5uyksgj7an0wpn",
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
        console.log("Todo successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating todo: ", error);
      });
  }
});
