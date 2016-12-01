'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
const crc = require('crc');
const cors = require('cors');
const moment = require('moment')
// const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
// const dbName = 'urlDB';
// const connectionString = 'mongodb://localhost:27017/' + dbName;
// mongoose.connect(connectionString);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'URL Shortener';
app.locals.urls = [];

app.get('/', (request, response) => {
  response.send(app.locals.title);
});

app.get('/api/v1/urls', (request, response) => {
  const urls = app.locals.urls;
  response.send(urls);
});

// app.get('/api/v1/urls/:id', (request, response) => {
//   const { id } = request.params;
//   const url = app.locals.urls[id];
//
//   if (!url) { return response.sendStatus(404); }
//
//   response.send(app.locals.urls);
// });

app.get('/api/v1/urls/:shortURL', (request, response) => {
  let targetUrl = app.locals.urls.filter((urlz) => urlz.shortURL === request.params.shortURL)[0]
  console.log(request.params.shortURL)
    if (!targetUrl) { response.send(`Please go away to somewhere that exists and never come back here.`)}
    ++targetUrl.count
    response.redirect( targetUrl.url )
})

// router.get('/:shortUrl', (request, response) => {
//   let targetUrl = app.locals.urls.filter((url) => url.shortUrl===request.params.shortUrl)[0]
//
//   if (!targetUrl) { response.send(`Please go away to somewhere that exists and never come back here.`)}
//   ++targetUrl.counter
//   response.redirect( targetUrl.longUrl )
// })

app.post('/api/v1/urls', (request, response) => {
  const { url } = request.body;
  const id = md5(url);
  const urlEncode = crc.crc24(url).toString(16);
  const shortURL =  urlEncode;
  const date = moment(Date.now()).format('MMM Do YYYY, h:mma');
  const count = 0;

  if (!url) {
    return response.status(422).send({
      error: 'No url property provided'
    });
  }

  app.locals.urls.push({id: id, url: url, shortURL: shortURL, date: date, count: count });

  response.status(201).json({ id, url, shortURL });
});

app.put('/api/v1/urls/:id', (request, response) => {
  const { id } = request.params;
  const { url } = request.body;
  const originalURL = app.locals.urls[id];

  if (!originalURL) { return response.status(404); }

  app.locals.urls[id] = url;

  response.status(201).json({ id, url });
});

app.delete('/api/v1/urls/:id', (request, response) => {
  const { id } = request.params;
  const originalURL = app.locals.urls[id];

  if (!originalURL) {
    return response.status(422).send({
      error: 'There is no url with that id'
    });
  }

  delete app.locals.urls[id];

  response.send('Url deleted');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
