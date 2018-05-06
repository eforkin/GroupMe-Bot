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
var cool = require('cool-ascii-faces');
const formidable = require('formidable')

var botID = process.env.BOT_ID;

function respond(req, res) {
  let name = ""
  let message = ""

  console.log("WOOORKKK");
  var form = new formidable.IncomingForm();
   var messageFields = {};
   form.parse(req, function(err, fields, files) {
     if (err) console.error("bad incoming data " + err);
   });

   form.on('field', function(name, value) {
     messageFields[name] = value;

    if ("name" in messageFields && "text" in messageFields) {
      console.log(messageFields["name"]);
      console.log(messageFields["text"]);
    }
   });

  // if (req) {
  //   var botRegex = /^\/cool guy$/;
  //
  //   if(request.text) {
  //     res.writeHead(200);
  //     postMessage();
  //     res.end();
  //   } else {
  //     console.log("don't care");
  //     res.writeHead(200);
  //     res.end();
  //   }
  // }
}
function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
