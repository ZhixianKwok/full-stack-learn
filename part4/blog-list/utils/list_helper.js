const dummy = (blogs) => {
  return !blogs.length && 1
}

const totalLikes = (blogs) =>{
  return blogs.reduce((prev, cur) => prev + cur.likes,0)
}

module.exports = {
  dummy,
  totalLikes
}