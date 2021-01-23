<template>
  <div class="container-fluid">
    <div class="about text-center">
      <h1>Welcome {{ state.account.name }}</h1>
      <img class="rounded" :src="state.account.picture" alt="" />
      <p>{{ state.account.email }}</p>
    </div>
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
      <Blog v-for="blog in state.myBlogs" :key="blog.id" :blog-props="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
export default {
  name: 'MyBlogs',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      myBlogs: computed(() => AppState.myBlogs)
    })
    onMounted(async() => {
      try {
        await accountService.getMyBlogs()
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
<style lang="scss" scoped>
img {
  max-width: 100px;
}
</style>
