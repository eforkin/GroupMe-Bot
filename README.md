# GroupMe Bot Setup

## Run Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/eforkin/GroupMe-Bot.git
$ cd GroupMe-Bot
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploy to Heroku

1. Go to https://www.heroku.com and log in (create an account if necessary).
2. Go to https://dashboard.heroku.com/new-app and create a new app with a name of your choice.
3. Under GroupMe-Bot directory, run the following commands. Every time you update the bot, you will push to heroku master.

```
$ heroku create
$ git add .
$ git commit -m "first commit"
$ git push heroku master
```

## Create GroupMe Bot

1. Go to https://dev.groupme.com/session/new and log in (create an account if necessary. The login credentials are the same as your regular GroupMe account.
2. Go to https://dev.groupme.com/bots/new
  * Select the group where you want the bot to live
  * Give your bot a name
  * Paste in the url to your newly deployed heroku app
    * `http://your-app-name-here.herokuapp.com/`
  * (Optional) Give your bot an avatar by providing a url to an image
  * Click submit

## Add Bot ID and Name to Heroku App

1. Go to https://dev.groupme.com/bots and click on the one you just created.

![Select your new bot](http://i.groupme.com/871x333.png.5a33ef2b6ab74ea59d5aaa5569aaaf23)

On your Bot's page, copy the Bot ID

![Copy your Bot ID](http://i.groupme.com/615x295.png.3256190e86ed4cd7ae6cf09899c1f9a8)

## Add your Bot ID to your Heroku app:

Go back to heroku and find the app you just created. On the app page, click settings in the top navigation:

![Go to your app's settings](http://i.groupme.com/722x127.png.27c0a2e83c524064bd41bb66df76d14c)

On your app's setting page, find the Config Vars section and click the Reveal Config Vars button:

![Reveal your environment variables](http://i.groupme.com/606x181.png.94d5157963bc419886e98e038e3195c3)

Then click edit:

![Edit your environment variables](http://i.groupme.com/796x212.png.b8979454fc4742c7bae688ac67262755)

Fill out the form to add an environment variable to your app:
  * In the "key" field type: BOT_ID
  * In the "value" field paste your Bot ID
  * Click the save button
  
Do this again for the Bot_Name
  * In the "key" field type: BOT_NAME
  * In the "value" field paste your Bot Name
  * Click the save button

![Add the Bot ID environment variable](http://i.groupme.com/784x148.png.5790498a7acd46b289aca2be43e9c84e)

## Now go test your bot!

Go to GroupMe and type "cool guy" or "cool girl" in the group where your bot lives to see it in action.

![Test your Bot](http://i.groupme.com/821x587.png.7bcf55bed1c64acab83fa2c2ad0b0862)


