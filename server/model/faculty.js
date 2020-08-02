const mongoose = require('mongoose');

// .. 1. add 
// .. 2. update phoneno
// .. 3. update mobile no
// .. 4. update password
// .. 5. update teacherClassNames
// .. 5. update teacherExpertSubjet
// .. 6. update roleId

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    teacherClassNames: [],
    teacherExpertSubjet: [],
    roles: [],
    token:{
        type:String
    },
    active:{
        type:Boolean,
        default:false
    },
    createdDate:{
        type:Date,
        default: new Date()
    }

});

module.exports = mongoose.model('user', user);