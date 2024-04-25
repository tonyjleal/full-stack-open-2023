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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
