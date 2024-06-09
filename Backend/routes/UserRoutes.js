const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userController = require("../repositories/repository.user.js");

/**
 * Route for user login.
 * Validates the request body fields 'username' and 'password'.
 * Returns errors if validation fails.
 * If validation passes, proceeds to userController.login.
 */
router.post(
    "/login",
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    userController.login
);

/**
 * Route for user signup.
 * Validates the request body fields 'username', 'nickname', and 'password'.
 * Returns errors if validation fails.
 * If validation passes, proceeds to userController.signup.
 */
router.post(
    "/signup",
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('nickname').notEmpty().withMessage('Nickname is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    userController.signup
);

// Route to get user nickname
router.post("/nickname", userController.getNick);

// Route to get user points
router.post("/point", userController.getPoint);

// Route to increment user level
router.post("/levUp", userController.incrementLevel);

// Route to get user profile
router.post("/profile", userController.profile);

// Route to update user points
router.post("/updatePoint", userController.updatePoint);

// Route to get user level
router.post("/getLevel", userController.getLevel);

module.exports = router;