<template>
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col">
        <h1>Blogs!</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#postModal">
          New Post
        </button>
        <PostModal />
      </div>
    </div>
    <div class="row">
      <Blog v-for="blog in state.blogs" :key="blog.id" :blog-props="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { blogService } from '../services/BlogService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs)
    })
    onMounted(async() => {
      try {
        await blogService.getBlogs()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
