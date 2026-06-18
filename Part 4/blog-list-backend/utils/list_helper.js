const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog=(blogs) => {
  if (blogs.length===0) return null
  return blogs.reduce((prev, current)=>{
    return (prev.likes > current.likes) ? prev : current
  })
}
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authorCounts = _.countBy(blogs, 'author')
  const authors = Object.keys(authorCounts).map(author => ({
    author: author,
    blogs: authorCounts[author]
  }))
  return _.maxBy(authors, 'blogs')
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const grouped = _.groupBy(blogs, 'author')
  const authorLikes = Object.keys(grouped).map(author => {
    return {
      author: author,
      likes: _.sumBy(grouped[author], 'likes')
    }
  })
  return _.maxBy(authorLikes, 'likes')
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}