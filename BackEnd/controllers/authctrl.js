//const connection = require("../config/db")
const express = require('express');

const User = require('../model/User');
const { response } = require('../index.js');
const { UserAuth } = require('../services/auth.js');
const router = express.Router();

router.post('/login', async (req, res) => {
  const data = req.body;
  //console.log("In authctrl")
  //console.log(data)
  const response = {};
  try {
    const result = await UserAuth.loginUser(data);
    //console.log(result)
    if (result) {
      response.success = true;
      response.user = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'Incorrect Username or Password';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    //console.log(e);
    response.success = false;
    response.error = 'Some error occurred. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});

router.get('/getUsers', async (req, res) => {
  const response = {};
  try {
    let result = await UserAuth.getUsers();
    if (result) {
      response.success = true;
      response.users = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      console.error("Error in getUsers route:", e);
      response.success = false;
      response.error = 'cannot update ';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.error("Error in getUsers route:", e);
    response.success = false;
    response.error = 'Some error occurred. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});

module.exports = router;
