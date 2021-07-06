import express from 'express';
import axios from 'axios';
import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import crypto from 'crypto'
const app = express();
const jwtSecret = 'living1234';

app.use(cors());
app.use(express.json())

const path = 'https://workshopnuxtjs-default-rtdb.asia-southeast1.firebasedatabase.app'
// const path = 'https://living-mobile-demo-default-rtdb.asia-southeast1.firebasedatabase.app'
app.post('/api/auth', async (req, res) => {
    const apiRequest = await axios.get(`${path}/users_list/` + req.body.username + '.json')

    if(apiRequest.data.pwd === crypto.pbkdf2Sync(req.body.password.toString(), jwtSecret,  1000, 64, `sha512`).toString(`hex`)) {
      // TODO: Create JWT and set to cookie, set up Cookie
      const token = jsonwebtoken.sign({ user: req.body.username }, jwtSecret);
      res.cookie('token', token, { httpOnly: true, secure: true});
      //res.cookie('cookieName', variable, { httpOnly: true, secure: true})) >> ตรง {} ทำให้ใช้ได้แค่ httpOnly
      res.json({ token });
    } else {
      res.status(400).json({ status: 'Auth Error' });
    }

});
app.use(cookieParser());
// TODO: Check JWT with every request, use Token in cookie
app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'], getToken: req => req.cookies.token }));

app.get('/api/users/', async (req, res) => {
  let offest = 0
  let max = 20
  const apiRequest = await axios.get(`${path}/users_list.json`)

  let returnData = []

  for(const index in apiRequest.data) {
    apiRequest.data[index]._id = index
    delete apiRequest.data[index].pwd
    returnData.push(apiRequest.data[index])
  }

  returnData = returnData.splice(offest, max)

  res.json({ status: "success", data: returnData });
});

app.get('/api/users/:id', async (req, res) => {
  const apiRequest = await axios.get(`${path}/users_list/` + req.params.id + '.json')
  res.json({ status: "success", data: apiRequest.data });
});

app.post('/api/users', async (req, res) => {
    const user = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      pwd: crypto.pbkdf2Sync(req.body.password.toString(), jwtSecret,  1000, 64, `sha512`).toString(`hex`)
    }

    const apiRequest = await axios.put(`${path}/users_list/`+ req.body.username + '.json', user)
    res.json({ status: "success", data: apiRequest.data });
});

app.patch('/api/user/:id', async (req, res) => {
  const user = {
    email: req.body.email,
    name: req.body.name,
  }
  
  const apiRequest = await axios.patch(`${path}/users_list/`+ req.params.id + '.json', user)
  res.json({ status: "updated user success", data: apiRequest.data });
});

app.delete('/api/users/:id', async (req, res) => {
  await axios.delete(`${path}/users_list/`+ req.params.id + '.json')
  res.json({ status: "deleted user success"});
});

app.listen(3001);
console.log('Api running on http://localhost:3001');
