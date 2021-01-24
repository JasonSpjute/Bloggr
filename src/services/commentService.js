import { blogService } from './BlogService'
const { api } = require('./AxiosService')

class CommentService {
  async create(comment) {
    await api.post('api/comments', comment)
    blogService.getComments(comment.blog)
  }
}

export const commentService = new CommentService()
