const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello Word!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nikewarehouse.eonwx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const productCollection = client.db('NikeWarehouse').collection('Product');


    // READ OR GET
    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });

    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    })

    // POST OR CREATE
    app.post('/product', async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    })

    // UPDATE OR PUT
    app.put('/product/:id', async (req, res) => {
      const id = req.params.id;
      const newProduct = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: newProduct.quantity
        }
      };
      const result = await productCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    })

    // DELETE
    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    })
  }
  finally {

  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log('Listening to port', port);
})