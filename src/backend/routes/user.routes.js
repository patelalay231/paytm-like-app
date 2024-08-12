const express = require("express");
const {createTokenForUser} = require("../services/auth.service");
const User = require("../models/user.schema");
const Account = require("../models/account.schema");
const { restrictToLoggedinUserOnly, AuthMiddleWare } = require("../middlewares/auth.middleware");
const { signupValidator, updateValidator } = require("../validators/auth.validator");
const { validate } = require("../middlewares/validate-middleware");
const { createHmac,randomBytes } = require('node:crypto');

const router = express();

// Sign In Route
router.post("/signin", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user || !(await User.matchPassword(username,password))) {
            throw new Error("Invalid username or password");
        }

        const token = createTokenForUser(user);
        res.cookie("token", token);
        return res.json({message: "User is logged in",token: token});
    } catch (err) {
        next(err); // Passes error to the global error handler
    }
});

router.post("/signup", validate(signupValidator), async (req, res, next) => {
    const { username, password, firstname, lastname } = req.body;

    try {
        // Creating the user
        const user = await User.create({ username, password, firstname, lastname });

        // Creating an account with a random balance
        await Account.create({ userId: user._id, balance: Math.floor(Math.random() * 10000 + 1) });

        // Send success response
        return res.status(201).json({ message: "User is created" });

    } catch (err) {
        if (err.code === 11000) { // Duplicate key error, likely from a unique constraint in MongoDB
            return res.status(409).json({ error: "User already exists." });
        }

        // Pass the error to the global error handler
        next(err);
    }
});

router.get("/me", AuthMiddleWare, async(req, res) => {
    const user = await User.findById(req.userId);
    return res.send({name:user.username});
});

router.get("/signout", (req, res) => {
    res.clearCookie("token");
    return res.send("User is logged out");
});

router.put("/update", restrictToLoggedinUserOnly, validate(updateValidator), async (req, res, next) => {
    const { password, ...updateFields } = req.body;
    const user = req.user;

    try {
        // If a password is provided, hash it before updating
        if (password) {
            const salt = randomBytes(16).toString("hex");
            const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
            updateFields.password = hashedPassword;
            updateFields.salt = salt;
        }

        // Perform the update
        const newUser = await User.findOneAndUpdate(
            { username: user.username },
            { $set: updateFields },
            { new: true, runValidators: true } // Ensure validators are run
        );

        if (!newUser) {
            throw new Error("User not found."); // Throwing error if user is not found
        }

        // Generate a new token if necessary and send it back
        const token = createTokenForUser(newUser);
        if (!token) {
            throw new Error("Error generating token."); // Throwing error if token generation fails
        }

        res.cookie("token", token);
        return res.send("User is updated");
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
});



//TODO - fetch data of a user by applying filter on firstname and lastname

router.get('/bulk', AuthMiddleWare, async (req, res) => {
    const filter = req.query.filter || "";
    const currentUserId = req.userId; // Assuming AuthMiddleware sets req.userId

    const users = await User.find({
        $and: [
            { _id: { $ne: currentUserId } }, // Exclude current user
            {
                $or: [
                    { firstname: { $regex: filter, $options: 'i' } },
                    { lastname: { $regex: filter, $options: 'i' } }
                ]
            }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
});


module.exports = router;