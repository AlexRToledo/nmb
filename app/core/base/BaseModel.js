class BaseModel {
    constructor(mongoose, name) {
        this.mongoose = mongoose;
        this.Schema = mongoose.Schema;
        this.name = name;
        return this.Initialize();
    }

    Initialize() {

    }
}

module.exports = BaseModel;
