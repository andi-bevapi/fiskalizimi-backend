const port = process.env.PORT || 5000;
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require("./routes");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const customResponse = require('./utils/response');
const errorHandler = require("./middleware/errorHandler");
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
                url: 'http://localhost:5000'
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

const config = {
    cors : {
        origin: "http://localhost:5000",
        methods: ["GET,POST","PUT","DELETE"]
    }
}

app.use(cors(config));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(express.urlencoded());
app.response = Object.create(customResponse);
app.use('/api', routes);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
