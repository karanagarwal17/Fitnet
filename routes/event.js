const router = require('express').Router();

const Event = require('../models/Event');
const verify = require('../controllers/verify');

router.route('/')
    .get(function(req, res, next){
        Event.find({}, function(err, events){
            if(err){
                console.log(err);
                return res.status(501).json({ error: err });
            }
            res.status(200).json({ events: events });
        });
    })
    .post(verify.verifyUser, function(req, res, next){
        Event.create(req.body, function(err, event){
            if(err){
                console.log(err);
                return res.status(501).json({ error: err });
            }
            event.players.push(req.userId);
            event.save(function(err, event){
                if(err){
                    console.log(err);
                    return res.status(501).json({ error: err });
                }
                res.status(200).json({ success: true });
            });
        });
    });

router.route('/search')
    .post(function(req, res, next){
        Event.find({ $text: { $search : req.body.query }},{ score: {$meta: 'textScore'}})
        .limit(20)
        .sort({score: {$meta: 'textScore'}})
        .populate('players')
        .exec(function(err, events){
            if(err){
                console.log(err);
                return res.status(501).json({ error: err });
            }
            res.status(200).json({ events: events });
        });
    });

router.route('/apply/:id')
    .post(verify.verifyUser, function(req, res, next){
        Event.findOne({_id: req.params.id}, function(err, event){
            if(err){
                console.log(err);
                return res.status(501).json({ error: err });
            }
            if(!event){
                return res.status(404).json({ error: 'Event not found!' });
            }
            console.log(event);
            event.players.push(req.userId);
            event.save(function(err, event){
                if(err){
                    console.log(err);
                    return res.status(501).json({ error: err });
                }
                res.status(200).json({ success: true });
            });
        })
    });

module.exports = router;