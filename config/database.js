require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const config = {
  development: {
    host,
    dialect: "mysql",
    username,
    password,
    database,
    logging: false,
    define: {
      timestamps: true,
    },
  },
  test: {
    host,
    dialect: "mysql",
    username,
    password,
    database,
    logging: false,
    define: {
      timestamps: true,
    },
  },
};

module.exports = config[process.env.NODE_ENV];
