const express = require("express");
const https = require("https");
const app = express();

var url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=2cf78955e59e9ce06b5d636b6d23fde4&units=metric"

app.get("/", function(req, res) {

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
    });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
