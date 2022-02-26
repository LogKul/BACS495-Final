var express = require('express');
const { ObjectId, ObjectID } = require('mongodb');
//const { report } = require('../app');*/
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Base student path. Nothing here.');
});

router.get('/', function (req, res, next) {
  var db = req.app.locals.db;
  const query = { _id: ObjectID(req.body.id) };
  db.collection("users").findOne(query).then(function (result) { res.json(result) });

  /*var flag = false;
  for (let student of students) {
    if (student.id === parseInt(req.params.id)) {
      var temp = student;
      flag = true;
    }
  }
  if (flag) {
    res.json(temp);
  }
  else {
    res.send('ERROR: ID NOT FOUND FOR ID = ' + req.params.id);
  }*/
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

  /*var flag = false;
  for (var i = 0; i < students.length; i++) {
    if (students[i].id === parseInt(req.params.id)) {
      flag = true;
      students[i].id = parseInt(req.params.id);
      students[i].firstName = req.params.firstName;
    }
  }
  if (flag) {
    res.send('Student updated successfully!');
  }
  else {
    students.push({ id: parseInt(req.params.id), firstName: req.params.firstName })
    res.send('Student added successfully!');
  }*/
});

router.post('/', function (req, res, next) {
  const user = {
    "name": req.body.name,
    "type": req.body.type
  }
  var db = req.app.locals.db;
  db.collection("users").insertOne(user);
  res.send("User inserted");

  /*var flag = false;
  for (var i = 0; i < students.length; i++) {
    if (students[i].id === parseInt(req.params.id)) {
      flag = true;
    }
  }
  if (flag) {
    res.send('ERROR: Student already in database.');
  }
  else {
    students.push({ id: parseInt(req.params.id), firstName: req.params.firstName })
    res.send('Student posted to database successfully!');
  }*/
});

router.delete('/', function (req, res, next) {
  var db = req.app.locals.db;
  const query = { _id: ObjectID(req.body.id) };
  db.collection("users").deleteOne(query).then(function (result) { res.json(result) });

  /*var flag = false;
  for (var i = 0; i < students.length; i++) {
    if (students[i].id === parseInt(req.params.id)) {
      students.splice(i, 1);
      flag = true;
      i--;
    }
  }
  if (flag) {
    res.send('Student successfully deleted!');
  }
  else {
    res.send('ERROR: ID NOT FOUND FOR ID = ' + req.params.id);
  }*/
});

module.exports = router;
