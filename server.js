const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const http = require('http');
const { default: mongoose } = require('mongoose');
const port = 8080;

// middleware
app.use(bodyParser.json())


// mongoDB connection

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.6bxdd.mongodb.net/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connect to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB", err));


// model connect

const Item = require('./models/Item')

// create post

app.post("/item", async(req, res)=>{
    try{
        const item = new Item({
            name: req.body.name,
            age: req.body.age
        })
       const itemSave =  await item.save()
       res.status(201).json(itemSave)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})


//  get all

app.get("/itemAll", async(req, res)=>{
    try{
      const allItem = await Item.find()
       res.status(201).json(allItem)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// get by id

app.get("/item/:id", async(req, res)=>{
    try{
      const itemById = await Item.findById(req.params.id)
      if(itemById === null){
        res.status(400).json({message: "Id Not Found"})
      }
      res.status(201).json(itemById)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

//  update

app.put("/item/:id", async(req, res)=>{
    try{
      const item = await Item.findById(req.params.id)
      if(item === null){
        res.status(400).json({message: "Id Not Found"})
      }
      if(req.body.name !== null){
          item.name = req.body.name
      }
      if(req.body.age !== null){
        item.age = req.body.age
    }
    const itemSave =  await item.save()
    res.status(201).json(itemSave)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})


//    remove

app.delete("/item/:id", async(req, res)=>{
    try{
      const itemDelete = await Item.findByIdAndDelete(req.params.id)
      if(itemDelete === null){
        res.status(400).json({message: "Id Not Found"})
      }
    //   await itemDelete.delete()
      res.status(201).json({message: "successfully delete"})
    }catch(error){
        res.status(400).json({message: error.message})
    }
})


// port listen
app.listen(port , () => {
    console.log(` Hello world http://localhost:${port}`)
})


