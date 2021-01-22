<template>
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col" v-if="blog.creator">
        <h1>{{ blog.title }}</h1>
        <h2>{{ blog.creator.name }}</h2>
        <img :src="blog.creator.picture" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>{{ blog.body }}</p>
      </div>
    </div>
    <Comment v-for="com in comment" :key="com.id" :com-props="com" />
  </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'

export default {
  setup() {
    const route = useRoute()
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
      blog: computed(() => AppState.active),
      comment: computed(() => AppState.comments)
    }
  }
}
</script>
