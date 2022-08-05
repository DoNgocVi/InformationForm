<template>
  <div>
    <button class="button-agrre" @click.prevent="handleSubmit" type="submit">
      入社手続きの入力に進む
    </button>
    <div class="modal" v-if="isShow">
      <h1>入社手続きの申請をします</h1>
      <div class="modal_warning--text">
        <div>
          <img src="../../assets/images/Group_warn.png" alt="" />
          <p>ご確認ください</p>
        </div>
        <p>
          入力ありがとうございました。<br />
          登録した内容を確認する場合は「戻る」を選択してください。<br />
          手続きを申請する場合は「申請する」を選択してください。
        </p>
      </div>
      <div class="modal_btn">
        <div class="modal_btn--accept" @click="handleAccept">申請する</div>
        <div class="modal_btn--back" @click="handleBack">戻る</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    handleSubmit() {
      this.isShow = true;
    },
    handleAccept() {
      //get data from vuex 
      // complete message
      this.$router.push("/complete");
    },
    handleBack() {
      // back form 2
      this.$router.push("/form2");
    },
  },
};
</script>
<style scoped lang = "scss">
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
.modal {
  width: 608px;
  height: 276px;
  display: block;
  position: fixed;
  background-color: #ffffff;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 4px rgba(102, 102, 102, 0.32);
  border-radius: 10px;
  padding: 32px 48px 16px;
  h1 {
    font-size: 2.4rem;
    color: #333333;
    margin-bottom: 25px;
  }
  &_warning {
    &--text {
      background-color: #f1f2f7;
      padding: 11px 24px;
      margin-bottom: 18px;
      p {
        font-size: 14px;
        line-height: 22px;
      }
      div {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 4px;
        p {
          font-size: 18px;
          color: #333333;
          font-weight: 700;
        }
      }
    }
  }
  &_btn {
    display: flex;
    flex-direction: row-reverse;
    gap: 12px;
    &--back {
      padding: 9px 50px;
      background-color: #ffffff;
      border: 1px solid #6563ff;
      border-radius: 4px;
      font-size: 16px;
      color: #6563ff;
    }
    &--accept {
      padding: 9px 50px;
      background-color: #6563ff;
      border: 1px solid #6563ff;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
    }
  }
}
</style>