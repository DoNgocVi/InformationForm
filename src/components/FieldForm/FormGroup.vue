<template>
  <div class="form_group">
    <div class="form_title">
      <slot name="title" />
    </div>
    <div v-if="isDocument" class="form_document">
      <slot name="infoText" />
    </div>
    <div class="form_content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props:{
    isDocument:{
      default: true
    }
  }
};
</script>

<style scoped>
.form_content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form_title {
  font-size: 1.8rem;
}
.form_document {
  font-size: 1.4rem;
  color: #666666;
  line-height: 22px;
  margin-top: -5px;
}
</style>