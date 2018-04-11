'use strict';
const models = require('../db');
const config = require('../config');
const db = models(config.database.username, config.database.password, config.database.host, config.database.port, config.database.dbname);

class Registry{

    constructor(){
        this.map = new Map();        
    }

    add(service, model){

    }

    remove(){

    }

    get(){

    }
}