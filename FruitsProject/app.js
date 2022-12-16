const mongoose = require('mongoose');
// Replace the uri string with your connection string.
const url = "mongodb://localhost:27017";

mongoose.set("strictQuery", false);
mongoose.connect(url + "/fruitsDB");

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

const Fruit = new mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number
});

const Person = new mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37
});

// person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "A bit sour"
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture"
});

Fruit.insertMany([kiwi, orange, banana], (err) => {
  if (err) {
    cosole.log(err);
  } else {
    console.log("Fruits logged");
  }
})
