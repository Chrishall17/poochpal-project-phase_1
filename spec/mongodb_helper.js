// const mongoose = require("mongoose");
// const uri = "mongodb+srv://chrishall3:XPlI5XXyYQImog07@poochpal.7bqzv.mongodb.net/PoochPal?retryWrites=true&w=majority&appName=PoochPal";
//
//
// beforeAll(function (done) {
//   mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(() => {
//     console.log("Connected to Database!")
//   });
//
//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "MongoDB connection error:"));
//   db.on("open", function () {
//     done();
//   });
// });
//
// afterAll(function (done) {
//   mongoose.connection.close(true, function () {
//     done();
//   });
// });
