const path = require("path");

module.exports = {
    dialect: 'sqlite',
    storage: path.join(__dirname, "..", "db/data", "db.sqlite3"),
    username: null,
    password: null,
    database: 'db',
    logging: false,
    define: {
        timestamps: true
    }
};