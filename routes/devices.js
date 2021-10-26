var express = require('express');
var router = express.Router();

const devicesRepositories = require("../repositories/devices-repository");

router.get('/', async function(req, res, next) {
  try {
    const devices = await devicesRepositories.selectDevices();

    if (devices.length == 0) { formatResponse(204, "No devices found.", res); }

    formatResponse(200, devices, res);

  } catch (err) { formatResponse(err.status ?? 404, err.message ?? "Unknown error.", res); }
});

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params['id'];
    const device = await devicesRepositories.selectDeviceById(id);
    
    if (device.length == 0) { formatResponse(204, `No device found with Id ${id}.`, res); }
    
    formatResponse(200, device[0], res);
    
  } catch (err) { formatResponse(err.status ?? 404, err.message ?? "Unknown error.", res); }
});

router.post('/', async function(req, res, next) {
  try {
    const newDevice = req.body;

    if (newDevice == null) { formatResponse(400, "Request without body.", res) }

    if (!isJson(newDevice)) { formatResponse(400, "Request not contains a valid Json body.", res) } 

    const saveDevice = await devicesRepositories.saveDevice(newDevice);

    if (saveDevice.affectedRows != undefined) {
      if (saveDevice.affectedRows > 0) {
        formatResponse(200, `Device with Id ${saveDevice.insertId} was inserted.`, res);
      } else {
        formatResponse(500, `An error occurred while processing your request.`, res);
      }
    } else {
      formatResponse(500, `An error occurred while processing your request.`, res);
    }
  } catch (err) { formatResponse(err.status ?? 404, err.message ?? "Unknown error.", res); }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const id = req.params['id'];
    const removeDevice = await devicesRepositories.removeDeviceById(id);
    
    if (removeDevice.affectedRows != undefined) {
      if (removeDevice.affectedRows > 0) {
        formatResponse(200, `Device with Id ${id} was removed.`, res);
      } else {
        formatResponse(404, `No device found with Id ${id}.`, res)
      }
    } else {
      formatResponse(500, `An error occurred while processing your request.`, res);
    }
  } catch (err) { formatResponse(err.status ?? 404, err.message ?? "Unknown error.", res); }
})

function formatResponse(status, message, res) {
  res.status(status).json({
    status,
    message
  });
}

function isJson(object) {
  try {
      JSON.parse(JSON.stringify(object));
  } catch {
      return false;
  }
  return true;
}

module.exports = router;
