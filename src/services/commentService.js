import { AppState } from '../AppState'
const { api } = require('./AxiosService')

class CommentService {
  async create(comment) {
    await api.post('api/comments', comment)
    this.getComments()
  }

  async getComments(id) {
    const res = await api.get('api/blogs/' + id + '/comments')
    AppState.comments = res.data
  }
}

export const commentService = new CommentService()
