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
        <complete-bar :steps="steps" />
        <div class="form_calendar">
          <div class="icon">
            <a href="">
              <img src="../assets/images/calendar2.png" alt="" />
            </a>
          </div>
          <div class="time_text">{{ DMY }}までご登録ください</div>
        </div>
      </div>
      <div class="warning">
        <div class="warning--img">
          <img src="../assets/images/Group_warn.png" alt="" />
          <p>ご確認ください</p>
        </div>
        <p>
          表示されている内容を確認いただき、認識に相違が無ければ同意するにチェックをしてください。
        </p>
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
  data() {
    return {
      DMY: "",
      steps: [
        {
          id: 1,
          imgNoneActive: require("../assets/images/Group_tick.png"),
          imgActive: require("../assets/images/Group_tick_active.png"),
        },
        {
          id: 2,
          imgNoneActive: require("../assets/images/Group_pencil.png"),
          imgActive: require("../assets/images/pencilActive.png"),
        },
        {
          id: 3,
          imgNoneActive: require("../assets/images/Group_tick.png"),
          imgActive: require("../assets/images/Group_tick_active.png"),
        },
        {
          id: 4,
          imgNoneActive: require("../assets/images/Group_pencil.png"),
          imgActive: require("../assets/images/pencilActive.png"),
        },
        {
          id: 5,
          imgNoneActive: require("../assets/images/Group_tick.png"),
          imgActive: require("../assets/images/Group_tick_active.png"),
        },
      ],
    };
  },
  methods: {
    handleClickBack() {
      const formBack = `form${this.step - 1}`;
      this.$store.dispatch("setStep", this.step - 1);
      this.$router.push(formBack);
    },
  },
  created() {
    const d = new Date();
    const day = d.getDay();
    const month = d.getMonth();
    const year = d.getFullYear();
    const dmy = `${day}/${month}/${year}`;
    this.DMY = dmy;
  },
};
</script> 
<style lang="scss">
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
  .warning {
    display: flex;
    gap: 8px;
    flex-direction: column;
    padding: 16px;
    background-color: #f1f2f7;
    &--img {
      display: flex;
      gap: 8px;
      img {
        width: 22px;
        height: 20px;
      }
      p {
        color: #333333;
        font-weight: 700;
      }
    }
  }
  .form_calendar {
    width: 100%;
    display: flex;
    margin: 29px 0px 19px 0px;
  }
}
</style>

