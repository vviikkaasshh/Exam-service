const testClass = require('../model/test');

const testDbHelper = {};

testDbHelper.save = async (obj, res) => {
    var obj = new testClass(obj);
    obj.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send('Successfully saved');
        }
    })
}

testDbHelper.show = async (res) => {
    testClass.find({}, (err, docs) => {
        if (err) {
            res.send('error');
        }
        else {
            if (docs && docs.length > 0) {
                res.json(docs);
            }
        }
    })
}

testDbHelper.update = async (id, obj, res) => {
    testClass.findByIdAndUpdate(id, {
        quesno: obj.quesno,
        question: obj.question,
        options: [{ answer: obj.options[0].answer },
        { answer: obj.options[1].answer },
        { answer: obj.options[2].answer },
        { answer: obj.options[3].answer }
        ],
        selected: obj.selected,
        correct: obj.correct
    }, (err) => {
        if (err) {
            res.send("err");
        }
        else {
            res.send('updated');
        }
    }
    )
}

testDbHelper.delete = async (id, res) => {
    testClass.findByIdAndRemove(id, (err) => {
        if (err) {
            res.send('error');
        }
        else {
            res.send("deleted");
        }
    });
}

module.exports = testDbHelper;