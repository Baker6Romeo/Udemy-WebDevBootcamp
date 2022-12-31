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

const listSchema = {
  name: String,
  items: [itemSchema]
}
const List = new mongoose.model("List", listSchema);

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

app.get("/:listName", (req,res) => {
  const listName = req.params.listName;
  List.find({name: listName}, (err, foundItems) => {
    if(err){
      console.log(err);
    }else if ( foundItems.length < 1 ){
      const newList = new List({
        name: listName,
        items: defaultItems
      })
      newList.save();
      console.log('New ${listName} list created');
    } else {
      console.log('${listName} already exists.');
    }
  });
  // res.render(listName, {listTitle: '$(listName) List', newListItems: defaultItems});
});

app.post("/", function(req, res){

  const item = new Item({
    name: req.body.newItem
  });

  item.save();
  res.redirect("/");
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

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
