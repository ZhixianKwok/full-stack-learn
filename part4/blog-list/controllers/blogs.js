const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('',async (req,res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('',async (req,res, next) => {
  const body = req.body
  
  if(!body.title || !body.url){
    next({name:'ValidationError',message:'title or url is required'})
    return
  }
  const blog = new Blog({
    ...body,
    likes: body.likes ? body.likes : 0 
  })
  const result = await blog.save()
  res.status(201).json(result)
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