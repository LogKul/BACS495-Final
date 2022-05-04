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

router.delete('/user', function (req, res, next) {
  const query = {
    "uname": req.body.uname,
  };
  var db = req.app.locals.db;

  db.collection("questions")
    .deleteMany(query)
    .then(result => {
      res.json({ "msg": "All user posts deleted." })
      console.log('All posts from user ' + req.body.uname + ' deleted.')
    })
    .catch(err => {
      console.log('Error: ' + err);
    });
});

router.delete('/text', function (req, res, next) {
  const query = {
    "text": req.body.text,
  };
  var db = req.app.locals.db;

  db.collection("questions")
    .deleteMany(query)
    .then(result => {
      res.json({ "msg": "All user posts deleted." })
      console.log('All posts with text \'' + req.body.text + '\' deleted.')
    })
    .catch(err => {
      console.log('Error: ' + err);
    });
});

router.get('/replies/all', function (req, res, next) {
  var db = req.app.locals.db;
  var cursor = db.collection("replies").find();
  cursor.toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log('Error: ' + err);
    });
});

router.post('/reply', function (req, res, next) {
  const reply = {
    "uname": req.body.uname,
    "text": req.body.reply_text,
    "upvotes": req.body.upvotes,
    "qid": ObjectId(req.body.qid),
  };
  var db = req.app.locals.db;

  db.collection("replies")
    .insertOne(reply)
    .then(result => {
      res.json({ "msg": "Reply posted." })
    })
    .catch(err => {
      console.log('Error: ' + err);
    });
});

router.patch('/reply/upvote', function (req, res, next) {
  const reply = {
    "_id": ObjectId(req.body.id),
  };
  var db = req.app.locals.db;

  db.collection("replies")
    .updateOne(reply, { $set: { "upvotes": req.body.upvotes } }, { upsert: true })
    .catch(err => {
      console.log('Error: ' + err);
    });
  res.json({ "msg": "Reply " + req.body.id + " now has " + req.body.upvotes + " upvotes." });
});

module.exports = router;