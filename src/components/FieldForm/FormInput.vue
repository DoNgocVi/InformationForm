<template>
  <div :class="{ search: isSearch }">
    <div v-if="mainTitle" class="main_title">{{ mainTitle }}</div>
    <!-- type 2 -->
    <div v-if="require2" class="text_require">
      <div class="requireother">
        <div class="requireother_outline">
          <p>どちらか</p>
        </div>
        <p class="require">必須</p>
      </div>
      <p class="help-text">{{ helpText }}</p>
    </div>
    <!-- type 1 -->
    <div v-if="helpText && !require2" class="text_require">
      <p v-if="isRequire" :class="{ noActive: isForeigner }" class="require">
        必須
      </p>
      <p class="help-text" :class="{ filed_noActive: isForeigner }">
        {{ helpText }}
      </p>
    </div>
    <p v-if="titleGuide" class="title_guide">{{ titleGuide }}</p>
    <input
      :style="{ width: width }"
      style="position: relative"
      v-if="inputType === 'text' || inputType === 'date'"
      :class="{ form_input: !isSearch, 'input-search': isSearch }"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="isForeigner"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <div v-if="inputType === 'radio'" class="radio_button">
      <div class="radio_button-1">
        <input
          type="radio"
          :id="valueRadio.value1"
          :value="valueRadio.value1"
          @input="$emit('update:modelValue', $event.target.value)"
          v-model="picked"
        />
        <label :for="valueRadio.value1">{{ valueRadio.value1 }}</label>
      </div>
      <div class="radio_button-2">
        <input
          type="radio"
          :id="valueRadio.value2"
          :value="valueRadio.value2"
          v-model="picked"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="valueRadio.value2">{{ valueRadio.value2 }}</label>
      </div>
    </div>

    <div v-if="inputType === 'select'">
      <select
        class="form_input"
        id="educationBg2"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option :value="optionValue.option1">
          {{ optionValue.option1 }}
        </option>
        <option :value="optionValue.option2">
          {{ optionValue.option2 }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      picked: [],
    };
  },
  props: {
    modelValue: {
      type: String,
    },
    value: {
    },
    width: {
      default: 528,
    },

    helpText: {
      default: null,
    },
    placeholder: {
      default: "",
    },
    valueRadio: {
      default: {},
    },
    inputType: {
      default: "",
    },
    isRequire: {
      default: true,
    },
    mainTitle: {
      default: null,
    },
    titleGuide: {
      default: null,
    },
    isSearch: {
      default: false,
    },
    isForeigner: {
      default: false,
    },
    require2: {
      default: false,
    },
    optionValue: {
      default: {
        option1: "",
        option2: "",
      },
    },
    textRight: {
      default: null,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>