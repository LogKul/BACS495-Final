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

module.exports = router;