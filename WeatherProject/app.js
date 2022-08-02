const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const appid = "2cf78955e59e9ce06b5d636b6d23fde4";
  const city = req.body.cityName;
  const units = "metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=" + units;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<h1>The weather is currently " + description + ".</h1>");
      res.write("<img src=" + imageUrl + " alt=" + description + ">");
      res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius.</h1>");
      res.send();
    });
  });
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
})
