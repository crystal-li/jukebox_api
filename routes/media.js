var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Media = require('../models/Media.js');

/* GET /media */
/* Gets all songs in queue */
router.get('/', function(req, res, next) {
    Media.find(function (err, media) {
        if (err) return next(err);
        res.json(media);
    });
});

/* GET /media/next */
/* Retrieve next song */
router.get('/next', function(req, res, next) {
    var next_song = Media.findOne().sort({created: 1}).exec(function(err, next_song) {
        if (err) return next(err);
        console.log(next_song);
        res.json(next_song);
    });
});

/* POST /media */
/* Adds a song to the queue */
router.post('/', function(req, res, next) {
    /* Make sure POST request has the right parameters */
    if (req.body.title == undefined 
    ||  req.body.videoId == undefined   
    ||  req.body.type   == undefined) {
        res.status(404);
        res.type('txt').send("POST request does not have the required parameters\n");
    }
    else {
        Media.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        }); 
    };
});

/* DELETE /media */
/* Deletes all songs */
router.delete('/', function(req, res, next) {
    Media.remove({}, function (err) {
        if (err) return next(err);
        res.send("Removed all Media objects :O\n");
    });
});

//TODO: This should be a delete request - was too lazy to figure out how to do that.
router.get('/pop', function(req, res, next) {
    var next_song = Media.findOne().sort({created: 1}).exec(function(err, next_song) {
        if (err) return next(err);
        if (next_song != null) {
            next_song.remove();
            res.type('txt').send("Popped a song off the queue.");
        }
        else {
            res.type('txt').send("Tried to pop but the queue is empty!");   
        }
    });
});

module.exports = router;
