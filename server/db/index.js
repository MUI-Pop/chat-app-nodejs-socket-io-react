'use strict';
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require("path");

let instance = null;

class DB {

  constructor(userName, password, dbHost, dbPort, dbName) {
    this.Sequelize = Sequelize;
    this.userName = userName;
    this.password = password;
    this.dbHost = dbHost;
    this.dbPort = dbPort;
    this.dbName = dbName;
  }

  setConnection() {
    this.connection = new this.Sequelize(this.dbName, this.userName, this.password, {
      host: this.dbHost,
      port: this.dbPort,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });
  }

  async verifyConnection() {
    try {
      await this.connection.authenticate();
      console.log('Connection established successfully');
    } catch (e) {
      console.error('Error establishing connection to the Database', e);
    }
  }

  async sync() {
    try {
      await this.connection.sync({ force: false });
      console.log('Successfully Synced with DB');
    } catch (e) {
      console.error('Error in sync', e);
    }
  }

  loadModels() {
    let that = this;
    let Models = {};

    fs
      .readdirSync(__dirname + '/models')
      .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
      })
      .forEach(function (file) {
        let model = that.connection.import(path.join(__dirname + '/models/', file));
        Models[file.split('.')[0]] = model;
      });

    Object.keys(Models).forEach(function (modelName) {
      if ("associate" in Models[modelName]) {
        Models[modelName].associate(Models);
      }
    });

    module.exports.Models = Models;
  }

  async init() {
    this.setConnection();
    await this.verifyConnection();
    try {
      this.loadModels();
      console.log('Models Loaded');
    } catch (e) {
      console.error('Error initializing DB', e);
    }
    await this.sync({ force: true });
  }
}

function provideInstance(userName, password, dbHost, dbPort, dbName) {
  if (!instance) {
    console.log('Initiating a DB Instance');
    instance = new DB(userName, password, dbHost, dbPort, dbName);
    return instance;
  } else {
    console.log('Providing an existing instance');
    return instance;
  }
}

module.exports = provideInstance;