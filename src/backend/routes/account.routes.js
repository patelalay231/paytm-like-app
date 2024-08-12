const express = require('express');
const router = express.Router(); // Use Router() for better practice
const { AuthMiddleWare } = require("../middlewares/auth.middleware");
const Account = require("../models/account.schema");
const { transferFund } = require("../services/transaction.service");

// Get Balance Route
router.get("/balance", AuthMiddleWare, async (req, res, next) => {
    try {
        if(!req.userId) throw new Error("Please login to view your balance");
        const account = await Account.findOne({ userId: req.userId }); // Use findOne for a single result
        if (!account) {
            const error = new Error("Account not found.");
            error.statusCode = 404;
            throw error; // Handle missing account
        }

        return res.status(200).send({ balance: account.balance });
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
});

// Transfer Funds Route
router.post("/transfer", AuthMiddleWare,async (req, res, next) => {
    const senderId = req.userId;
    const receiverId = req.body.receiverId;
    const amount = Number(req.body.amount);
        console.log(senderId, receiverId, amount);
    try {
        if (isNaN(amount) || amount <= 0) {
            const error = new Error("Invalid transfer amount.");
            error.statusCode = 400;
            throw error; // Validate amount
        }

        if(receiverId === senderId) {
            throw new Error("Sender and receiver cannot be the same");
        }
        const receiver = await Account.findOne({ userId: receiverId }); // Check if receiver account exists
        if(!receiver) {
            throw new Error("Receiver account not found");
        }
        await transferFund(senderId, receiverId, amount);

        return res.status(200).send({message:"Transfer successful"});
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
});

module.exports = router;
