'use strict';
const mongoose = require('mongoose'),
    mongooseServer = require('../config/mongoose');

exports.initApp = async () => {
    await mongooseServer.connect()
    mongooseServer.loadModels()
}

exports.initModel = (model, data, option) => {
    const Model = mongoose.model(model);
    let insertData = () => {
        if (data instanceof Array) {
            if (model !== 'admin' && model !== 'user' && model !== 'staff') {
                return Model.insertMany(data);
            } else {
                return Promise.all(data.map((itemInfo => {
                    let item = new Model(itemInfo);
                    return item.save();
                })));
            }
        } else {
            let data = new Model(data);
            return data.save();
        }
    }
    if (option && option.drop) {
        return Model.deleteMany()
            .then(insertData);
    } else {
        return insertData();
    }
};