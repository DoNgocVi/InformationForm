<template>
  <div class="wrapper-stepper">
    <div class="stepper">
      <div class="stepper-progress">
        <div
          class="stepper-progress-bar"
          :style="'width:' + stepperProgress"
        ></div>
      </div>

      <div
        class="stepper-item"
        :class="{ success: step >= item }"
        v-for="item in 5"
        :key="item"
      >
        <div class="stepper-item-counter">
          <template v-if="item % 2 === 0">
            <img
              class="icon-success"
              src="../assets/images/pencilActive.png"
              alt=""
            />
          </template>
          <template v-else>
            <img
              class="icon-success"
              src="../assets/images/Group_tick_active.png"
              alt=""
            />
          </template>
          <div class="icon-noSuccess">
            <span v-if="item % 2 !== 0">
              <img src="../assets/images/Group_tick.png" alt="" />
            </span>
            <span v-else>
              <img src="../assets/images/Group_pencil.png" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    stepperProgress() {
      return (100 / 4) * (this.step - 1) + "%";
    },
    ...mapState({
      step: (state) => state.step,
    }),
  },
};
</script>

<style scoped lang='scss'>
$default: #c5c5c5;
$violet-1: #b2b1ff;
$transiton: all 500ms ease;

.tx-green-1 {
  color: $violet-1;
  font-weight: 600;
}

.wrapper-stepper {
  background-color: #fff;
  padding-top: 24px;
  border-radius: 32px;
  box-shadow: rgba($color: #000000, $alpha: 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  margin-bottom: 24px;

  &-progress {
    position: absolute;
    background-color: $default;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: $violet-1;
      transition: $transiton;
    }
  }
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $default;
  transition: $transiton;

  &-counter {
    height: 40px;
    width: 40px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    position: relative;

    .icon-success {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      opacity: 0;
      transform: scale(0);
      width: 40px;
      transition: $transiton;
    }

    .icon-noSuccess {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      opacity: 1;
      transform: scale(1);
      width: 40px;
      transition: $transiton;
    }
  }

  &-title {
    position: absolute;
    font-size: 14px;
    bottom: -24px;
  }
}

.stepper-item.success {
  .stepper-item-counter {
    .icon-success {
      opacity: 1;
      transform: scale(1);
    }

    .icon-noSuccess {
      opacity: 0;
      transform: scale(0);
    }
  }
}

.stepper-pane {
  color: #333;
  text-align: center;
  padding: 120px 60px;
  box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.09);
  margin: 40px 0;
}
</style>