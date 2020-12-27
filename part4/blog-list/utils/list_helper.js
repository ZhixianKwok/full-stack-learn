const {countBy ,forIn , sortBy } = require('lodash')

const dummy = (blogs) => {
  return !blogs.length && 1
}

const totalLikes = (blogs) =>{
  return blogs.reduce((prev, cur) => prev + cur.likes,0)
}

const favoriteLikes = (blogs) =>{
  const sortBlogs = blogs.sort((a,b)=> b.likes - a.likes)
  if(sortBlogs.length){
    return sortBlogs[0]
  }
  return null
}

const mostBlogs = (blogs) => {
  let result = []
  if(!blogs.length){
    return {}
  }
  const countByBlogs = countBy(blogs,'author')
  forIn(countByBlogs,(value,key) =>{
    result.push({ 'author': key, 'blogs': value })
  })
  
  result = sortBy(result,'blogs')
  return result[result.length-1]
}

// const mostLikes = (blogs) =>{
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteLikes,
  mostBlogs
}