const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class BlogService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
  }
  aync getOne(id) {
    const res = await api.get('api/blogs/' + id)
    AppState.active = res.data
  }
}

export const blogService = new BlogService()
