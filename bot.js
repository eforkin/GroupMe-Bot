var HTTPS = require('https');
const request = require('request');
const events = require('events');
const util = require('util');
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

      if(message = "Hey") {
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
