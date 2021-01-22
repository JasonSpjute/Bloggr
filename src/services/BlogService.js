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

  async getComments(id) {
    const res = await api.get('api/blogs/' + id + '/comments')
    console.log(res.data)
    AppState.comments = res.data
  }
}

export const blogService = new BlogService()
