const mongoose = require('mongoose');
// Replace the uri string with your connection string.
const url = "mongodb://localhost:27017";

mongoose.set("strictQuery", false);
mongoose.connect(url + "/fruitsDB");

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "No name specified."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = new mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 10,
  review: "Pretty solid as a fruit"
});

// fruit.save();

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

Fruit.find((err, fruits) => {
  if (err){
    console.log(err);
    mongoose.disconnect();
  } else {
    mongoose.disconnect();
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });

  }
});

// Fruit.updateOne({name: "Kiwi"}, {review: "I don't like it..."}, (err) => {
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successful update.");
//   }
// });

Person.deleteMany({name: "John"}, (err) => {
  if(err){
    console.log(err);
  }else{
    console.log("Successful delete.");
  }
});
