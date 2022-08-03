<template>
  <div class="search">
    <div v-if="helpText" class="text_require">
      <p class="require" :class="{ noActive: !isActive }">必須</p>
      <p :class="{ filed_noActive: !isActive }" class="help-text">
        {{ helpText }}
      </p>
    </div>
    <p v-if="titleGuide" class="title_guide">{{ titleGuide }}</p>
    <input
      style="width: 100%"
      class="input-search"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  props: {
    helpText: {
      default: "",
    },
    titleGuide: {
      default: "",
    },
    modelValue: {
      default: "",
    },
    placeholder: {
      default: "",
    },
    isActive: {
      default: true,
    },
  },
};
</script>
<style scoped>
</style>