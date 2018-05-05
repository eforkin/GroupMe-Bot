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
  .get('/cool', (req, res) => res.send(cool()))
  .post('/', function (req, res) {
     res.send('Got a POST request'));
     console.log("GOT A POST REQUEST");
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
