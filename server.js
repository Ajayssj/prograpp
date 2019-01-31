let express = require('express');



const webpush = require('web-push');

const publicVapidKey = 'BHN6mABMK8fphERQfNd3eWQ6y3iwhMzRj0L7j-_iO2em0qTEVE9UC1Ss5c38ih0RmO-6FIh-U8P71iiV25yHbkA';
const privateVapidKey = 'SYnD7n3pphXXAbM8mejLV0As7TOB3gSSObaq_j3BWlw';

// Replace with your email
webpush.setVapidDetails('mailto:ajay@ajay.io', publicVapidKey, privateVapidKey);

let app = express();
global.subscribers = [];

app.use(require('body-parser').json());
app.use(express.static(__dirname + '/assets'));
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    // const payload = JSON.stringify({ title: 'test' });
  
    console.log("New Subscriber ",subscription);
    subscribers.push(subscription)
    // webpush.sendNotification(subscription, payload).catch(error => {
    //   console.error(error.stack);
    // });
});

app.post('/sendNotification',(req,res) => {
    let icon = 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png';
    let url = req.body.url;
    const payload = { title : req.body.title,  body : req.body.message, icon, url };
    subscribers.forEach(subscriber => {
        webpush.sendNotification(subscriber, JSON.stringify(payload)).catch(error => {
            console.error(error.stack);
          });
    });

    res.send('Notification sent!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
    console.log('Server Started At : ', PORT);
})