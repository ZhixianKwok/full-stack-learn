const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = require('../app')
const { initialBlogs, isContainIdAttibute,userInDb } = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

//#region  /api/blog/
beforeEach(async () => {
  await Blog.deleteMany({})
  
  const promiseAllBlogs = initialBlogs.map( item=> {
    const blogNew = new Blog(item)
    return blogNew.save()
  })

  await Promise.all(promiseAllBlogs)
})

describe('when there is initially some blogs saved',()=>{
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
  })
  
  test('all blogs are returned',async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(initialBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const res = await api.get('/api/blogs')
    const contents = res.body.map(item => item.title)
    expect(contents).toContain('TDD harms architecture')
  })
})

describe('viewing a specific blog',()=>{
  test('the unique identifier attribute of a blog post is named ID', async () =>{
    const res = await api.get('/api/blogs')
    expect(isContainIdAttibute(res.body)).toBeDefined()
  })
  test('when a blog does not have a likes attribute, set likes equal zero',async () => {
    const newBlog =  {
      title: 'React patterns',
      author: 'test user',
      url: 'https://reactpatterns.com/',
    }
    await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(initialBlogs.length + 1)
    const blog = res.body.find(item=>item.author === 'test user')
    expect(blog.likes).toBe(0)
  })
})

describe('addition of a new blog', () => {
  test('new blog can be added', async () =>{
    const newBlog =  {
      title: 'React patterns',
      author: 'test user',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }
    await api.post('/api/blogs').send(newBlog)
      .setHeader('authorization','')
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(initialBlogs.length + 1)
  
    const authors = res.body.map(n => n.author)
    expect(authors).toContain('test user')
  })

  test('new blog no token with header', async () =>{
    const newBlog =  {
      title: 'React patterns',
      author: 'test user',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }
    await api.post('/api/blogs').send(newBlog)
      .expect(401)
  })

  test('when a blog does not have a url and title attribute, returned 400 bad request',async () => {
    const newBlog =  {
      title: 'React patterns',
      author: 'test user',
    }
    await api.post('/api/blogs').send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog',()=>{
  test('a blog can be delete',async () => {
    const res = await api.get('/api/blogs')
    const blogs = res.body
    await api.delete(`/api/blogs/${blogs[0].id}`).expect(204)
  })
})

describe('updation of a blog',()=>{
  test('updation of a blog',async ()=>{
    const res = await api.get('/api/blogs')
    const blogs = res.body
    const copyBlog = blogs[0]
    copyBlog.url='this is a test blog for updation of a blog'
    const result = await api.put(`/api/blogs/${copyBlog.id}`).send(copyBlog)
    expect(result.body).toEqual(copyBlog)
  })
})
//#endregion

//#region  /api/user/

describe('when there is initially one user in db', ()=>{
  beforeEach(async ()=>{
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret',10)
    const user = new User({ username: 'root', password: passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async ()=>{
    const usersAtStart = await userInDb()
    
    const newUser = {
      username: 'mluukkai',
      name:'Matti luukkainen',
      password: 'salainen'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

    const usernames = usersAtEnd.map(u=>u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(()=>{
  mongoose.connection.close()
})
