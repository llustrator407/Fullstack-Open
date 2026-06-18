const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
test('dummy returns one', ()=>{
  const blogs=[]
  const result=listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})
describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_books/Edsger_W._Dijkstra.html',
        likes: 5,
        __v: 0
      }
    ]
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })
  test('of a bigger list is calculated right', () => {
    const blogs = [
      { likes: 10 },
      { likes: 5 },
      { likes: 7 }
    ]
    assert.strictEqual(listHelper.totalLikes(blogs), 22)
  })
})
describe('favorite blog', () => {
  const blogs =[
    { title: 'Blog A', likes: 5 },
    { title: 'Blog B', likes: 12 },
    { title: 'Blog C', likes: 7 }
  ]
  test('returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, { title: 'Blog B', likes: 12 })
  })
  test('returns null if the list is empty', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })
})
describe('most blogs', ()=>{
  const blogs = [
    {author: 'Robert C. Martin', blogs: 1},
    {author: 'Robert C. Martin', blogs: 1},
    {author: 'Edsger W. Dijkstra', blogs: 1},
    {author: 'Robert C. Martin', blogs: 1}
  ]
  test('returns the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})