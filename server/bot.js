var firebase = require("firebase/app");
require("firebase/firestore");
require("dotenv").config();

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const overlayCollection = db.collection("overlays");

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
    username: "splashleybot",
    password: process.env.TWITCH_PASSWORD,
  },
  channels: ["splashley"],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (message === "!toggleConfetti") {
    overlayCollection
      .doc("confetti")
      .get()
      .then((doc) => {
        if (doc.exists) return doc.ref.update({ active: !doc.data().active });
      })
      .then(() => console.log("State successfully updated!"))
      .catch((error) => console.error("Error updating state: ", error));
  }
});
