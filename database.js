const { Client } = require("pg")

class Database {
    constructor() {
        this.Client = new Client({
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "deepak123",
            port: 5432,

        });
    }

    async connect() {
        try {
            this.Client.connect()
            console.log("Connected to postgres DB")
        } catch (error) {
            console.log("Error connecting to postgres DB", error)
        }
    }

    async disconnect() {
        try {
            this.Client.end()
            console.log("disconnected from postgres DB")
        } catch (error) {
            console.log("Error disconnecting from postgres DB", error)
        }
    }
}

module.exports = Database;
