var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

var indexRouter = require('./routes/index');
var currencyRouter = require('./routes/currency');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Phase 1.2: Back-end',
      description: 'Phase 1.2: Back-end',
      contact: {
        name: 'Bello Ajibola Fuad'
      },
    }
  },
  apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)


var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(helmet())
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', currencyRouter);

module.exports = app;
