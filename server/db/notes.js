const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    input: String,
    id : String
});

module.exports = mongoose.model("data", dataSchema);