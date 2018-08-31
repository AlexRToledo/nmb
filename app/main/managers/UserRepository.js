const bcrypt = require('bcrypt-nodejs'),
    BaseCrudRepository = require('../../core/base/BaseCrudRepository');

class UserRepository extends BaseCrudRepository {
    constructor(){
        super('Users');
    }

    async Create(record){
        record.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

        let user = await super.Create(record);

        return user;
    }
}

module.exports = UserRepository;