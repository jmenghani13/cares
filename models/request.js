const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
  user:{
    type: Object,
    ref:'User'
  },
  type:{
    type:String,
    required:true
  },
  items:[{
    name:{type:String,required:true},
    quantity:{ type: Number, default:1},
    unit:{type:String,required:true}
  }],
  received:[{
    user:{type:Object,ref:'User'},
    items:[{
      name:{type:String,required:true},
      quantity:{ type: Number, default:1},
      unit:{type:String,required:true}
    }]
  }]
});

module.exports = mongoose.model('Request',RequestSchema);
