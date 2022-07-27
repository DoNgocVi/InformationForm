<template>
  <header-view />
  <div class="content">
    <form class="form">
      <div v-if="step < 4">
        <div v-if="step > 1" class="backStep">
          <img
            src="../assets/images/ArrowLeft.png"
            alt=""
            @click="handleClickBack"
          />
          <p v-if="step > 1">入社手続きの登録をお願いいたします</p>
          <p v-else>雇用契約について</p>
        </div>
        <div class="form_title">雇用契約について</div>
        <complete-bar />
        <div class="form_calendar">
          <div class="icon">
            <a href="">
              <img src="../assets/images/calendar2.png" alt="" />
            </a>
          </div>
          <div class="time_text">2021/09/01までご登録ください</div>
        </div>
      </div>

      <!-- display form -->
      <router-view />
    </form>
  </div>
</template>

<script>
import HeaderView from "../view/HeaderView.vue";
import CompleteBar from "./CompleteBar.vue";
export default {
  components: {
    HeaderView,
    CompleteBar,
    // FistForm,
    // SecondForm,
  },
  computed: {
    step() {
      return this.$store.state.step;
    },
  },
  methods: {
    handleClickBack() {
      console.log("back");
      const formBack = `form${this.step - 1}`;
      this.$store.dispatch("setStep", this.step - 1);
      this.$router.push(formBack);
    },
  },
};
</script> 
<style lang="scss">
p {
  margin: 0;
}
.content {
  width: 100%;
  .backStep {
    display: flex;
    gap: 10px;
    align-items: center;
    padding-bottom: 4px;
    img {
      width: 16px;
      height: 16px;
    }
  }
}
.header {
  display: flex;
  gap: 24px;
  height: 64px;
  align-items: center;
  width: 100%;
  padding-left: 23px;
  box-shadow: 0px 0px 8px rgba(102, 102, 102, 0.24);
  a {
    text-decoration: none;
    color: black;
    font-weight: 700;
    position: relative;
    height: 100%;
    line-height: 64px;
    color: #999999;
  }

  .active {
    color: #333333;
  }
  .active::after {
    position: absolute;
    content: " ";
    width: 98px;
    height: 4px;
    background: #007bc3;
    border-radius: 6px;
    bottom: 0;
    left: -8px;
  }
  .small_link {
    font-weight: 400;
  }
}
.form {
  width: 562px;
  margin: 0 auto;
  margin-top: 4.8rem;
  .form_title {
    width: 100%;
    font-size: 2.4rem;
  }

  .form_calendar {
    width: 100%;
    display: flex;
    margin-top: 29px;
  }
  .form_group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 19px;
    width: 100%;
    background-color: #f1f2f7;
    padding: 19px;
    .warning {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      p {
        color: black;
        font-weight: 700;
      }
    }
    p {
      font-weight: 400;
      color: #666666;
    }
    .form_title {
      font-size: 1.8rem;
      p {
        color: #333333;
      }
    }
    .white_content {
      font-size: 1.4rem;
      background-color: #ffffff;
      line-height: 2.4rem;
      padding: 10px 8px;
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      p {
        color: #333333;
      }
    }
  }
}
</style>

