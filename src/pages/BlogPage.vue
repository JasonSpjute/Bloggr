<template>
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col-6 offset-3" v-if="blog.creator">
        <h1>
          {{ blog.title }}   <router-link :to="{ name: 'MyBlogs'}">
            <i class="fas fa-ban text-danger" v-if="state.account.id == blog.creator.id" @click="deleteBlog"></i>
          </router-link>
        </h1>
        <h2>{{ blog.creator.name }}</h2>
        <img :src="blog.imgUrl" class="img-fluid" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>{{ blog.body }}</p>
      </div>
    </div>
    <form @submit.prevent="createComment">
      <div class="form-inline">
        <input type="string" class="form-control" id="comment" placeholder="Write Comment here" v-model="state.newComment.body">
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
    <Comment v-for="com in comment" :key="com.id" :com-props="com" />
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { commentService } from '../services/commentService'

export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newComment: {
        body: '',
        blog: route.params.id
      },
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await blogService.getOne(route.params.id)
      } catch (error) {
        logger.log(error)
      }
      try {
        await blogService.getComments(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      blog: computed(() => AppState.active),
      comment: computed(() => AppState.comments),
      async createComment() {
        try {
          await commentService.create(state.newComment)
        } catch (error) {
          logger.log(error)
        }
      },
      deleteBlog() {
        try {
          blogService.deleteBlog(this.blog.id)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>
