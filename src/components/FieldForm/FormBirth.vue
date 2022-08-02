<template>
  <div>
    <div class="text_require">
      <p class="require">必須</p>
      <p class="help-text">生年月日</p>
    </div>
    <div class="dateMY">
      <div>
        <input
          type="text"
          name="date"
          id="date"
          @input="$emit('update:modelValue', $event.target.value)"
          placeholder="西暦（半角"
        />
        <span>年</span>
      </div>
      <div>
        <input
          type="text"
          name="date"
          id="date"
          @input="$emit('update:modelValue', $event.target.value)"
          placeholder="西暦（半角"
        />
        <span>月</span>
      </div>
      <div>
        <input
          type="text"
          name="date"
          id="date"
          @input="$emit('update:modelValue', $event.target.value)"
          placeholder="半角"
        />
        <span>日</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
};
</script>