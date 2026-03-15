const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.sort((a,b) => a.likes - b.likes)[blogs.length - 1]
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}