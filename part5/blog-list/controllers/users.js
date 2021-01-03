const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/',async ( req , res )=>{
  const body = req.body
  const saltRounds = 10
  
  if( body.password.length < 3) {
    return res.status(400).json({error:'password must be at least 3 characters'})
  }
  const passwordHash = await bcrypt.hash(body.password,saltRounds)
  
  const user = new User({
    username:body.username,
    name:body.name,
    passwordHash
  })
  
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

userRouter.get('/', async ( _ , res) => {
  const users = await User.find({}).populate('blogs',{ title:1 , url: 1})
  res.status(200).json(users)
})

module.exports = userRouter