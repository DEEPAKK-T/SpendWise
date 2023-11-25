// const { Client } = require("pg")
const Config = require("../Config/config")

//ORM like Sequelize (Object Relational Mapping) ==> Representing database tables as javascript objects
const Sequelize = require("sequelize");

const sequelize = new Sequelize(Config.DBNAME, Config.USERNAME, Config.PASSWORD, {
    host: Config.HOST,
    dialect: Config.dialect,
  });

  //it will drop and recreate the table : Be cautious in Prod env
sequelize.sync({ force: true });
console.log("Connected to PostgresDB")

// class Database {
//     constructor() {
//         this.Client = new Client({
//             user: "postgres",
//             host: "localhost",
//             database: "spendwise",
//             password: "deepak123",
//             port: 5432,

//         });
//     }

//     async connect() {
//         try {
//             this.Client.connect()
//             console.log("Connected to postgres DB")
//         } catch (error) {
//             console.log("Error connecting to postgres DB", error)
//         }
//     }

//     async disconnect() {
//         try {
//             this.Client.end()
//             console.log("disconnected from postgres DB")
//         } catch (error) {
//             console.log("Error disconnecting from postgres DB", error)
//         }
//     }
// }

module.exports = sequelize;

