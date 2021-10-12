const express = require('express');
const router = express.Router();

/* // get cool page */

router.get('/', (req, res, next) => {
  //   res.render('cool', { cool: 'This is the cool text' });
  res.render('cool', { title: 'this is a cool ' });
});

module.exports = router;
