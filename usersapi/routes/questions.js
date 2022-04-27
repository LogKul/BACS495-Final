var express = require('express');
const { ObjectId, ObjectID } = require('mongodb');
//const { report } = require('../app');*/
var router = express.Router();

router.get('/all', function (req, res, next) {
  var db = req.app.locals.db;
  var cursor = db.collection("questions").find();
  cursor.toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log('Error: ' + err);
    });
});

router.post('/', function (req, res, next) {
  const question = {
    "uname": req.body.uname,
    "text": req.body.question_text,
    "upvotes": req.body.upvotes,
    "downvotes": req.body.downvotes,
  };
  var db = req.app.locals.db;

  db.collection("questions")
    .insertOne(question)
    .then(result => {
      res.json({ "msg": "Question posted." })
    })
    .catch(err => {
      console.log('Error: ' + err);
    });
});

router.patch('/upvote', function (req, res, next) {
  const question = {
    "_id": ObjectId(req.body.id),
  };
  var db = req.app.locals.db;

  db.collection("questions")
    .updateOne(question, { $set: { "upvotes": req.body.upvotes } }, { upsert: true })
    .catch(err => {
      console.log('Error: ' + err);
    });
  res.json({ "msg": "Question " + req.body.id + " now has " + req.body.upvotes + " upvotes." });
});

module.exports = router;