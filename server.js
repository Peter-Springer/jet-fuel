const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'URL Shortener';
app.locals.urls = [];

app.get('/', (request, response) => {
  response.send('visit /api/v1/urls/:id to view single url');
});

app.get('/api/v1/urls', (request, response) => {
  const { id } = request.params;
  const url = app.locals.urls

  if (!url) { return response.sendStatus(404); }

  response.send(app.locals.urls)
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.post('/api/v1/urls', (request, response) => {
  const { url } = request.body;
  const id = md5(url);

  if (!url) {
    return response.status(422).send({
      error: 'No url property provided'
    });
  }

  app.locals.urls.push({id: id, url: url});

  response.status(201).json({ id, url });
});
