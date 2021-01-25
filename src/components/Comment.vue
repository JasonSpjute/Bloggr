<template>
  <div class="row">
    <div class="col" v-if="comProps">
      <span :contenteditable="state.editComment" @blur="editComment">{{ comProps.body }}</span><span> - </span><span>{{ comProps.creator.name }}</span>
      <i class="fas fa-ban text-danger" v-if="state.account.id == comProps.creator.id" @click="deleteComment"></i>
      <i class="far fa-edit" v-if="state.account.id == comProps.creator.id" @click="state.editComment = !state.editComment"></i>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentService } from '../services/commentService'
import { logger } from '../utils/Logger'
export default {
  name: 'Comment',
  props: {
    comProps: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editComment: false
    })
    return {
      state,
      deleteComment() {
        try {
          commentService.delete(props.comProps.id)
        } catch (error) {
          logger.log(error)
        }
      },
      editComment(e) {
        try {
          commentService.edit(props.comProps.id, e.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
