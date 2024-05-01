var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentBlog) => {
    return accumulator + (currentBlog.likes || 0)
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  const blogWithMaxLikes = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog), blogs[0])

  return {
    title: blogWithMaxLikes.title,
    author: blogWithMaxLikes.author,
    likes: blogWithMaxLikes.likes
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return {}
  
  const groupedBlogs = _.groupBy(blogs, 'author')
  const topAuthor = _.maxBy(Object.entries(groupedBlogs), ([_, blogs]) => blogs.length);

  return { author: topAuthor[0], blogs: topAuthor[1].length };
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return {}
  
  const groupedBlogs = _.groupBy(blogs, 'author')
  const authorsWithLikes = _.map(groupedBlogs, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }));
  const topAuthors = _.maxBy(authorsWithLikes, 'likes');

  return topAuthors
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog, 
  mostBlogs,
  mostLikes
}
