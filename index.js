const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const bot = require('./bot.js');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.send("Hello World"))
  .get('/cool', function (req, res) {
    console.log("ASFASDF");
    res.send(cool());
  })
  .post('/incoming', function (req, res) {
    bot.respond(req, res);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
