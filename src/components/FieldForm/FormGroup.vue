<template>
  <div class="form_group">
    <div class="form_title">
      <slot name="title" />
    </div>
    <slot name="infoText" />
    <div class="form_content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {};
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
</style>