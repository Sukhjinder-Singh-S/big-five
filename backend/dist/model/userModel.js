"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define a schema for the User model
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    pincode: { type: String, required: true },
    question1: { type: Boolean, default: true },
    question2: { type: Boolean, default: true }
}, { timestamps: true });
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
