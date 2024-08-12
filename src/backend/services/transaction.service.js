const Account = require("../models/account.schema");

const transferFund = async(from, to, amount) => {
    const session = await Account.startSession();
    session.startTransaction();
    try{
        const sender = await Account.findOne({userId: from}).session(session);
        if(sender.balance < amount){
            throw new Error("Insufficient balance");
        }
        if(from === to){
            throw new Error("Cannot transfer to same account");
        }
        if(amount < 0){
            throw new Error("Amount should be positive");
        }
        await Account.updateOne({userId: from}, {$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = {transferFund};