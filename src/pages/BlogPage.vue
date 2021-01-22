<template>
  <h1>{{ blog.title }}</h1>
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
    })
    return {
      blog: computed(() => AppState.active)
    }
  }
}
</script>
