const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/',async ( _ ,res) => {
  const blogs = await Blog.find({}).populate('user',{username:1,name:1})
  res.json(blogs)
})

blogRouter.post('/',async (req,res) => {
  const body = req.body
  const token = req.token
  
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
    return res.status(401).json({error:'token missing or invalid'})
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title:body.title,
    url:body.url,
    author:body.author,
    likes: body.likes ? body.likes : 0,
    user:user._id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  res.status(201).json(result)
})

blogRouter.delete('/:id',async (req,res)=>{
  const id = req.params.id
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if(!token || !decodedToken.id){
    return res.status(401).json({error:'token missing or invalid'})
  }
  const blog = await Blog.findById(id)
  
  if(blog && blog.user.toString() === decodedToken.id){
    await Blog.findByIdAndRemove(id)
    return res.status(204).end()
  }
  res.status(403).json({error:'current user is not authorized or current blog is not found'})
})

blogRouter.put('/:id',async (req,res)=>{
  const blog = req.body
  const updateBlog = await Blog.findByIdAndUpdate(req.params.id,blog,{new:true})
  res.status(200).json(updateBlog)
})

module.exports = blogRouter