const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    minlength:3,
    unique:true
  },
  name:String,
  passwordHash:{
    type:String,
    minlength:3
  },
  blogs:[
    {  
      type:mongoose.Schema.Types.ObjectId,
      ref:'Blog'
    }
  ]
})

userSchema.set('toJSON',{
  transform:function(document,returnedObject){
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User',userSchema)

module.exports = User