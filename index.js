const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
port = process.env.PORT || 5000;

// nikeWarehouse
// yTpU4k5cXhzK7bqR

// middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Word!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nikewarehouse.eonwx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('nike warehouse connected');
  // perform actions on the collection object
  client.close();
});


app.listen(port, () => {
  console.log('Listening to port', port);
})