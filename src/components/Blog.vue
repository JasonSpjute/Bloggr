<template>
  <div class="col-4">
    <router-link :to="{ name: 'BlogPage', params: { id: blogProps.id}}">
      <img :src="blogProps.creator.picture" class="img-fluid" alt="">
      <h2>{{ blogProps.title }}</h2>
      <h4>By: {{ blogProps.creator.name }}</h4>
      <p>{{ blogProps.body }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  props: {
    blogProps: { type: Object, required: true }
  },
  setup() {

  }
}
</script>

<style lang="scss" scoped>

</style>
