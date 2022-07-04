const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name :{
        type: String
    },
    comment:{
        type: String
    },
    star:{
        type:String
    }

});

const Review = mongoose.model("reviews",reviewSchema);


module.exports = Review;