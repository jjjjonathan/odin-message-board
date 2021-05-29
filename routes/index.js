var express = require('express');
var router = express.Router();
var formatDistanceToNow = require('date-fns/formatDistanceToNow');

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date('02/02/2021'),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Mini Message Board',
    messages: messages.map((message) => {
      return {
        ...message,
        added: formatDistanceToNow(message.added, {
          addSuffix: true,
          includeSeconds: true,
        }),
      };
    }),
  });
});

router.get('/new', (req, res) => {
  res.render('form');
});

router.post('/new', (req, res) => {
  const { message, name } = req.body;
  messages.push({ text: message, user: name, added: new Date() });
  res.redirect('/');
});

module.exports = router;
