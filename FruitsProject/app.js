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

const fruit = new Fruit({
  name: "Apple",
  rating: 8,
  review: "Great fruit"
});

fruit.save();



const insertDocuments = function(db, callback) {

  const collection = db.collection('fruits');

  collection.insertMany([{
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!!!"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
  });
}
