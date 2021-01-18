var express = require('express');
var router = express.Router();
const axios = require('axios')
const appdetails = require('../config/index')


/**
 * @swagger
 * /api/rates:
 *  get:
 *    description: Get rates
 *    tags: [Currency]
 *    parameters: 
 *      - name: base
 *        in: query
 *        description: Base currency
 *        required: true
 *        type: string
 *      - name: currency
 *        in: query
 *        description: Currencies to get rate for
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Rates
 *        schema: 
 *          type: object
 *          properties:
 *            results:
 *              type: object
 *              properties: 
 *                base:
 *                  type: string
 *                date:
 *                  type: string
 *                rates: 
 *                  type: object
 *      '400':
 *        description: Error
 *        schema: 
 *          type: object
 *          properties:
 *            message:
 *              type: string  
 */
router.get('/rates', function(req, res, next) {
  const { base, currency } = req.query
  let currencyArray = currency.split(',')
  axios.get(`${appdetails.baseurl}/latest/?base=${base}`)
  .then((response) => {
    let rates = {}
    for (let index = 0; index < currencyArray.length; index++) {
      const element = currencyArray[index];
      rates[element] = response.data.rates[element]
    }
    res.status(200).send({
      results: {
        base: response.data.base,
        date: response.data.date,
        rates
      }
    })
  })
  .catch((err) => {
    console.log(err)
    res.status(400).send({
      message: 'Something went wrong'
    })
  })
});


module.exports = router;
