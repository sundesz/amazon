const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const express = require("express");
const cors = require("cors");

const stripe = require("stripe")("sk_test_51IMA7hF5c4R7e5PYJLrICLBOOP"+
"wDeLvCX7bOY8mk6fIssDyuUJddQ4G3YYLNK"+
"FI5MHFHxj9ulorNp1QAr8iqgpI800MPCOQxow");


// API


// - App config
const app = express();

// - Middleware
app.use(cors({origin: true}));
app.use(express.json());


// - API routes
app.get("/", (request, response) => response.status(200).send("Hello World"));

// app.post("/payments/create", async (request, response) => {
app.post("/payments/create", (request, response) => {
  const total = request.query.total;

  console.log("Payment Request received", total);

  // const paymentIntent = await stripe.paymentIntents.create({
  const paymentIntent = stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "euro",
  });

  // Ok - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// firebase emulators:start
// Example endpoint
// http://localhost:5001/challenge-edb99/us-central1/api
