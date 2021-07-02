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

// const domain_firebase = "https://workshopnuxtjs-default-rtdb.asia-southeast1.firebasedatabase.app/"
const domain_firebase = "https://living-mobile-demo-default-rtdb.asia-southeast1.firebasedatabase.app/"

app.post('/api/auth', async (req, res) => {
  const apiRequest = await axios.get(`${domain_firebase}users_list/` + req.body.username + '.json')

  if (apiRequest.data.pwd === crypto.pbkdf2Sync(req.body.password.toString(), jwtSecret, 1000, 64, `sha512`).toString(`hex`)) {
    // TODO: Create JWT and set to cookie
    const token = jsonwebtoken.sign({ user: req.body.username }, jwtSecret);

    res.cookie('token', token, { httpOnly: true, secure: true });

    res.json({ token });
  } else {
    res.status(400).json({ status: 'Auth Error' });
  }

});

app.use(cookieParser());

// TODO: Check JWT with every request

app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'], getToken: req => req.cookies.token }));

app.get('/api/users/', async (req, res) => {
  const url = req.protocol + '://' + req.get('host') + req.path;
  console.log(url);

  const { page = 1, page_size = 20 } = req.query

  let offset = (page - 1) * page_size;
  let max = page_size;
  const apiRequest = await axios.get(`${domain_firebase}users_list.json`)

  const allUsers = []

  for (const index in apiRequest.data) {
    apiRequest.data[index]._id = index
    delete apiRequest.data[index].pwd
    allUsers.push(apiRequest.data[index])
  }

  const next = url;
  const previous = url;

  const size = allUsers.length;
  const results = allUsers.splice(offset, max);

  res.json(
    {
      count: size,
      next: next,
      previous: previous,
      results: results,
    }
  );
});

app.post('/api/users', async (req, res) => {
  const user = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    pwd: crypto.pbkdf2Sync(req.body.password.toString(), jwtSecret, 1000, 64, `sha512`).toString(`hex`)
  }

  const apiRequest = await axios.put(`${domain_firebase}users_list/` + req.body.username + '.json', user)
  res.json({ status: "success", data: apiRequest.data });
});

app.put('/api/users/:username', async (req, res) => {
  console.log(req.body, req.params, req.query);
  const user = {
    email: req.body.email,
    name: req.body.name,
  }

  const apiRequest = await axios.patch(`${domain_firebase}users_list/` + req.params.username + '.json', user)
  res.json({ status: "success", data: apiRequest.data });
});

app.delete('/api/users/:username', async (req, res) => {
  const apiRequest = await axios.delete(`${domain_firebase}users_list/` + req.params.username + '.json')
  res.json({ status: "success", data: apiRequest.data });
});

app.get('/api/users/:id', async (req, res) => {
  const apiRequest = await axios.get(`${domain_firebase}users_list/` + req.params.id + '.json')
  res.json({ status: "success", data: apiRequest.data });
});

app.listen(3001);
console.log('Api running on http://localhost:3001');
