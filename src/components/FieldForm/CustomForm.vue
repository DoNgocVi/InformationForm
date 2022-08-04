<template>
  <div>
    <div class="text_require">
      <p class="require">必須</p>
      <p class="help-text">{{ helpText }}</p>
    </div>
    <div class="dateMY">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    helpText: {
      default: "",
    },
  },
};
</script>