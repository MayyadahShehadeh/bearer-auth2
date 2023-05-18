'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {

  try {
    // console.log("inside signup")
    // console.log("req.body.password :", req.body)
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    // console.log('user sign up', output);

    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});


authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  // console.log("inside signin")
  // console.log("user",user);
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const allUser = await users.findAll({});
  const list = allUser.map(user =>  user.username);
  res.status(200).json(list);
});

authRouter.delete('/users/:id', bearerAuth, async (req, res, next) => {
  let id = parseInt(req.params.id);
   let deleteUser= await users.destroy({ where: { id } });
   res.status(200).json(deleteUser);
});
authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;