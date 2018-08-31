const UserModel = require('../main/models/UserModel');

class Models {
    constructor(mongoose) {
        this.mongoose = mongoose;
    }

    Load() {
        return {
            mongoose: this.mongoose,
            Users: new UserModel(this.mongoose)           
        }
    }
}

module.exports = Models;
