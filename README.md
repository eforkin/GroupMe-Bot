# GroupMe Bot

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

## Add Bot ID and Bot Name to Heroku App

1. Go to https://dev.groupme.com/bots and click on the one you just created.
2. On your Bot's page, copy the Bot ID
3. Go back to heroku and find the app you just created. On the app page, click settings in the top navigation.
On your app's setting page, find the Config Vars section and click the Reveal Config Vars button. Then click edit.

Fill out the form to add an environment variable to your app:
  * In the "key" field type: BOT_ID
  * In the "value" field paste your Bot ID
  * Click the save button
  
Do this again for the Bot Name:
  * In the "key" field type: BOT_NAME
  * In the "value" field paste your Bot Name
  * Click the save button

## You should be all set!

Go to GroupMe and type "cool guy" or "cool girl" in the group where your bot lives. It should text back a cool face!

