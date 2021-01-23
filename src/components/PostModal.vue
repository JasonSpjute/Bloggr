<template>
  <div class="modal fade"
       id="postModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="postModal">
            New Post
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="form" @submit.prevent="createBlog">
            <div class="form-group">
              <input type="text"
                     name="title"
                     id="title"
                     class="form-control"
                     placeholder="Enter post Title"
                     aria-describedby="helpId"
                     v-model="state.newBlog.title"
                     required="true"
              >
              <input type="text"
                     name="body"
                     id="body"
                     class="form-control"
                     placeholder="Enter Blog Post Here"
                     aria-describedby="helpId"
                     v-model="state.newBlog.body"
                     required="true"
              >
              <input type="text"
                     name="imgUrl"
                     id="imgUrl"
                     class="form-control"
                     placeholder="Enter img url"
                     aria-describedby="helpId"
                     v-model="state.newBlog.imgUrl"
              >
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'PostModal',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      async createBlog() {
        try {
          await blogService.createBlog(state.newBlog)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
