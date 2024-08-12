const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    balance: {
        type: Number,
        default: 0,
    },
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;