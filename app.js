const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const customResponse = require('./utils/response');

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

app.response = Object.create(customResponse);

app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
