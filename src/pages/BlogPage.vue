<template>
  <h1>This is where the magic happens</h1>
</template>
<script>
import { onMounted } from 'vue'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'

export default {
  setup() {
    onMounted(async() => {
      try {
        await blogService.getOne()
      } catch (error) {
        logger.log(error)
      }
    })
  }
}
</script>
