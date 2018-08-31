global.conection = false;

const mongoose = require('mongoose'),
      Bluebird = require('bluebird'),
      Models = require('../../db/Models');

class Db{

    constructor(){

    }

    static Initialize(){

        return new Promise((resolve, reject) =>{
            let mongooseDb = mongoose.connection;
            mongoose.Promise = Bluebird;

            mongooseDb.on('connecting', function () {

            });

            mongooseDb.on('error', (error) => {
                global.conection = false;
                mongoose.disconnect();
                reject(error);
            });

            mongooseDb.on('connected', () => {
                console.log('MongoDB Connected');
                global.conection = true;
                resolve(true);
            });

            mongooseDb.once('open', () => {

            });

            mongooseDb.on('reconnected', () => {
                resolve(true);
            });

            mongooseDb.on('disconnected', () => {
                mongoose.connect(config.mongoUrl);
                reject("Disconected");
            });

            mongoose.connect(config.mongoUrl);

            global.db = new Models(mongoose).Load();

        });
    }
}

module.exports = Db;
