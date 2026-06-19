const {test, describe, beforeEach, after} = require('node:test')
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