const express = require('express');
const app = express();
const Twit = require('twit');
const config = require('./config.js');
const fs = require('fs');
const bodyParser = require('body-parser');
const timeConvert = require('./timestamp.js');

const T = new Twit(config);

app.listen(3000);

app.use(bodyParser.urlencoded({ extended : false}));

app.set('view engine', 'pug');
app.use(express.static('public'));

const profIMG = [];
const render = {
          tweetsCom: false,
          friendsCom: false,
          messagesCom: false
        };

function appRender() {
   app.get('/', (req, res) => {
        res.render('index', render);
        console.log('RENDERING ACCOUNT INFO!');
    });    
};

function getProfPic(){
  console.log('Running getProfPic');
  for(let i = 0; i < 5; i++){
    const senderID = render.messages[i].sender;
    console.log(senderID);
    const j = i;
  T.get('users/lookup', { user_id : senderID}, function (err, data, response) {
          console.log(data[0].profile_image_url);
          render.messages[j].senderIMG = data[0].profile_image_url;   
      });
  }
};

//GET ACOUNT CREDENTIALS
const account =
  T.get('account/verify_credentials', { skip_status: true }, function(err, data, response){
    render.user = {
      name : data.name,
      handle : data.screen_name,
      profileIMG : data.profile_image_url,
      bannerIMG : data.profile_banner_url,
      friends : data.friends_count  
    }
  }).then(() => {
    appRender();
  });

 
//GET LAST 5 TWEETS
const fiveTweets =
  T.get('statuses/user_timeline', {count: 5},  function (err, data, response) {
    render.tweetsCom = true;
    render.tweets = [];
    for(var i = 0; i < data.length; i++){
      // console.log(data[i]);
      render.tweets.push({
        text : data[i].text,
        retweet: data[i].retweet_count,
        favorite: data[i].favorite_count,
        timestamp: timeConvert(data[i].created_at)
      });
    }
  }).then(() => {
    appRender();
  });

//GET LAST 5 FRIENDS
const fiveFriends =
  T.get('friends/list', {count: 5}, function(err,data,response){
      render.friendsCom = true;
      render.friends = []
      for(var i = 0; i < 5; i++){
          render.friends.push({
            name : data.users[i].name,
            screenName : data.users[i].screen_name,
            profileIMG : data.users[i].profile_image_url,
            following : data.users[i].following
          });
      }
  }).then(() => {
    appRender();
  });

//GET LAST 5 MESSAGES
const fiveMessages = 
  T.get('direct_messages/events/list', {count: 6},  function (err, data, response) {
    render.messagesCom = true;
    render.messages = [];
    for(var i = 0; i < 5; i++){
      render.messages.push({
        text : data.events[i].message_create.message_data.text,
        sender : data.events[i].message_create.sender_id,
        timestamp : timeConvert(data.events[i].created_timestamp, true )
      });
    }
    
  }).then(result => {
    setTimeout(getProfPic, 4000);
  }).then(result => {
    appRender();
  });

app.post('/', (req, res) => {
  T.post('statuses/update', { status: req.body.text })
    .then(result => {
      T.get('statuses/user_timeline', {count: 5},  function (err, data, response) {
        render.tweetsCom = true;
        render.tweets = [];
        for(var i = 0; i < data.length; i++){
          render.tweets.push({
            text : data[i].text,
            retweet: data[i].retweet_count,
            favorite: data[i].favorite_count,
            timestamp: timeConvert(data[i].created_at)
          });
        }
      })
        .then(() => {
          res.render('index', render);
        });
    })
});
