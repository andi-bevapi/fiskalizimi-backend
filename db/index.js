const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Client = require('./models/client');
const Branch = require('./models/branch');
const Product = require('./models/product');
const Category = require('./models/category');
const SellingUnit = require('./models/sellingunit');
const Supplier = require('./models/supplier');
const TransportOrder = require('./models/transportorder');
const TransportOrderDetails = require('./models/transportorderdetails');
const TransportOrderItems = require('./models/transportorderitems');
const User = require('./models/user');
const Permission = require('./models/permission');
const User_Permissions = require('./models/user_permissions');

const connection = new Sequelize(dbConfig);

connection.authenticate().then(() => {
    console.log('Connected to DB');
}).catch((error) => {
    console.log('Connection Error: ', error);
})

Client.init(connection);
Branch.init(connection);
Product.init(connection);
Category.init(connection);
SellingUnit.init(connection);
Supplier.init(connection);
TransportOrder.init(connection);
TransportOrderDetails.init(connection);
TransportOrderItems.init(connection);
User.init(connection);
Permission.init(connection);
User_Permissions.init(connection);

Client.associate(connection.models);
Branch.associate(connection.models);
Product.associate(connection.models);
TransportOrder.associate(connection.models);
TransportOrderDetails.associate(connection.models);
TransportOrderItems.associate(connection.models);
User.associate(connection.models);
Permission.associate(connection.models);

module.exports = connection;