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
    return blogs.sort((a,b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
    const blogPerAuthor = blogs.map((a) => {
        return a.author
    }).reduce((sum, item) => {
        sum[item] ? sum[item]++ : sum[item] = 1
        return sum
    },{})
    const bestBlogger = Object.entries(blogPerAuthor).sort((a,b) => b[1]-a[1])[0]
    return {
        "author": bestBlogger[0],
        "blogs": bestBlogger[1]
    }
    
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}