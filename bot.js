const request = require('request');
const events = require('events');
const util = require('util');
const cool = require('cool-ascii-faces');
const formidable = require('formidable');

let botID = process.env.BOT_ID;
let botName = "TestBot";
let _MS_PER_DAY = 1000 * 60 * 60 * 24;

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

    if (messageFields["name"] != botName && messageFields["id"] != botID) {

      console.log(messageFields["name"]);
      console.log(messageFields["text"]);
      console.log(messageFields["id"]);

      console.log(botName);

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
  let captionThisRegex = /[iI][nN][vV][eE][sS][tT][iI][gG][aA][tT][eE]/;
  let mackRegex = /[mM][aA][cC][kK][eE][nN][zZ][iI][eE]/;
  let cryptoRegex = /[cC][rR][yY][pP][tT][oO]/

  let botResponse;

  if (botRegex.test(message)) {
    botResponse = cool();
  }
  else if (mackRegex.test(message)) {
    const curDate = new Date();
    const theDate = new Date("12/9/2017");
    let totalDays = dateDiffInDays(theDate, curDate);

    botResponse = "It has been " + parseInt(totalDays) + " days since Chris had sex with Mackenzie.";
  }

  console.log('sending ' + botResponse + ' to ' + botID);

  let url = 'https://api.groupme.com/v3/bots/post';
  let package = {};
  package.text = botResponse;
  package.bot_id = botID;
  request( { url:url, method:'POST', body: JSON.stringify(package) });

  if (cryptoRegex.test(message)) {
    request('https://api.cryptonator.com/api/ticker/ltc-usd', function(err, res, body) {
      let json = JSON.parse(body);
      console.log(json);
      console.log(json["ticker"]);
      let curPrice = Number((parseFloat(json["ticker"]["price"])).toFixed(2));
      botResponse = "Litecoin's price is currently at $" + curPrice + ".";

      let url = 'https://api.groupme.com/v3/bots/post';
      let package = {};
      package.text = botResponse;
      package.bot_id = botID;
      request( { url:url, method:'POST', body: JSON.stringify(package) });
    });
  }
  else if (captionThisRegex.test(message) && attachment) {
    console.log("KEY");
    console.log(process.env.DEEP_AI_KEY);
    request.post({
      url: 'https://api.deepai.org/api/demographic-recognition',
      headers: {
        'Api-Key': process.env.DEEP_AI_KEY
      },
      formData: {
        'image': attachment[0].url
      }
    }, function callback(err, httpResponse, body) {
      if (err) {
        console.error('request failed:', err);
        return;
      }
      var response = JSON.parse(body);
      console.log(response);
    });
  }
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

exports.respond = respond;
