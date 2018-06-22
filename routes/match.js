const router = require('express').Router();

const Match = require('../models/Match');

router.route('/')
    .get(function(req, res, next){
        Match.find({}, function(err, matches){
            if(err){
                console.log(err);
                return res.status(501).json({ error: err });
            }
            res.status(200).json({ events: events });
        });
    })
    .post(function(req, res, next){
        Match.create(req.body, function(err, match){
            if(err){
                console.log(err);
                return res.status(501).json({ error: err });
            }
            res.status(200).json({ success: true });
        });
    });

module.exports = router;