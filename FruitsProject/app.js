const { MongoClient } = require("mongodb");
const assert = require('assert');
// Replace the uri string with your connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('fruitsDB');
    const fruits = database.collection('fruits');
    const insertFruits = await fruits.insertMany([
            { name: "Apple", score: 8, review: "Great fruit"},
            { name: "Orange", score: 6, review: "Kinda sour"},
            { name: "Banana", score: 9, review: "Great stuff!!!"}
         ]);
    console.log(insertFruits);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
