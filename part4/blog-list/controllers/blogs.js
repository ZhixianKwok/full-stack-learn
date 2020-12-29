const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/',async (req,res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/',async (req,res, next) => {
  const body = req.body
  
  const user = await User.findById(body.userId)
  
  if(!body.title || !body.url){
    next({name:'ValidationError',message:'title or url is required'})
  }

  if(user){
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
  } else {
    res.status(403).end()
  }
})

blogRouter.delete('/:id',async (req,res)=>{
  const id = req.params.id
  await Blog.findByIdAndRemove(id)
  res.status(204).end()
})

blogRouter.put('/:id',async (req,res)=>{
  const blog = req.body 
  const updateBlog = await Blog.findByIdAndUpdate(req.params.id,blog,{new:true})
  res.status(200).json(updateBlog)
})

module.exports = blogRouter