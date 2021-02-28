import React, { useState, useEffect,Fragment } from 'react'
import {useDispatch} from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import {createMessage} from './reducers/notificReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [isLogin,setIsLogin] = useState(false)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [ user , setUser] = useState(null)


  const updateBlog = (newBlog) => {
    blogService.updateBlog(newBlog).then((data) => {
      const index = blogs.findIndex(item => item.id === data.id)
      const newBlogs = JSON.parse(JSON.stringify(blogs)) //simply copy
      newBlogs.splice(index,1,data)
      setBlogs(newBlogs)
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setUsername(user.username)
      setIsLogin(true)
      blogService.setToken(user.token)
    }
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    if(!username || !password){
      alert('The user name or password entered is empty!')
    } else {
      try{
        const res = await loginService.loginIn({ username, password })
        const user = res.data
        window.localStorage.setItem('blogAppUser',JSON.stringify(user))
        setUsername(user.username)
        setIsLogin(true)
        setUser(user)
      } catch(err){
        changeMessage({ type:'error',content:'Incorrect user name or password entered!' })
      }
    }
  }

  const changeMessage = (message) => {
    dispatch(createMessage(message))
    if(message){
      setTimeout(() => {
        dispatch(createMessage(null))
      },2000)
    }
  }

  const handleOnClick = async () => {
    window.localStorage.clear()
    setUser(null)
    setIsLogin(false)
  }

  const handleOnCreate = async (newBlog) => {
    try{
      const blog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(blog))
      changeMessage({ type:'info',content:`a new blog ${blog.title} by ${blog.author}` })
    } catch (err) {
      changeMessage({ type:'error',content:err.message })
    }
  }

  const handleOnChange = (e) => {
    const value = e.target.attributes['data-input'].value
    if(value ==='name'){
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  const deleteBlog = (blog) => {
    if(window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)){
      blogService.deleteBlog(blog.id).then(() => {
        alert('delete success!')
        const index = blogs.findIndex(item => item.id === blog.id)
        const newBlogs = JSON.parse(JSON.stringify(blogs)) //simply copy
        newBlogs.splice(index,1)
        setBlogs(newBlogs)
      })
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  
  let blogComponent = null
  if(!isLogin){
    blogComponent =  <Togglable buttonLabel="Login">
    <LoginForm username={username} password={password} handleOnSubmit={handleOnSubmit} handleOnChange={handleOnChange}/>
    </Togglable>
  } else {
    const renderBlogs = blogs.sort((a, b) => b.likes - a.likes)
    blogComponent = <Fragment>
       <h3>
        {`${username} logged in`}
        <input type="button" onClick={handleOnClick} value="logout"/>
      </h3>
      <Togglable buttonLabel="create new blog">
        <CreateBlog handleOnCreate={handleOnCreate}/>
      </Togglable>
      <br/>
      {renderBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      )}
    </Fragment>
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Message />
      {blogComponent}
    </div>
  )
}

export default App