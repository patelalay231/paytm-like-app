const mongoose = require('mongoose');

const { createHmac,randomBytes } = require('node:crypto');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    salt:{
        type:String,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
},{timestamps : true})

// this is a pre hook which will run before the save method
userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");
    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("matchPassword", async function(username, password) {
    try {
        const user = await this.findOne({ username });

        if (!user) {
            const error = new Error("User Not Found");
            error.statusCode = 404;
            throw error;
        }

        const salt = user.salt;
        const hashedPassword = user.password;
        const userProvidedHash = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        if (hashedPassword !== userProvidedHash) {
            const error = new Error("Password is not matched");
            error.statusCode = 401;
            throw error;
        }

        return user;
    } catch (err) {
        // Re-throw the error to be caught by global error handler
        throw err;
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User