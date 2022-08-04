<template>
  <button
    :class="{ 'button-disable': isDisable }"
    class="button-agrre"
    @click.prevent="onSubmit"
    type="submit"
    :disabled="isDisable"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    onSubmit: {
      type: Function,
    },
    isDisable: {
      default: false,
    },
  },
};
</script>
<style scoped>
.button-agrre {
  margin-top: 16px;
  border-radius: 3px;
  overflow: hidden;
  display: block;
  width: 100%;
  border: none;
  text-align: center;
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.3;
  padding: 14px 8px;
  background: #b2b1ff;
  cursor: pointer;
}
.button-disable {
  background-color: #dcdcdc;
  color: #ffffff;
  font-size: 16px;
}
</style>