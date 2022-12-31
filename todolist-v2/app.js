//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const url = "mongodb://localhost:27017";

mongoose.set("strictQuery", false);
mongoose.connect(url + "/todolistDB");

const itemSchema = {
  name: String
};

const Item = new mongoose.model("Item", itemSchema);

const welcomeMsg = new Item ({
  name: "Welcome to your ToDo List!"
});

const addMsg = new Item ({
  name: "Hit the + button to add a new item."
});

const deleteMsg = new Item ({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [welcomeMsg, addMsg, deleteMsg];

app.get("/", function(req, res) {

  Item.find({}, (err, foundItems) => {
    if(err){
      console.log(err);
    }else if ( foundItems.length < 1 ){
      Item.insertMany(defaultItems, (err, docs) => {
        if(err){
          console.log(err);
        }else{
          console.log(docs);
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });

});

app.post("/", function(req, res){

  const item = new Item({
    name: req.body.newItem
  });

  item.save();
  res.redirect("/");
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});
app.post("/delete", (req, res) =>{
  const checkboxId = req.body.checkbox;
  Item.findByIdAndRemove(checkboxId, (err) => {
    if(err){
      console.log(err);
    }else{
      console.log("Deletion successful.");
    }
    res.redirect("/");
  });
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
