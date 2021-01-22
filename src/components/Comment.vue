<template>
  <div class="row">
    <div class="col" v-if="comProps">
      <p>{{ comProps.body }} - {{ comProps.creator.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comProps: { type: Object, required: true }
  }
}
</script>
