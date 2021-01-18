var express = require('express');
var router = express.Router();

/* GET home page. */
/**
 * @swagger
 * /:
 *  get:
 *    description: Main route entry endpoint
 *    tags: [Main]
 *    responses:
 *      '200':
 *        description: Main route entry endpoint
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
