const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
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