const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    member_id: {
        type: String,
        required: true,
    },
    type_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    groupstd: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Member", memberSchema);
