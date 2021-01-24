const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class BlogService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
  }

  async getOne(id) {
    const res = await api.get('api/blogs/' + id)
    AppState.active = res.data
  }

  async createBlog(blog) {
    const res = await api.post('api/blogs', blog)
    AppState.blogs.push(res.data)
    AppState.myBlogs.push(res.data)
  }

  async getComments(id) {
    const res = await api.get('api/blogs/' + id + '/comments')
    AppState.comments = res.data
  }

  async deleteBlog(id) {
    await api.delete('api/blogs/' + id)
    const remove = AppState.blogs.findIndex(p => p.id === id)
    AppState.blogs.splice(remove, 1)
    const take = AppState.myBlogs.findIndex(p => p.id === id)
    AppState.myBlogs.splice(take, 1)
  }
}

export const blogService = new BlogService()
