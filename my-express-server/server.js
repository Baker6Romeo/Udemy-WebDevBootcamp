const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("<h1>Hello, World!</h1>");
});

app.get("/contact", function(req, res) {
  res.send("baker6romeo@gmail.com");
});

app.get("/about", function(req, res) {
  res.send("I'm me...obviously.");
});

app.get("/hobbies", function(req, res) {
  res.send("Stuff I do");
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});
