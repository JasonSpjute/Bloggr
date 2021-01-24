<template>
  <div class="col-4">
    <router-link :to="{ name: 'BlogPage', params: { id: blogProps.id}}">
      <img :src="blogProps.imgUrl" class="this img-thumbnail" alt="">
      <h2>{{ blogProps.title }}</h2>
      <h4>By: {{ blogProps.creator.name }}</h4>
      <p>{{ blogProps.body }}</p>
    </router-link>
    <i class="fas fa-ban text-danger" v-if="state.account.id == blogProps.creator.id" @click="deleteBlog"></i>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'Blog',
  props: {
    blogProps: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      deleteBlog() {
        try {
          blogService.deleteBlog(props.blogProps.id)
        } catch (error) {
          logger.log(error)
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
  .this{
    width: 50%
  }
</style>
