let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://localhost:27017/library';

class Book {
  static findAll(req, res){
    MongoClient.connect(url, (err, db)=>{
      db.collection('books').find().toArray((err, docs)=>{
        if (err) {
          res.send(err)
        } else {
          res.send(docs)
        }
      })
    })
  }

  static findById(req, res){
    MongoClient.connect(url, (err, db)=>{
      db.collection('books').find({_id:ObjectId(req.params.id)}).toArray((err, docs)=>{
        if (err) {
          res.send(err)
        } else {
          res.send(docs)
        }
      })
    })
  }

  static add(req, res){
    MongoClient.connect(url, (err, db)=>{
      db.collection('books').insertOne(
        {
          "isbn": req.body.isbn,
          "title": req.body.title,
          "author": req.body.author,
          "category": req.body.category,
          "stock": req.body.stock
        }, (err, result)=> {
          if (err){
            res.send(err)
          } else {
            res.send(result)
          }
        })
    })
  }

  static edit(req, res) {
    MongoClient.connect(url, (err, db)=>{
      db.collection('books').updateOne(
        {
          _id: ObjectId(req.params.id)
        },
        {
          $set: {
            "isbn": req.body.isbn,
            "title": req.body.title,
            "author": req.body.author,
            "category": req.body.category,
            "stock": req.body.stock
          }
        }, (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.send(result)
          }
        })
    })
  }

  static delete(req, res){
    MongoClient.connect(url, (err, db)=>{
      db.collection('books').deleteOne({_id: ObjectId(req.params.id)}, (err, result)=>{
        if (err) {
          res.send(err)
        } else {
          res.send(result)
        }
      })
    })
  }

}

module.exports = Book;
