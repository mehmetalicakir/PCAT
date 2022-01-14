const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect DB
const uri = "mongodb+srv://<DATABASE INFORMATION REMOVED>";
mongoose.connect(uri);

//create schema
const PhotoSchema = new Schema({
    title:String,
    description:String
})

//create model
const Photo = mongoose.model('Photo', PhotoSchema);

//create a photo
/*Photo.create({
    title:"Photo Title 25",
    description: "Photo Description 25"
});*/

//read a photo
/*Photo.find({}, (err,data) => {
    console.log(data);
});*/

//update photo
const id = "<REMOVED>";
/*Photo.findByIdAndUpdate(
    id, {
        title: "Photo 3 Title new updated",
        description: "Photo 3 Description new updated"
    },
    {
        new : true
    },
    (err,data) => {
        console.log(data);
    }
);*/

//delete a photo
Photo.findByIdAndDelete(id, (err,data) => {
    console.log('Photo is deleted.');
})