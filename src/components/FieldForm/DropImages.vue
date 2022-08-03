<template>
  <div style="margin-bottom: 5px">
    <div class="text_require" v-if="isRequire">
      <p v-if="isRequire" class="require">必須</p>
      <p class="help-text">{{ helpText }}</p>
    </div>
    <div v-if="mainTitle" :class="{filed_noActive: isForeigner}" class="main_title">{{ mainTitle }}</div>
    <p v-if="titleGuide" :class="{filed_noActive: isForeigner}" class="title_guide">{{ titleGuide }}</p>
    <div class="drop_images">
      <div
        v-show="isShow"
        class="imagePreviewWrapper"
        :style="{ 'background-image': `url(${linkImage})` }"
      ></div>
      <div class="images_drop" :class="{ 'mt-5': linkImage }">
        <input
          @input="pickFile({ refEl, setData })"
          :ref="refEl"
          class="form-control form-control-sm"
          id="formFileSm"
          type="file"
          :disabled="isForeigner"
        />

        <img src="../../assets/images/upload.png" alt="" />
        <div class="mb-3"></div>
        <p>
          <span>ファイルをドラッグ&ドロップ</span> <br />
          ファイルをドロップするか、<br />
          ファイルを参照する
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      default: false,
    },
    linkImage: {
      default: "",
    },
    refEl: {
      default: "",
    },
    setData: {
      default: "",
    },
    helpText: {
      default: "",
    },
    mainTitle: {
      default: null,
    },
    titleGuide: {
      default: null,
    },
    isRequire: {
      default: false,
    },
    isForeigner:{
      default: false
    }
  },
  methods: {
    pickFile(payload) {
      //get ref
      let input = this.$refs[payload.refEl];
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          // add link to data
          this.$emit("inputData", {
            image: e.target.result,
            setData: this.setData,
          });
        };
        reader.readAsDataURL(file[0]);
      }
    },
  },
};
</script>
<style scoped>
</style>