import { AppState } from '../AppState'
import { blogService } from './BlogService'
const { api } = require('./AxiosService')

class CommentService {
  async create(comment) {
    await api.post('api/comments', comment)
    blogService.getComments(comment.blog)
  }

  async edit(id, comment) {
    const data = { body: comment }
    await api.put('api/comments/' + id, data)
  }

  async delete(id) {
    await api.delete('api/comments/' + id)
    const remove = AppState.comments.findIndex(p => p.id === id)
    AppState.comments.splice(remove, 1)
  }
}

export const commentService = new CommentService()
