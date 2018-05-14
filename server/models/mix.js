var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var MixSchema = new mongoose.Schema({
    mix_name: {
        type: String,
        required: [true, "This should be chosen for you already"],
    },
    mix_creator: {
        type: String,
        required: [true, "This also should have been chosen for you already"]
    },
    mix_description: {
        type: String,
        required: [true, "Please describe your mix"],
    },
    mix_genre: {
        type: String,
        required: [true, "Please choose a genre from the list"]
    },
    mix_tracks: [],
    reviewers: [ {username: {
        type: String,
        required: true,
    }, what_you_like: {
        type: String,
        required: true
    }}],
    mix_link: {
        type: String
    },
    likes: {
        type: Number
    },
    finished: {
        type: Boolean
    }
})
var TrackSchema = new mongoose.Schema({
    track_number: {
        type: Number
    },
    track_name: {
    type: String,
    required: [true, "The track needs a name"],
    },
    track_artist: {
        type:String,
        required: [true, "Big or small artist, they need to be named"]
    }
})
mongoose.model('Track', TrackSchema)
mongoose.model('Mix', MixSchema)
var Mix = mongoose.model('Mix');
var Track = mongoose.model('Track');
