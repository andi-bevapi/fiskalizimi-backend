const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("db", null, null, {
    dialect: "sqlite",
    logging: false,
    storage: path.join(__dirname, "..", "db", "db.sqlite3"),
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected with our db");
    })
    .catch((err) => {
        console.log("Error while trying to connect with our db =>", err);
    });
    
module.exports = sequelize;