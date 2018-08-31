'use strict';

class BaseCrudRepository {

    constructor(model) {
        this._model = model;
    }

    async FindAll(condition={}, limit = null, skip = null, populate = null, sort = null) {

        condition.removed = false;

        let myModel = db[this._model];

        let query = myModel.find(condition);
        if ( limit )
            query.limit(+limit);
        if ( skip )
            query.skip(+skip);
        if ( populate )
            query.populate(populate);
        if( sort )
            query.sort(sort);

        return await query.exec();
    }

    async Count(condition = {}) {
        condition.removed = false;

        let myModel = db[this._model];

        return await myModel.count(condition).exec()
    }

    async Find(condition = {}, populate = null) {
        condition.removed = false;

        let myModel = db[this._model];

        let query = myModel.findOne(condition);

        if (populate) {
            query.populate(populate);
        }

        return await query.exec();
    }

    async Create(record) {
        let myModel = new db[this._model](record);

        return await myModel.save();
    }

    async Remove(id) {
        let myModel = db[this._model];

        return await myModel.update({_id: id}, {$set: {removed: true}});
    }

    async Erase(id) {
        let myModel = db[this._model];

        return await myModel.remove({_id: id});
    }

    async Update(id, record) {
        let myModel = db[this._model];

        return await myModel.update({removed: false, _id: id}, {$set: record});
    }

    async EmptyRecord() {
        let myModel = db[this._model];
        return new myModel();
    }
}

module.exports = BaseCrudRepository;
