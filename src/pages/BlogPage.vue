<template>
  <h1>This is where the magic happens</h1>
</template>
<script>
import { onMounted } from 'vue'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'

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
  }
}
</script>
