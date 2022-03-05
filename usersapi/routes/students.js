var express = require('express');
const { ObjectId, ObjectID } = require('mongodb');
//const { report } = require('../app');*/
var router = express.Router();


router.get('/', function (req, res, next) {
  var db = req.app.locals.db;
  const query = { uname: req.query.uname, password: req.query.password };
  db.collection("users").findOne(query).then(function (result) { /*res.send(req.query.id)*/res.json(result) });
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
    "name": req.body.name,
    "type": req.body.type
  }
  var db = req.app.locals.db;
  db.collection("users").insertOne(user);
  res.send("User inserted");
});

router.delete('/', function (req, res, next) {
  var db = req.app.locals.db;
  const query = { _id: ObjectID(req.body.id) };
  db.collection("users").deleteOne(query).then(function (result) { res.json(result) });
});

module.exports = router;
