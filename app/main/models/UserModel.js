const bcrypt = require('bcrypt-nodejs'),
      BaseModel = require('../../core/base/BaseModel');

class UserModel extends BaseModel{
    constructor(mongoose) {
        super(mongoose, 'User');
    }

    Initialize() {
        let userSchema = new this.Schema({
            username: {type: String, required: true, unique: true},
            password: {type: String, required: true}
        });

        userSchema.methods.validPassword = function (password, next) {
            bcrypt.compare(password, this.password, function (err, valid) {
                if (err) return next(err);
                next(null, valid)
            })
        };

        return this.mongoose.model(this.name, userSchema);
    }
}

module.exports = UserModel;
