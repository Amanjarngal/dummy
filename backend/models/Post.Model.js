const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    imageUrl:{type:String, required:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    like:[
        {
            userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        }],
    comment:[
        {
            userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            cmt:{type:String}
        }
    ]
},
{
    timestamps:true
});

module.exports = mongoose.model('Post',postSchema)