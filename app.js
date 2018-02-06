const express = require('express')
var jwt = require('jsonwebtoken');
const httpProxy = require('express-http-proxy')
const app = express()

const userServiceProxy = httpProxy('http://localhost:5000')

// Authentication
app.use((req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ");

    var decoded = jwt.decode(token[1]);

    req.headers['X-ViviPay-User-Id'] = decoded.sub;
  }

  next()
})

// Proxy request
app.all('/*', (req, res, next) => {
  userServiceProxy(req, res, next)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});