const mongoose = require('mongoose');

const connectString = process.env.MONGO_URL;
class Database {
    constructor() {
        this.connect();
    }

    //Connect
    connect(type = 'mongodb'){
        mongoose.connect(connectString)
            .then(() => {
                console.log('connect success');
            })
            .catch(e => {
                console.log(e.message);
            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;