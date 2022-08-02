<template>
  <div>
    <div class="text_require">
      <p v-if="!isRequire" class="require">必須</p>
      <p class="help-text">{{ helpText }}</p>
    </div>
    <input
      :style="{ width: width }"
      v-if="inputType === 'text' || inputType === 'date'"
      class="form_input"
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="inputType === 'radio'" class="radio_button">
      <div class="radio_button-1">
        <input
          type="radio"
          id="male1"
          value="Male"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label for="male1">男性</label>
      </div>
      <div class="radio_button-2">
        <input
          type="radio"
          id="female1"
          value="Female"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label for="female1">女性</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: String,
    width: {
      default: 528,
    },

    helpText: {
      default: "",
    },
    placeholder: {
      default: "",
    },
    inputType: {
      default: "",
    },
    isRequire: {
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>