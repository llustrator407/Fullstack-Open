const {test, describe, beforeEach, after} = require('node:test')
const assert=require('node:assert')
const supertest=require('supertest')
const mongoose=require('mongoose')
const helper = require('../utils/list_helper')
const app=require('../app')
const api=supertest(app)
const Blog = require('../models/blog')
beforeEach(async()=>{
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
after(async () => {
  await mongoose.connection.close()
})
test('blog posts have a unique identifier property named id', async()=>{
  const response = await api.get('/api/blogs')
  assert.ok(response.body[0].id, 'The blog should have an id property')
  assert.strictEqual(response.body[0]._id, undefined)
})