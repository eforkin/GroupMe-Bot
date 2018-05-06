// var bot = require('fancy-groupme-bot');
// var util = require('util');
//
// // local configuration read from env.
// const TOKEN = process.env.TOKEN; // your groupme api token
// const GROUP = process.env.GROUP; // the room you want to join
// const NAME = process.env.NAME; // the name of your bot
// const URL = process.env.CALLBACK // the domain you're serving from, should be accessible by Groupme.
// const CONFIG = {token:TOKEN, group:GROUP, name:NAME, url:URL};
//
// var mybot = bot(CONFIG);
//
// mybot.on('botRegistered', function(b) {
//   console.log("I am registered");
//   b.message("WHAT UP BRO?");
// });
//
// mybot.on('botMessage', function(b, message) {
//   console.log("I got a message, fyi");
//   if (message.name != b.name) {
//     b.message(message.name + " said " + message.text);
//   }
// });
//
// console.log("i am serving");
// mybot.serve(8000);


var HTTPS = require('https');
const request = require('request');
var cool = require('cool-ascii-faces');
const formidable = require('formidable')

var botID = process.env.BOT_ID;
var botName = process.env.NAME;

function respond(req, res) {
  let name = ""
  let message = ""
  let sentMessage = false;

  console.log("WOOORKKK");
  var form = new formidable.IncomingForm();
  var messageFields = {};
  form.parse(req, function(err, fields, files) {
    if (err) console.error("bad incoming data " + err);
  });

  form.on('field', function(name, value) {
    messageFields[name] = value;

    if ("name" in messageFields && "text" in messageFields && !sentMessage && messageFields["name"] != botName) {
      sentMessage = true;
      console.log(messageFields["name"]);
      console.log(messageFields["text"]);

      name = messageFields["name"];
      message = messageFields["text"];

      if(message) {
        // var botRegex = /^\/cool guy$/;

        res.writeHead(200);
        postMessage();
        res.end();
      } else {
        console.log("don't care");
        res.writeHead(200);
        res.end();
      }
    }

  });
}
function postMessage() {
  var botResponse = cool();

  console.log('sending ' + botResponse + ' to ' + botID);

  var url = 'https://api.groupme.com/v3/bots/post';
  var package = {};
  package.text = botResponse;
  package.bot_id = botID;
  request( { url:url, method:'POST', body: JSON.stringify(package) });
}


exports.respond = respond;
