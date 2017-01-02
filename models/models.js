// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
// define the schema for our user model
var postSchema = new mongoose.Schema({

        title        : String,
        author       : String,
        type         : String,
        date         : String,
        body         : String,
        url          : String,
        img          : String,
        comments     : [commentSchema]
});
var Post = mongoose.model('Post', postSchema)
//
var homeSchema = new mongoose.Schema({

        title        : String,
        date         : String,
        body         : String,
        img          : String
});
var Home = mongoose.model('Home', homeSchema)
//
var aboutSchema = new mongoose.Schema({

        title        : String,
        date         : String,
        body         : String
    });
var About = mongoose.model('About', aboutSchema)
//
var showcaseSchema = new mongoose.Schema({

        title        : String,
        body         : String,
        date         : String,
        img          : String
});
var Showcase = mongoose.model('Showcase', showcaseSchema)
//
var commentSchema = new Schema({
                author           : String,
        date         : String,
        body             : String,
        visible      : Boolean
        })
var Comment = mongoose.model('Comment', commentSchema)

// create the model for users and expose it to our app
module.exports = {
    Post: Post,
    Comment: Comment,
    Home: Home,
    Showcase: Showcase,
    About: About    
};
