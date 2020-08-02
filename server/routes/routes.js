var express = require('express');
var testdbhelper = require('../dbhelper/testdbhelper')
var studentdbhelper = require('../dbhelper/studentdbhelper');
var admin = require('../model/admin');
var score = require('../model/test');
var router = express.Router();

//for admin
router.post('/postdata', (req, res) => {
    var obj = req.body;
    testdbhelper.save(obj, res);
});

router.get('/givedata', (req, res) => {
    testdbhelper.show(res);
});

router.put('/:id', (req, res) => {
    var id = req.params.id;
    var obj = req.body;
    testdbhelper.update(id, obj, res);
});

router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    testdbhelper.delete(id, res);
});

router.post('/register', (req, res) => {
    var obj = req.body;
    studentdbhelper.register(obj, res);
});
router.post('/login', (req, res) => {
    var obj = req.body;
    studentdbhelper.login(obj, res);
})

//admin login
router.post('/adminsignin', (req, res) => {
    var obj = req.body;
    admin.find(obj, (err, docs) => {
        if (err) {
            res.send(err);
        }
        else {
            if (docs && docs.length > 0) {
                res.json({ success: true, msg: 'successfully login'});
            }
            else {
                res.send('Invalid email or password');
            }
        }
    });

});

router.post('/postscore', (req, res) => {
    var obj = req.body;
    var flag = 0;
    score.find({}, (err, docs) => {
        if (err) {
            res.send(err);
        }
        else {
            if (docs && docs.length > 0) {
                for (var i = 0; i < docs.length; i++) {
                    if (obj.score == docs[i].score) {
                        obj.rank = docs[i].rank;
                        flag = 1;
                        break;
                    }
                }
                if (flag == 1) {
                    var scoreobj = new score(obj);
                    scoreobj.save(err => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.json({ rank: obj.rank, msg: "Your Rank is : " });
                        }
                    });
                }
                else if (flag == 0) {
                    var j;
                    docs.sort((a, b) => b.score - a.score);
                    for (var i = 0; i < docs.length; i++) {
                        if (obj.score > docs[i].score) {
                            obj.rank = docs[i].rank - 1;
                            if (obj.rank == 0) {
                                obj.rank = 1;
                            }
                            flag = 2;
                            j = i;
                            break;
                        } else if (obj.score < docs[i].score) {
                            obj.rank = docs[i].rank + 1;
                        }
                    }
                    if (flag == 2) {
                        docs.sort((a, b) => b.score - a.score);
                        for (j; j < docs.length; j++) {
                            score.findByIdAndUpdate(docs[j]._id, {
                                rank: docs[j].rank + 1
                            }, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    }
                    var scoreobj = new score(obj);
                    scoreobj.save(err => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.json({ rank: obj.rank, msg: "Your Rank is : " });
                        }
                    });

                }
            }
        }
    });
});

router.get('/givescore', (req, res) => {
    score.find({}, (err, docs) => {
        if (err) {
            res.send(err);
        }
        if (docs && docs.length > 0) {
            res.json(docs);
        }
    });
})
module.exports = router;