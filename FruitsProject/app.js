const mongoose = require('mongoose');
// Replace the uri string with your connection string.
const url = "mongodb://localhost:27017";

mongoose.set("strictQuery", false);
mongoose.connect(url + "/fruitsDB");

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number
});

const Person = new mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37
});

person.save();
