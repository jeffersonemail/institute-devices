var express = require('express');
var router = express.Router();

const db = require("../db/db");

router.get('/', async function(req, res, next) {
  try {
    const devices = await db.selectDevices();

    if (devices.length == 0) {
      formatResponse(204, "No devices found.", res);
    }
    formatResponse(200, devices, res);

  } catch (err) {
    formatResponde(err.status, err.message, res);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params['id'];
    const device = await db.selectDeviceById(id);

    if (device.length == 0) {
      formatResponse(204, `No device found with Id ${id}.`, res);
    }
    formatResponse(200, device[0], res);

  } catch (err) {
    formatResponse(err.status, err.message, res);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const id = req.params['id'];
    const removeDevice = await db.removeDeviceById(id);
    
    if (removeDevice.affectedRows != undefined) {
      if (removeDevice.affectedRows > 0) {
        formatResponse(200, `Device with Id ${id} was removed.`, res);
      } else {
        formatResponse(404, `No device found with Id ${id}.`, res)
      }
    } else {
      formatResponse(500, `An error occurred while processing your require.`, res);
    }
  } catch (err) {
    formatResponse(err.status, err.message, res);
  }
})

function formatResponse(status, message, res) {
  res.status(status).json({
    status,
    message
  });
}

module.exports = router;
