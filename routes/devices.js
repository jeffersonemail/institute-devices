var express = require('express');
var router = express.Router();

const db = require("../db/db");

router.get('/', function(req, res, next) {
  res.json({
    status: 200,
    message: "OK"
  });
});

module.exports = router;
