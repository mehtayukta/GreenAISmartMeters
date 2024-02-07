const express = require('express');

const User = require('../model/User');
const { response } = require('../index.js');
const { SimulatedLightServices } = require('../services/SimulatedLightServices.js');
const { SimulatedServices } = require('../services/SimulatedLightServices.js');
const router = express.Router();



//also write code for get light by id.
router.get('/getSimulatedLights', async (req, res) => {
  let id = req.query.user_id;
  const response = {};
  try {
    let result = await SimulatedLightServices.getSimulatedLights(id);

    if (result) {
      response.success = true;
      response.user = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'some error occured...';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error = 'Some error occurred. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});

router.get('/getSimulatedLight', async (req, res) => {
  let id = req.query.id;
  const response = {};
  try {
    let result = await SimulatedLightServices.getSimulatedLight(id);

    if (result) {
      response.success = true;
      response.light = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'some error occured...';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error = 'Some error occurred. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});

router.post('/addSimulatedLight', async (req, res) => {
  //const data = req.body;
  console.log('here.....');
  let data = req.body;
  const response = {};
  try {
    console.log(data);
    let result = await SimulatedLightServices.addSimulatedLight(data);
    console.log("result:" + result);
    if (result) {
      response.success = true;
      response.user = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'some error occured...';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error = 'Some error occurred. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});

//
router.put('/updateSimulatedLight', async (req, res) => {
  const { id } = req.query;
  const data = req.body;
  const response = {};
  try {
    let result = await SimulatedLightServices.updateSimulatedLight(id, data);
    if (result) {
      response.success = true;
      response.user = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'cannot update ';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error = 'Some error occurred. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});




module.exports = router;