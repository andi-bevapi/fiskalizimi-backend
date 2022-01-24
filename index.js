const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./models/sequelize');

const app = express();

sequelize.sync();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));