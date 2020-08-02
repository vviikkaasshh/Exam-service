var student = require('../model/student');
var passwordHash = require('password-hash');

const studentdbhelper = {}

studentdbhelper.register = async (obj, res) => {
    student.find({ email: obj.email }, (err, docs) => {
        if (err) {
            res.send(err);
        }
        else {
            if (docs && docs.length > 0) {
                res.send('User already Exist');
            }
            else {
                obj.password = passwordHash.generate(obj.password);
                var user = new student(obj);
                user.save((err) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json({ success: true, msg: 'successfully register', email: obj.email });
                    }

                });
            }
        }
    });

}

studentdbhelper.login = async (obj, res) => {
    student.find({ email: obj.email }, (err, docs) => {
        if (err) {
            res.send(err);
        }
        else {
            if (docs && docs.length > 0) {
                var result = passwordHash.verify(obj.password, docs[0].password);
                if (result) {
                    res.json({ success: true, msg: 'successfully login', email: docs[0].email });
                }
                else {
                    res.send('Invalid username or Password');
                }
            }
            else {
                res.send('Invalid username or Password');
            }
        }
    });
}

module.exports = studentdbhelper