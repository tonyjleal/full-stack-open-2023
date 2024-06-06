const mongoose = require("mongoose");
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const helper = require("./test_helper");
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs)
});
  

describe("when there is initially some blogs saved", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    });

    test("initial blogs are 13", async () => {
        const response = await api.get("/api/blogs")

        const blogs = response.body

        assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })
    
})





after(() => {
    mongoose.connection.close()
})