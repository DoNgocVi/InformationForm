
<template>
  <div class="form_group">
    <div class="warning">
      <img src="../assets/images/Group_warn.png" alt="" />
      <p>ご確認ください</p>
    </div>
    <p>
      表示されている内容を確認いただき、認識に相違が無ければ同意するにチェックをしてください。
    </p>
  </div>

  <div class="form_group">
    <div class="form_title">基本情報登録</div>
    <p class="help-text">
      外国式氏名が戸籍に記載されている場合、国際結婚により戸籍上の姓が外国式の姓となっている、もしくは重国籍で戸籍上の氏名が外国式の氏名となっている場合、戸籍上の綴りで入力してください。
    </p>
    <div class="lastnameMain">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">姓</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
       value="âdâdâfsdfsd"
      />
    </div>
    <div class="fistnameMain">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">名</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        name="noName"
        v-model="form.fistnameMain"
      />
    </div>
    <div class="seiMain">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">セイ</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        name="lastName"
        v-model="form.seiMain"
      />
    </div>
    <div class="meiMain">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">メイ</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        name="lastName"
        v-model="form.meiMain"
      />
    </div>
    <div class="lastnameRoMain">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">姓（ローマ字）</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        name="lastName"
        v-model="form.lastnameRoMain"
      />
    </div>
    <div class="fistnameRoMain">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">名（ローマ字）</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        name="fistNameRo"
        v-model="form.fistnameRoMain"
      />
    </div>
    <div class="gender">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">性別</p>
      </div>

      <div class="radio_button">
        <div class="radio_button-1">
          <input type="radio" id="male" value="Male" v-model="form.gender" />
          <label for="male">男性</label>
        </div>
        <div class="radio_button-2">
          <input
            type="radio"
            id="female"
            value="Female"
            v-model="form.gender"
          />
          <label for="female">女性</label>
        </div>
      </div>
    </div>

    <div class="birthday">
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
            v-model="form.dmy.date"
            placeholder="西暦（半角"
          />
          <span>年</span>
        </div>
        <div>
          <input
            type="text"
            name="date"
            id="date"
            v-model="form.dmy.month"
            placeholder="西暦（半角"
          />
          <span>月</span>
        </div>
        <div>
          <input
            type="text"
            name="date"
            id="date"
            v-model="form.dmy.year"
            placeholder="半角"
          />
          <span>日</span>
        </div>
      </div>
    </div>
    <div class="display_info">
      <div class="display_date">
        <p>年齢</p>
        <p v-if="form.dmy.date">
          {{ `${form.dmy.date} - ${form.dmy.month} - ${form.dmy.year}` }}
        </p>
        <p v-else>生年月日を入力すると表示されます</p>
      </div>
      <div class="companyName">
        <p>ビジネスネーム</p>
        <p>旧姓を利用する等の場合に入力をしてください。</p>
        <input type="text" v-model="form.companyName" />
      </div>
    </div>
  </div>

  <!-- submit form -->
  <button class="button-agrre" @click.prevent="handleSubumit" type="submit">
    入社手続きの入力に進む
  </button>
</template>

<script>
export default {
  

  data() {
    return {
      form: {
        previewImage: {
          facePhoto: null,
          photoDocument: null,
          pensionBookPhoto: null,
          identificationPhoto: null,
        },
        lastnameMain: "",
        fistnameMain: "",
        seiMain: "",
        meiMain: "",
        lastnameRoMain: "",
        fistnameRoMain: "",
        companyName: "",
        picked: [],
        gender: [],
        dmy: {
          date: null,
          month: "",
          year: "",
        },
        courseTime: {
          start: "",
          end: "",
        },
        educationBg: [],
        schoolName: "",
        facultyName: "",
        basicPension: "",
        oldCompanyName: "",
        accountNumber: "",
        accountName: "",
        isForeigner: false,
        noActiveaccountNumberFore: null,
        nameFore: "",
        lastNameForeKana: "",
        lastNameForeRo: "",
        nameForeKana: "",
        nationality: "",
        residence: "",
        residenceTime: "",
        licensesBeyond: "",
        typeofWork: "",
        residenceCardnumber: "",
        householdDivision: "",
        housingClassification: "",
        zipCode: {
          zip1: null,
          zip2: null,
        },
        province: "",
        autonomousCity: "",
        address: "",
        buildingNameroomNumber: "",
        phoneNumber: null,
        mobilePhoneNumber: null,
        arcChecked: false,
        zipCodeArc: {
          zip1: null,
          zip2L: null,
        },
        provinceArc: "",
        autonomousCityArc: "",
        addressArc: "",
        buildingNameroomNumberArc: "",
        lastnameRelationship: "",
        lastnameRela: "",
        fistNameRela: "",
        surename: "",
        nameMei: "",
        zipCodeRela: {
          zip1: null,
          zip2L: null,
        },
        provinceRela: "",
        autonomousCityRela: "",
        addressRela: "",
        buildingNameroomNumberRela: "",
        phoneNumberRela: "",
        mobilePhoneNumberRela: "",
        //
        zipCodeRela2: {
          zip1: null,
          zip2L: null,
        },
        dmy2: {
          date: "",
          month: "",
          year: "",
        },
      },
    };
  },
  methods:{
    handleSubumit(){
      this.$store.dispatch('setStep', 4)
      this.$router.push('complete')
    }
  }
};
</script>
<style scope lang="scss">
::placeholder {
  color: #9999;
}
.form_group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 19px;
  width: 100%;
  background-color: #f1f2f7;
  padding: 8px 16px 16px 16px;
  &-info {
    padding: 16px;
  }
  .imagePreviewWrapper {
    background-repeat: no-repeat;
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 0px;
    background-size: contain;
    background-position: center center;
  }
  .field-name {
    font-weight: 700;
    color: #333333;
    margin-bottom: 8px;
  }
  .title_guide {
    margin-bottom: 8px;
  }
  .images_drop {
    position: relative;
    margin-top: 20px;
    text-align: center;
    background-color: #ffffff;
    padding: 8px;
    span {
      color: #333333;
      font-weight: 700;
    }
    input {
      top: 0;
      bottom: 0;
      position: absolute;
      background-color: transparent;
      opacity: 0;
    }
  }
  .text_require {
    display: flex;
    align-items: center;
    gap: 8px;
    .help-text {
      flex: 1;
    }
  }
  .requireother {
    display: flex;
    .requireother_outline {
      border: 3px solid #ed5d5d;

      height: 17px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      width: 60px;
      position: relative;
      p {
        position: absolute;
        top: -4px;
        left: 2px;
        font-size: 12px;
        color: #ed5d5d;
      }
    }
    .require {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .form_input {
    height: 48px;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    padding: 8px;
    width: 100%;
    margin-bottom: 5px;
  }
  .warning {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    p {
      color: #333333;
      font-weight: 700;
    }
  }
  .dateMY {
    display: flex;
    gap: 12px;
    align-items: center;
    div {
      display: flex;
      align-items: center;

      input {
        padding: 8px;
        width: 116px;
        height: 48px;
        margin-right: 12px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
      }
      .horizontal {
        border: 1px solid #999;
        width: 16px;
      }
    }
    button {
      height: 32px;
      width: 116px;
      border: 1px solid #b2b1ff;
      border-radius: 4px;
      background-color: #b2b1ff;
      color: #ffffff;
      margin-left: 34px;
    }
  }
  .display_info {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 44px;
    div {
      p:first-child {
        color: #333333;
      }
      input {
        margin-top: 8px;
        width: 100%;
        height: 48px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        padding: 8px;
        font-weight: 400;
        font-size: 1.6rem;
      }
    }
  }
  .education_option {
    display: flex;
    flex-direction: column;
    gap: 14px;
    input {
      height: 48px;
      width: 160px;
      border: 1px solid #dcdcdc;
      border-radius: 2px;
      padding: 8px;
    }
    select {
      width: 100%;
      height: 48px;
      border: 1px solid #dcdcdc;
      border-radius: 2px;
      padding: 8px;
    }
  }
  .facultyName {
    a {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #007bc3;
      text-decoration: none;
      span {
        font-size: 25px;
      }
    }
  }
  .input-search {
    background-image: url(../assets/images/look.png);
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 8px;
    background-size: 24px;
    padding: 0px 40px;
    height: 48px;
    border: 1px solid #dcdcdc;
    border-radius: 2px;
    padding: 8px;
    padding-left: 37px;
  }

  .radio_button {
    margin-top: 6px;
    margin-bottom: 5px;
    display: flex;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    .radio_button-1 {
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      padding: 12px;
      width: 50%;
      background-color: #ffffff;
      border-right: 1px solid #dcdcdc;
    }
    .radio_button-2 {
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      padding: 12px;
      width: 50%;
      background-color: #ffffff;
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
    line-height: 1.7;
    padding: 10px 8px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    p {
      color: #333333;
    }
    .form-control {
      font-family: system-ui, sans-serif;
      font-size: 1.4rem;
      line-height: 1.1;
      display: grid;
      grid-template-columns: 1em auto;
      gap: 0.5em;
    }
    .white_content-line {
      display: flex;
      align-items: center;
      .number {
        width: 30px;
        align-self: flex-start;
      }
      .text {
        flex: 1;
      }
    }
  }
  .require {
    background-color: #ed5d5d;
    width: 45px;
    height: 17px;
    color: #fff !important;
    padding: 0px 10px;
    font-size: 1.2rem;
    border-radius: 2px;
  }
  .noActive {
    background: #999999;
  }
  .filed_noActive {
    color: #dcdcdc;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 8px;
    .info_text {
      color: #666666;
      font-size: 18px;
    }
  }
}
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
  padding: 8px;
  background: #b2b1ff;
  cursor: pointer;
}
</style>
