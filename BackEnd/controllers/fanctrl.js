const express = require('express');

const User = require('../model/User');
const { response } = require('../index.js');
const { FanServices } = require('../services/fanservices.js');
const { EighteenUpRatingOutlined } = require('@mui/icons-material');
const router = express.Router();


router.get('/getFanDetails', async (req, res) => {
  const data = req.query;

  const response = {};
  try {
    let result = await FanServices.getFandetails(data);

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
//update part is remaining....
router.delete('/deleteFandetails', async (req, res) => {
  const data = req.query;
  const response = {};
  try {
    let result = await FanServices.deleteFandetails(data);
    console.log('result:' + result);
    if (result) {
      response.success = true;
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

router.post('/addFandetails', async (req, res) => {
  //const data = req.body;
  console.log('here.....');
  let data = req.body;
  const response = {};
  try {
    console.log(data);
    let result = await FanServices.addFandetails(data);
    console.log(result);
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

router.put('/updateFandetails', async (req, res) => {
  const { id } = req.query;
  const data = req.body;
  const response = {};
  try {
    let result = await FanServices.updateFanDetails(id, data);
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




router.patch('/updateCloudStatus', async (req, res) => {
  //const data = req.body;
  let data = req.query;
  console.log('here.....');
  //let data = req.body;
  const response = {};
  try {
    //  console.log(data);
    let result = await FanServices.updateFanCloudStatus(data, req.body);
    //   console.log(result);
    if (result) {
      response.success = true;
      response.user = "Cloud status for the fan is sucessfully updated";
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

router.patch('/updateWorkingStatus', async (req, res) => {
  //const data = req.body;
  let data = req.query;
  console.log('here.....');
  //let data = req.body;
  const response = {};
  try {
    //  console.log(data);
    let result = await FanServices.updateWorkingStatus(data, req.body);
    //   console.log(result);
    if (result) {
      response.success = true;
      response.user = "Working status for the fan is sucessfully updated.";
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

router.patch('/updateActiveStatus', async (req, res) => {
  //const data = req.body;
  let data = req.query;
  console.log('here.....');
  //let data = req.body;
  const response = {};
  try {
    //  console.log(data);
    let result = await FanServices.updateActiveStatus(data, req.body);
    //   console.log(result);
    if (result) {
      response.success = true;
      response.user = "Active status for the Fan is sucessfully updated.";
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


module.exports = router;