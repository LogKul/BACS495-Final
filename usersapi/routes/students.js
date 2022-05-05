var express = require('express');
const { ObjectId, ObjectID } = require('mongodb');
//const { report } = require('../app');*/
var router = express.Router();


router.get('/:uname/:password', function (req, res, next) {
  const query = {
    "uname": req.params.uname,
    "password": req.params.password
  };
  var db = req.app.locals.db;
  db.collection("users")
    .findOne(query)
    .then(result => {
      console.log('Retrieved user: ${result}');
      res.json(result);
    })
    .catch(err => {
      console.log('Error: ${err}');
    });
});

router.put('/', function (req, res, next) {
  const filter = { _id: ObjectID(req.body.id) };
  const update = {
    $set: {
      "name": req.body.name,
      "type": req.body.type
    }
  }
  var db = req.app.locals.db;
  db.collection("users").updateOne(filter, update);
  res.send("Updated etc");
});

router.post('/', function (req, res, next) {
  const user = {
    "fname": req.body.fname,
    "lname": req.body.lname,
    "password": req.body.password,
    "uname": req.body.uname,
  };
  var db = req.app.locals.db;

  db.collection("users")
    .findOne({ "uname": req.body.uname })
    .then(result => {
      if (result !== null) {
        res.json({ "msg": 2 })
      }
      else {
        db.collection("users")
          .insertOne(user);
        res.json({ "msg": 3 });
      }
    })
    .catch(err => {
      console.log('Error: ' + err);
    });

  /*db.collection("users")
    .insertOne(user)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log('Error: ${err}');
    });*/
});

router.delete('/', function (req, res, next) {
  var db = req.app.locals.db;
  const query = { _id: ObjectID(req.body.id) };
  db.collection("users").deleteOne(query).then(function (result) { res.json(result) });
});

module.exports = router;
