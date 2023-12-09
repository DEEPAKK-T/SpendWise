// const { Client } = require("pg")
const Config = require("../config/config")

//ORM like Sequelize (Object Relational Mapping) ==> Representing database tables as javascript objects
const Sequelize = require("sequelize");

const sequelize = new Sequelize(Config.DBNAME, Config.USERNAME, Config.PASSWORD, {
    host: Config.HOST,
    dialect: Config.dialect,
  });

  //it will drop and recreate the table : Be cautious in Prod env
sequelize.sync({ force: false });
console.log("Connected to PostgresDB")

module.exports = sequelize;

