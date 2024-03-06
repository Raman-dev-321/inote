const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },

});
const user = mongoose.model('User', UserSchema);
user.createIndexes()
module.exports = user;


// you can also add validation in model.user like here
// password: {
//       type: String,
//       validate(value) {
//         if (!value.match(/\d/) || !value.match(/[a-zA-Z]/) ) {
//           throw new Error(
//             "Password must contain at least one letter and one number"
//           );
//         }
//         else if(value.length < 8) {
//           throw new Error (
//             "Minimum length is 8 characters"
//           );
//         }
//       },
//     }