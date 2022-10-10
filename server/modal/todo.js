const mongoose = require ("mongoose");
const Scheme = mongoose.Schema;
const TodoSchema = new Scheme({
    text:{
        type:String,
        required:true
    },
    status:{
        type:String,
    }
    
},
// { typeKey: '$type' }

);
module.exports = mongoose.model("Todo",TodoSchema);