const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
    ,
    expenses:[
        {
            text:{
                type: String,
                required:true
            },
            amount:{
                type:Number,
                required :true
            },
            createdAt:{
                type: Date,
                default:Date.now()
            }
        }
    ]
}, {
    timestamps: true
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
