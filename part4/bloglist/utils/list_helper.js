const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentBlog) => {
    return accumulator + (currentBlog.likes || 0)
  }, 0)
}

module.exports = {
  dummy,
  totalLikes
}
