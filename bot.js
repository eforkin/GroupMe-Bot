var HTTPS = require('https');
const request = require('request');
const events = require('events');
const util = require('util');
var cool = require('cool-ascii-faces');
const formidable = require('formidable')

var botID = process.env.BOT_ID;
var botName = process.env.NAME;

Bot.prototype.serve = function(address) {
  var self = this;
  var server = http.createServer(function (request, response) {
    if (request.url == '/' && request.method == 'GET') {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify({'name': self.name, 'group': self.group}));
    } else if (request.url == '/incoming' && request.method == 'POST') {
      var form = new formidable.IncomingForm();
      var messageFields = {};
      form.parse(request, function(err, fields, files) {
        if (err) console.error("bad incoming data " + err);
      });

      form.on('field', function(name, value) {
        messageFields[name] = value;
      });

      form.on('end', function() {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("THANKS");
        self.emit('botMessage', self, { name:messageFields.name, text:messageFields.text });
      });

    } else {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.end("NOT FOUND");
    }

  }.bind(this));

  server.listen(address);
};

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
