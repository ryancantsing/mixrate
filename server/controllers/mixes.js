var mongoose = require('mongoose');
var Mix = mongoose.model('Mix');
var Track = mongoose.model('Track');

module.exports = {
    show: function(req, res){
        Mix.find({}).sort('genre').exec((err, mix) => {
            console.log("checkpoint SHOW Mixes controller")
            if(err){
                res.json({message: "Couldn't get your sweet sweet mixes I'm sorry", err})
            }else{
                res.json({ message: "Got 'em", mix})
            }
        })
    },
    view: function(req, res){
        console.log("checkpoint View Mix Controller")
        var mix = Mix.findById({_id: req.params.id}, (err, mix) => {
            console.log(mix)
            if(err){
                res.json({ message: "Error finding mix", err})
            }else {
                res.json({ message: "Found your mix!", mix})
            }
        })
    },
    create: function(req, res){
        console.log("checkpoint create Mix controller")
        var mix = new Mix({
            name: req.body.name,
            mix_creator: req.body.mix_creator,
            mix_genre: req.body.mix_genre,
            mix_tracks: [],
            reviewers: [],
            mix_link: req.body.mix_link,
            likes: 0,
            finished: false
        })
        mix.save((err, mix) => {
            if(err){
                res.json({message: "Dude, things went haywire", err})
            }else{
                res.json({message: "Successfully Added!", mix})
            }
        })
    },
    addReview: function(req, res){
        console.log("checkpoint Add Review controller")
        var mix = Mix.findById({_id: req.params.id})
        mix.update({
            likes : req.body.likes,
        })
        mix.reviewers.push({username: req.body.username, what_you_like: req.body.what_you_like })
        mix.save((err, mix) =>{
        if(err){
            res.json({message: "Review didn't send", err})
        } else {
            res.json({message: "Review added!", mix})
        }
        })
    },
    addTrack: function(req, res){
        console.log("Checkpoint add Track controller")
        var mix = Mix.findById({_id: req.params.id})
        var track = new Track({
            track_number: req.body.track_number,
            track_name: req.body.track_name,
            track_artist: req.body.track_artist
        })
        mix.mix_tracks.push(track)
        mix.save((err, mix) => {
            if(err){
                res.json({ message: "Track not Added!", err})
            } else {
                res.json({ message: "Track Added!", mix})
            }
        })

    },
    delete: function(req, res){
        console.log("checkpoint mix delete controller")
        var mix = Mix.findById({_id: req.params.id})
        mix.remove((err) => {
            if(err){
            res.json({message: "Mix deleted!", err})
        } else {
            res.json({message: "Mix is gone"})
        }
        })
    }
}