var express = require('express');
var router = express.Router();

const db = require("../db/db");

router.get('/', async function(req, res, next) {
  try {
    const devices = await db.selectDevices();

    if (devices.length == 0) {
      res.status(204).json(formatResponse(204, "No devices found."));
    }
    res.status(200).json(formatResponse(200, devices));

  } catch (err) {
    res.status(err.status).json(err.status, err.message);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params['id'];

    const device = await db.selectDeviceById(id);

    if (device.length == 0) {
      res.status(204).json(formatResponse(204, `No device found with Id ${id}.`));
    }
    res.status(200).json(formatResponse(200, device[0]));

  } catch (err) {
    res.status(err.status).json(err.status, err.message);
  }
});

function formatResponse(status, message) {
  return {
    status,
    message
  };
}

module.exports = router;
