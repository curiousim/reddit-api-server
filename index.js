require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const app = express();
//const snoowrap = require('snoowrap');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const port = process.env.APP_PORT;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/api/getaccesstoken', (req, res) => {
  console.log(req.body.code);
  let username = process.env.REDDIT_APP_ID;
  let password = process.env.REDDIT_APP_SECRET;
  const redirecturl = 'http://localhost:5000';
  const code = req.body.code;
  axios({
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'POST',
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirecturl
    },
    auth: {
      username,
      password
    }
  })
    .then(response => {
      access_token = response.data.access_token;
      if (typeof access_token !== 'undefined' || access_token != null) {
        res.json({ accessToken: access_token });
      } else {
        console.log(response);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
