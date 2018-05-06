// const cool = require('cool-ascii-faces')
// const express = require('express')
// const path = require('path')
// const bot = require('./bot.js');
// const PORT = process.env.PORT || 5000
//
// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.send("Hello World"))
//   .get('/cool', function (req, res) {
//     console.log("ASFASDF");
//     res.send(cool());
//   })
//   .post('/', function (req, res) {
//     bot.respond(req, res);
//   })
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

var bot = require('fancy-groupme-bot');
var util = require('util');

// local configuration read from env.
const TOKEN = process.env['TOKEN']; // your groupme api token
const GROUP = process.env['GROUP']; // the room you want to join
const NAME = process.env['NAME']; // the name of your bot
const URL = process.env['URL']; // the domain you're serving from, should be accessible by Groupme.
const CONFIG = {token:TOKEN, group:GROUP, name:NAME, url:URL};

var mybot = bot(CONFIG);

mybot.on('botMessage', function(b, message) {
  console.log("I got a message, fyi");
  if (message.name != b.name) {
    b.message(message.name + " said " + message.text);
  }
});

console.log("i am serving");
mybot.serve(8000);
