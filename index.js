const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require("./routes");
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

const config = {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET,POST","PUT","DELETE"]
    }
}

app.use(cors(config));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

//we use build in express body parser middleware
app.use(express.json());
app.use(express.urlencoded());

app.use("/api",routes);

app.listen(port, () => console.log(`Server running on port ${port}`));