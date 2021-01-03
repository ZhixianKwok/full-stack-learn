import React,{ useState } from 'react'
import './Blog.css'

const Blog = ({ blog , updateBlog, deleteBlog }) => {

  const [view, setView] = useState(false)

  const handleOnClick = () => {
    const copyBlog = { ...blog }
    copyBlog.likes = blog.likes + 1
    updateBlog(copyBlog)
  }

  return (<div className='blog'>
    {blog.title} - {blog.author} <input type="button" value={view?'hide':'view'} onClick={() => {setView(!view)}}/>
    {view && <div>
      <p>url:{blog.url}</p>
      <p>likes:{blog.likes}<input type="button" value="like" onClick={handleOnClick}/></p>
      <p>author:{blog.author}</p>
      <input type="button" value="remove" onClick={() => {deleteBlog(blog)}}/>
    </div> }
  </div>)
}

export default Blog
