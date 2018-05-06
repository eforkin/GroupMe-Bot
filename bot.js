const request = require('request');
const events = require('events');
const util = require('util');
const cool = require('cool-ascii-faces');
const formidable = require('formidable');

const captionbot = require('captionbot');

var botID = process.env.BOT_ID;
var botName = process.env.NAME;

function respond(req, res) {
  let name = ""
  let message = ""

  let form = new formidable.IncomingForm();
  let messageFields = {};
  form.parse(req, function(err, fields, files) {
    if (err) console.error("bad incoming data " + err);
  });

  form.on('field', function(name, value) {
    messageFields[name] = value;
  });

  form.on('end', function() {

    if (messageFields["name"] != botName) {

      console.log(messageFields["name"]);
      console.log(messageFields["text"]);
      console.log(messageFields["attachments"]);

      name = messageFields["name"];
      message = messageFields["text"];
      attachment = messageFields["attachments"];

      if (message) {
        res.writeHead(200);
        postMessage(message, name, attachment)
        res.end();
      }
      else {
        console.log("don't care");
        res.writeHead(200);
        res.end();
      }
    }
  });
}
function postMessage(message, name, attachment) {

  let botRegex = /[cC][oO][oO][lL] [gG][uU][yY]|[gG][iI][rR][lL]/;
  let captionThisRegex = /[cC][aA][pP][tT][iI][oO][nN] [tT][hH][iI][sS]/;

  let botResponse;

  console.log("attachment test...");
  console.log(attachment[0]);

  if (botRegex.test(message)) {
    botResponse = cool();
  }
  else if (attachment && captionThisRegex.test(message)) {
    captionbot(attachment[0]["url"])
    .then(caption => {
      botResponse = caption;
      console.log(caption);
    });
  }

  console.log('sending ' + botResponse + ' to ' + botID);

  let url = 'https://api.groupme.com/v3/bots/post';
  let package = {};
  package.text = botResponse;
  package.bot_id = botID;
  request( { url:url, method:'POST', body: JSON.stringify(package) });
}

exports.respond = respond;
