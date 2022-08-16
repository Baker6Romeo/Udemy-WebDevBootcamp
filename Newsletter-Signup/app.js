const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();

const apiKey = "326217b4a63596c1845ef84fce06595d-us13";
const audienceId = "ea084b66ec"
const endpoint = "https://us13.api.mailchimp.com/3.0/"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

      const firstName = req.body.fName;
      const lastName = req.body.lName;
      const email = req.body.email;

      const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            }
        }]
      }

      const jsonData = JSON.stringify(data);

        console.log((data))
      })

    app.listen(3000, function() {
      console.log("Listening on port 3000.");
    })
