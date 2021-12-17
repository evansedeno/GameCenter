const mongoose = require("mongoose");

const personnage = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    theme: Number,
    description: String
});

const schema = new mongoose.Schema({
    prenom: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    personnage: personnage
});

module.exports = mongoose.model("User", schema);