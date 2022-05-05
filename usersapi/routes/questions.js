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

router.get('/quserupvotes/:uname', function (req, res, next) {
  var db = req.app.locals.db;
  query = {
    "uname": req.params.uname,
  }
  var cursor = db.collection("upvotes").find(query);
  cursor.toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log('Error: ' + err);
    });
});

router.get('/ruserupvotes/:uname', function (req, res, next) {
  var db = req.app.locals.db;
  query = {
    "uname": req.params.uname,
  }
  var cursor = db.collection("replyupvotes").find(query);
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
  const upvote = {
    "_id": ObjectId(req.body.id),
    "uname": req.body.uname
  };
  var db = req.app.locals.db;

  db.collection("upvotes")
    .find(upvote)
    .toArray()
    .then(result => {
      if (result.length === 0) {
        db.collection("upvotes")
          .insertOne(upvote)
          .then(result => {
            console.log("Upvote posted")
          })
          .catch(err => {
            console.log('Error: ' + err);
          });

        db.collection("questions")
          .findOne({ "_id": ObjectId(req.body.id) })
          .then(result => {
            var total_question_upvotes = result.upvotes;
            total_question_upvotes = total_question_upvotes + 1;
            console.log(total_question_upvotes);

            db.collection("questions")
              .updateOne({ "_id": ObjectId(req.body.id) }, { $set: { "upvotes": total_question_upvotes } }, { upsert: true })
              .catch(err => {
                console.log('Error: ' + err);
              });
          })
        res.json({ "msg": "Upvote posted." });
      }
      else {
        console.log("Upvote failed.");
        res.json({ "msg": "Upvote failed." })
      }
    })
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

/*
router.patch('/upvote', function (req, res, next) {
  const upvote = {
    "_id": ObjectId(req.body.id),
    "uname": req.body.uname
  };
  var db = req.app.locals.db;

  db.collection("upvotes")
    .find(upvote)
    .toArray()
    .then(result => {
      if (result.length === 0) {
        db.collection("upvotes")
          .insertOne(upvote)
          .then(result => {
            console.log("Upvote posted")
          })
          .catch(err => {
            console.log('Error: ' + err);
          });

        db.collection("questions")
          .findOne({ "_id": ObjectId(req.body.id) })
          .then(result => {
            var total_question_upvotes = result.upvotes;
            total_question_upvotes = total_question_upvotes + 1;
            console.log(total_question_upvotes);

            db.collection("questions")
              .updateOne({ "_id": ObjectId(req.body.id) }, { $set: { "upvotes": total_question_upvotes } }, { upsert: true })
              .catch(err => {
                console.log('Error: ' + err);
              });
          })
        res.json({ "msg": "Upvote posted." });
      }
      else {
        console.log("Upvote failed.");
        res.json({ "msg": "Upvote failed." })
      }
    })
});
*/

router.patch('/reply/upvote', function (req, res, next) {
  const upvote = {
    "_id": ObjectId(req.body.id),
    "uname": req.body.uname
  };
  var db = req.app.locals.db;

  db.collection("replyupvotes")
    .find(upvote)
    .toArray()
    .then(result => {
      if (result.length === 0) {
        db.collection("replyupvotes")
          .insertOne(upvote)
          .then(result => {
            console.log("Reply upvote posted")
          })
          .catch(err => {
            console.log('Error: ' + err);
          });

        db.collection("replies")
          .findOne({ "_id": ObjectId(req.body.id) })
          .then(result => {
            var total_reply_upvotes = result.upvotes;
            total_reply_upvotes = total_reply_upvotes + 1;
            console.log(total_reply_upvotes);

            db.collection("replies")
              .updateOne({ "_id": ObjectId(req.body.id) }, { $set: { "upvotes": total_reply_upvotes } }, { upsert: true })
              .catch(err => {
                console.log('Error: ' + err);
              });
          })
        res.json({ "msg": "Reply upvote posted." });
      }
      else {
        console.log("Reply upvote failed.");
        res.json({ "msg": "Reply upvote failed." })
      }
    })
});

module.exports = router;