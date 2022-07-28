<template>
  <div class="conainer">
    <header-view />
    <div class="box">
      <h1>入社手続きの申請ありがとうございました。</h1>
      <div>
        <img src="../assets/images/accept1.png" alt="" />
      </div>
      <div class="box_text">
        申請がありがとうございました。 <br />
        入社手続きの承認をお待ちください。
      </div>
      <button class="box_review" @click.prevent="handleBackForm">申請した内容を見る</button>
    </div>
  </div>
</template>
<script>
import HeaderView from "../view/HeaderView.vue";
export default {
  components: {
    HeaderView,
  },
  methods:{
    handleBackForm(){
      this.$router.push('form2')
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  text-align: center;
  display: flex;
  margin-top: 94px;
  flex-direction: column;
  align-items: center;
  h1 {
    padding-bottom: 80px;
    font-size: 32px;
    width: 100%;
  }
  &_text {
    margin-top: 36px;
  }
  &_review {
    margin-top: 32px;
    color: #007bc3;
    width: 176px;
    height: 48px;
    border: 1px solid #007bc3;
    border-radius: 8px;
    background-color: transparent;
  }
}
</style>

