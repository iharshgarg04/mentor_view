const mongoose = require('mongoose');

const paramterSchema = new mongoose.Schema({
    name:String,
})


const Parameter = mongoose.model("Parameter",paramterSchema);
module.exports = Parameter;