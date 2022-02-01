const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('./db');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fiskalizimi API',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8000'
            },
            {
                url: 'https://fiskalizimi-dev-api.herokuapp.com'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./routes/*.js']
}

const specs = swaggerJsDoc(options);

const app = express();

app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));