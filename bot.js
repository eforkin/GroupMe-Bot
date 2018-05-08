const request = require('request');
const events = require('events');
const util = require('util');
const cool = require('cool-ascii-faces');
const formidable = require('formidable');

let botID = process.env.BOT_ID;
let botName = process.env.BOT_NAME;

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

    let botRegex = /[cC][oO][oO][lL] [gG][uU][yY]|[cC][oO][oO][lL] [gG][iI][rR][lL]/;
    let investigateRegex = /[iI][nN][vV][eE][sS][tT][iI][gG][aA][tT][eE]/;
    let cryptoRegex = /[cC][rR][yY][pP][tT][oO]/;
    let exaggerateRegex = /[eE][xX][aA][gG][gG][eE][rR][aA][tT][eE]/;
    let captionThisRegex = /[cC][aA][pP][tT][iI][oO][nN] [tT][hH][iI][sS]/
    let nasaPicRegex = /[sS][pP][aA][cC][eE] [pP][iI][cC]/;
    let whereRegex = /[wW][hH][eE][rR][eE] [iI][sS] [tT][hH][iI][sS]/;
    let combineRegex = /[cC][oO][mM][bB][iI][nN][eE]/;

    let botResponse;

    if (botRegex.test(message)) {
        botResponse = cool();

        console.log('sending ' + botResponse + ' to ' + botID);

        let url = 'https://api.groupme.com/v3/bots/post';
        let package = {};
        package.text = botResponse;
        package.bot_id = botID;
        request( { url:url, method:'POST', body: JSON.stringify(package) });
    }

    // if (cryptoRegex.test(message)) {
    //   request('https://api.cryptonator.com/api/ticker/ltc-usd', function(err, res, body) {
    //     let json = JSON.parse(body);
    //     console.log(json);
    //     console.log(json["ticker"]);
    //     let curPrice = Number((parseFloat(json["ticker"]["price"])).toFixed(2));
    //     botResponse = "Litecoin's price is currently at $" + curPrice + ".";
    //
    //     let url = 'https://api.groupme.com/v3/bots/post';
    //     let package = {};
    //     package.text = botResponse;
    //     package.bot_id = botID;
    //     request( { url:url, method:'POST', body: JSON.stringify(package) });
    //   });
    // }
    // else if (nasaPicRegex.test(message)) {
    //   let searchURL = 'https://api.nasa.gov/planetary/apod?api_key=' + process.env.NASA_KEY;
    //   console.log(searchURL);
    //   request(searchURL, function(err, res, body) {
    //     let json = JSON.parse(body);
    //     botResponse = json["url"];
    //
    //     let url = 'https://api.groupme.com/v3/bots/post';
    //     let package = {};
    //     package.text = botResponse;
    //     package.bot_id = botID;
    //     request( { url:url, method:'POST', body: JSON.stringify(package) });
    //   });
    // }
    if (investigateRegex.test(message) && attachment && attachment.length > 0) {
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
        let response = JSON.parse(body);
        for (let i = 0; i < response["output"]["faces"].length; i++) {
          let person = response["output"]["faces"][i];
          botResponse = "Person #" + parseInt(i + 1) + " is a " + person.cultural_appearance + " " +
          person.gender + " between the ages of " + person.age_range[0] + " and " + person.age_range[1] + ".";

          let url = 'https://api.groupme.com/v3/bots/post';
          let package = {};
          package.text = botResponse;
          package.bot_id = botID;
          request( { url:url, method:'POST', body: JSON.stringify(package) });
        }
      });
    }
    else if (exaggerateRegex.test(message) && attachment && attachment.length > 0) {
      request.post({
        url: 'https://api.deepai.org/api/deepdream',
        headers: {
          'Api-Key':  process.env.DEEP_AI_KEY
        },
        formData: {
          'content': attachment[0].url
        }
      }, function callback(err, httpResponse, body) {
        if (err) {
          console.error('request failed:', err);
          return;
        }
        var response = JSON.parse(body);
        console.log(response);

        botResponse = response["output_url"];

        let url = 'https://api.groupme.com/v3/bots/post';
        let package = {};
        package.text = botResponse;
        package.bot_id = botID;
        request( { url:url, method:'POST', body: JSON.stringify(package) });
      });
    }
    else if (whereRegex.test(message) && attachment && attachment.length > 0) {
        console.log(attachment)
      request.post({
        url: 'https://api.deepai.org/api/places',
        headers: {
          'Api-Key':  process.env.DEEP_AI_KEY
        },
        formData: {
          'content': attachment[0].url
        }
      }, function callback(err, httpResponse, body) {
        if (err) {
          console.error('request failed:', err);
          return;
        }
        var response = JSON.parse(body);
        console.log(response);

        botResponse = response["output_url"];

        let url = 'https://api.groupme.com/v3/bots/post';
        let package = {};
        package.text = botResponse;
        package.bot_id = botID;
        request( { url:url, method:'POST', body: JSON.stringify(package) });
      });
    }
    else if (combineRegex.test(message) && attachment && attachment.length == 2) {
      request.post({
        url: 'https://api.deepai.org/api/CNNMRF',
        headers: {
          'Api-Key':  process.env.DEEP_AI_KEY
        },
        formData: {
            'content_image': attachment[0].url,
            'style_image': attachment[1].url,
        }
      }, function callback(err, httpResponse, body) {
        if (err) {
          console.error('request failed:', err);
          return;
        }
        var response = JSON.parse(body);
        console.log(response);

        botResponse = response["output_url"];

        let url = 'https://api.groupme.com/v3/bots/post';
        let package = {};
        package.text = botResponse;
        package.bot_id = botID;
        request( { url:url, method:'POST', body: JSON.stringify(package) });
      });
    }
}

exports.respond = respond;
