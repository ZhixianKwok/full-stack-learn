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

const mostLikes = (blogs) =>{
  let results = {},maxlikes=0,result = {}
  if(!blogs.length){
    return {}
  }
  for (let i = 0; i < blogs.length; i++){
    results[blogs[i].author] = results[blogs[i].author] ? results[blogs[i].author] + blogs[i].likes : blogs[i].likes
  }
  for (const key in results) {
    if(results[key] >= maxlikes){
      maxlikes = results[key]
      result = {
        author:key,
        likes:maxlikes
      }
    }
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteLikes,
  mostBlogs,
  mostLikes
}