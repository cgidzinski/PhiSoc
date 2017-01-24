// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// define the schema for our user model
var postSchema = new mongoose.Schema({
    title: String,
    author: String,
    type: String,
    date: {type: Date, default: Date.now},
    body: String,
    url: String,
    img: String,
    comments: [commentSchema]
});
var Post = mongoose.model('Post', postSchema)
    //
var homeSchema = new mongoose.Schema({
    title: String,
    body: String,
    img: String
});
var Home = mongoose.model('Home', homeSchema)
    //
var aboutSchema = new mongoose.Schema({
    body: String
});
var About = mongoose.model('About', aboutSchema)
    //
var showcaseSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: {type: Date, default: Date.now},
    img: String
});
var Showcase = mongoose.model('Showcase', showcaseSchema)
    //
var positionSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: {type: Date, default: Date.now},
});
var Position = mongoose.model('Position', positionSchema)
    //
var commentSchema = new Schema({
    author: String,
    date: {type: Date, default: Date.now},
    body: String,
    visible: Boolean
})
var Comment = mongoose.model('Comment', commentSchema)
    // create the model for users and expose it to our app
module.exports = {
    Post: Post,
    Comment: Comment,
    Home: Home,
    Showcase: Showcase,
    Position: Position,
    About: About
};
