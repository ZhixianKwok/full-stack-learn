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

module.exports = {
  dummy,
  totalLikes,
  favoriteLikes
}