const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId

// init cors and bodyParser
//------------------------
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
  res.send('Hello World!')
})



// mongo db database
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uppua.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("risadstorge").collection("items");
 
   // Get items
  //================================
   app.get('/items', (req,res) =>{
     collection.find({})
     .toArray((error, document) =>{
       res.send(document)
     })
   })
   
   
   // add items
  //================================
  app.post('/addItems', (req,res) =>{
     const items = req.body
     collection.insertOne(items)
     .then(result => {
       console.log('items added succesfully')
     })
  })

   //===================================
 // delate method
app.delete('/delate/:id', (req, res) =>{
  collection.deleteOne({_id: ObjectId(req.params.id)})
  .then(result =>{
    res.send(result.deletedCount > 0)
  })
})



// mongo close here
//-------------------
});



app.listen(port)