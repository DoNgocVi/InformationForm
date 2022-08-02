
<template>
  <div class="form_group">
    <div class="form_title">顔写真の登録</div>
    <p class="help-text">
      システムの本人アイコンに使用します。あなたの顔が分かる写真を登録してください。未登録の場合、姓名の頭文字が表示されます。顔写真見本のように撮影してください。また、背景は白、スーツ着用、身だしなみルールに沿って撮影をお願いいたします。
    </p>
    <!-- Select or drop image with Vuejs-->
    <div
      v-show="form.previewImage.facePhoto"
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${form.previewImage.facePhoto})` }"
    ></div>
    <div class="images_drop">
      <input
        @input="pickFile({ refEl: 'imgFace', setData: 'facePhoto' })"
        ref="imgFace"
        class="form-control form-control-sm"
        id="formFileSm"
        type="file"
      />

      <img src="../assets/images/upload.png" alt="" />
      <div class="mb-3"></div>
      <p>
        <span>ファイルをドラッグ&ドロップ</span> <br />
        ファイルをドロップするか、<br />
        ファイルを参照する
      </p>
    </div>
    <form-error :errors="v$.form.previewImage.facePhoto.$errors" />
  </div>

  <div class="form_group">
    <div class="form_title">本人確認書類</div>
    <div class="text_require">
      <p class="require">必須</p>
      <p class="help-text">運転免許証両面もしくは住民票を添付してください。</p>
    </div>
    <!-- Select or drop image with Vuejs-->
    <div
      v-show="form.previewImage.photoDocument"
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${form.previewImage.photoDocument})` }"
    ></div>
    <div class="images_drop">
      <input
        @input="
          pickFile({ refEl: 'verificationDocuments', setData: 'photoDocument' })
        "
        ref="verificationDocuments"
        class="form-control form-control-sm"
        id="formFileSm"
        type="file"
      />
      <img src="../assets/images/upload.png" alt="" />
      <div class="mb-3"></div>
      <p>
        <span>ファイルをドラッグ&ドロップ</span> <br />
        ファイルをドロップするか、<br />
        ファイルを参照する
      </p>
    </div>
  </div>

  <FormGroup>
    <template #title>基本情報登録</template>
    <template #infoText>
      外国式氏名が戸籍に記載されている場合、国際結婚により戸籍上の姓が外国式の姓となっている、もしくは重国籍で戸籍上の氏名が外国式の氏名となっている場合、戸籍上の綴りで入力してください。
    </template>
    <FormInput
      inputType="text"
      helpText="姓"
      placeholder="入力してください"
      v-model="form.lastnameMain"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="名"
      placeholder="入力してください"
      v-model="form.fistnameMain"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="セイ"
      placeholder="入力してください"
      v-model="form.seiMain"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="メイ"
      placeholder="入力してください"
      v-model="form.meiMain"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="姓（ローマ字）"
      placeholder="入力してください"
      v-model="form.lastnameRoMain"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="名（ローマ字）"
      placeholder="性別"
      v-model="form.fistnameRoMain"
    >
    </FormInput>
    <FormInput
      inputType="radio"
      helpText="性別"
      placeholder="入力してください"
      v-model="form.gender"
    >
    </FormInput>

    <FormBirth v-model="form.dmy"> </FormBirth>

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
  </FormGroup>

  <FormGroup>
    <template #title>最終学歴</template>
    <template #infoText>
      最終学歴が大学院の方は、大学を登録後に「＋学歴を追加する」から大学院を登録してください。
    </template>
    <div class="title">学歴1</div>
    <FormInput
      inputType="date"
      helpText="入学年月日"
      placeholder="入力してください"
      v-model="form.courseTime.start"
      width="160px"
    >
    </FormInput>
    <FormInput
      inputType="date"
      helpText="卒業年月日"
      placeholder="入力してください"
      v-model="form.courseTime.end"
      width="160px"
    >
    </FormInput>

    <div>
      <label for="educationBg">学歴区分</label>
      <br />
      <select
        class="form_input"
        name=""
        id="educationBg"
        v-model="form.educationBg"
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </div>
    <FormInput
      inputType="text"
      helpText="学校名"
      placeholder="入力してください"
      v-model="form.schoolName"
    >
    </FormInput>
    <div class="facultyName">
      <div>
        <p class="title">学部名</p>
        <input
          class="form_input"
          style="width: 100%; margin-top: 8px"
          type="text"
          v-model="form.facultyName"
        />
      </div>
    </div>

    <!-- Add thêm ngày nhập học -->
    <div v-if="form.isShowAddShool">
      <div class="title">学歴2</div>
      <div class="admission">
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">入学年月日</p>
        </div>
        <input type="date" v-model="form.courseTime2.start" />
      </div>
      <div class="admission">
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">卒業年月日</p>
        </div>
        <input type="date" v-model="form.courseTime2.end" />
      </div>

      <div>
        <div>
          <label for="educationBg2">学歴区分</label>
          <br />
          <select name="" id="educationBg2" v-model="form.educationBg2">
            <option value="">1</option>
            <option value="">2</option>
          </select>
        </div>
      </div>
      <div class="schoolName">
        <div>
          <div class="text_require">
            <p class="require">必須</p>
            <p class="help-text">学校名</p>
          </div>
          <input
            class="input-search"
            style="width: 100%"
            type="text"
            v-model="form.schoolName2"
          />
        </div>
      </div>
      <div class="facultyName">
        <div>
          <p class="title">学部名</p>
          <input
            style="width: 100%; margin-top: 8px"
            type="text"
            v-model="form.facultyName2"
          />
        </div>
      </div>
    </div>

    <a
      v-show="!form.isShowAddShool"
      @click.prevent="this.form.isShowAddShool = true"
      href="#"
      class="extensionLink"
      ><span>+ </span> 学歴を追加する</a
    >
  </FormGroup>
  <div class="form_group">
    <div class="form_title">保険年金</div>
    <div class="basicPension">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">基礎年金番号</p>
      </div>
      <input
        class="form_input"
        type="number"
        placeholder="入力してください"
        name=""
        v-model="form.basicPension"
      />
    </div>
    <div class="insuranceNumber">
      <div class="form_title">基礎年金番号</div>

      <p class="title_guide">番号をお持ちの方は必ず入力してください</p>
      <input
        class="form_input"
        type="number"
        placeholder="入力してください"
        name=""
        v-model="form.insuranceNumber"
      />
    </div>
    <div class="oldCompanyName">
      <div class="form_title">前職会社名</div>

      <p class="title_guide">雇用保険番号が不明の場合は入力をしてください</p>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        name=""
        v-model="form.oldCompanyName"
      />
    </div>
    <div style="margin-bottom: 6px">
      <div class="form_title">資格証明書類（年金手帳）</div>
      <p class="help-text">年金手帳の写真を添付してください</p>
      <!-- Select or drop image with Vuejs-->
      <div
        v-show="form.previewImage.pensionBookPhoto"
        class="imagePreviewWrapper"
        :style="{
          'background-image': `url(${form.previewImage.pensionBookPhoto})`,
        }"
      ></div>
      <div class="images_drop">
        <input
          @input="
            pickFile({
              refEl: 'pensionBook',
              setData: 'pensionBookPhoto',
            })
          "
          ref="pensionBook"
          class="form-control form-control-sm"
          id="formFileSm"
          type="file"
        />
        <img src="../assets/images/upload.png" alt="" />
        <div class="mb-3"></div>
        <p>
          <span>ファイルをドラッグ&ドロップ</span> <br />
          ファイルをドロップするか、<br />
          ファイルを参照する
        </p>
      </div>
    </div>
    <div style="margin-bottom: 6px">
      <div class="form_title">資格署名書類（雇用保険被保険者証）</div>
      <p class="help-text">雇用保険被保険者証の写真を添付してください</p>
      <!-- Select or drop image with Vuejs-->
      <div
        v-show="form.previewImage.identificationPhoto"
        class="imagePreviewWrapper"
        :style="{
          'background-image': `url(${form.previewImage.identificationPhoto})`,
        }"
      ></div>
      <div class="images_drop">
        <input
          @input="
            pickFile({
              refEl: 'identification',
              setData: 'identificationPhoto',
            })
          "
          ref="identification"
          class="form-control form-control-sm"
          id="formFileSm"
          type="file"
        />
        <img src="../assets/images/upload.png" alt="" />
        <div class="mb-3"></div>
        <p>
          <span>ファイルをドラッグ&ドロップ</span> <br />
          ファイルをドロップするか、<br />
          ファイルを参照する
        </p>
      </div>
    </div>
    <div class="radio_button" style="margin-bottom: 0">
      <div class="radio_button-1">
        <input type="radio" id="male" value="希望する" v-model="form.picked" />
        <label for="希望する">希望する</label>
      </div>
      <div class="radio_button-2">
        <input
          type="radio"
          id="female"
          value="利用しない"
          v-model="form.picked"
        />
        <label for="利用しない">利用しない</label>
      </div>
    </div>
  </div>
  <div class="form_group">
    <div class="form_title">給与振込口座</div>

    <div class="search">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">金融機関をフリーワードで検索</p>
      </div>
      <p style="margin-bottom: 8px">
        ｢とうきょう｣や｢しんよう｣などの一単語のみで検索できます
      </p>
      <input
        class="input-search"
        type="text"
        style="width: 100%"
        placeholder="フリーワードで検索できます"
        v-model="form.searchForFinancial"
      />
    </div>

    <div class="search">
      <div class="text_require">
        <p class="require" :class="{ noActive: !form.searchForFinancial }">
          必須
        </p>
        <p
          class="help-text"
          :class="{ filed_noActive: !form.searchForFinancial }"
        >
          支店名をフリーワードで検索
        </p>
      </div>
      <p style="margin-bottom: 8px" class="filed_noActive">
        ｢とうきょう｣や｢しんよう｣などの一単語のみで検索できます
      </p>
      <input
        class="input-search filed_noActive"
        type="text"
        style="width: 100%"
        placeholder="フリーワードで検索できます"
        v-model="form.searchForFinancial1"
      />
    </div>

    <div class="form_title" style="margin-top: 12px">口座預金科目</div>
    <div class="form_title" style="margin-bottom;:12px">普通</div>
    <div class="accountNumber">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">口座番号（半角）</p>
      </div>
      <p style="margin-bottom: 8px">
        ｢とうきょう｣や｢しんよう｣などの一単語のみで検索できます
      </p>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.accountNumber"
      />
    </div>
    <div class="accountName">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">口座名義（カタカナ）</p>
      </div>
      <p>本人名義に限ります</p>
      <p style="margin-bottom: 8px">
        ｢とうきょう｣や｢しんよう｣などの一単語のみで検索できます
      </p>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.accountName"
      />
    </div>
  </div>

  <div class="form_group">
    <div class="form_title">在留カード（外国籍の方はご記入ください）</div>
    <div class="white_content">
      <label class="label-checkbox" for="foreigner"
        ><input
          type="checkbox"
          id="foreigner"
          v-model="form.isForeigner"
          style="margin-right: 8px"
        />
        <img
          class="item--unchecked"
          src="../assets/images/unchecked.png"
          alt="unchecked"
        />
        <img
          class="item--checked"
          src="../assets/images/checked.png"
          alt="checked"
        />
        <span>外国籍の方はチェックを入れてください</span>
      </label>
    </div>

    <div class="lastNameForeRo">
      <div class="text_require">
        <p class="require" :class="[{ noActive: !form.isForeigner }]">必須</p>
        <p class="help-text" :class="{ filed_noActive: !form.isForeigner }">
          口座番号（半角）
        </p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.lastNameForeRo"
        :disabled="!form.isForeigner"
      />
    </div>
    <div class="nameFore">
      <div class="text_require">
        <p class="require" :class="[{ noActive: !form.isForeigner }]">必須</p>
        <p class="help-text" :class="{ filed_noActive: !form.isForeigner }">
          口座番号（半角）
        </p>
      </div>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.nameFore"
        :disabled="!form.isForeigner"
      />
    </div>
    <div class="lastNameForeKana">
      <div class="text_require">
        <p class="require" :class="[{ noActive: !form.isForeigner }]">必須</p>
        <p class="help-text" :class="{ filed_noActive: !form.isForeigner }">
          姓（カナ）
        </p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.lastNameForeKana"
        :disabled="!form.isForeigner"
      />
    </div>
    <div class="nameForeKana">
      <div class="text_require">
        <p class="require" :class="[{ noActive: !form.isForeigner }]">必須</p>
        <p class="help-text" :class="{ filed_noActive: !form.isForeigner }">
          口座番号（半角）
        </p>
      </div>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.nameForeKana"
        :disabled="!form.isForeigner"
      />
    </div>
    <div class="nationality">
      <div class="text_require">
        <p class="require" :class="[{ noActive: !form.isForeigner }]">必須</p>
        <p class="help-text" :class="{ filed_noActive: !form.isForeigner }">
          国籍
        </p>
      </div>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.nationality"
        :disabled="!form.isForeigner"
      />
    </div>
    <div class="residence">
      <div class="field-name" :class="{ filed_noActive: !form.isForeigner }">
        在留資格
      </div>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.residence"
        :disabled="!form.isForeigner"
      />
    </div>
    <div class="residenceTime">
      <div class="field-name" :class="{ filed_noActive: !form.isForeigner }">
        在留期間（満了日）
      </div>
      <input
        type="date"
        :class="{ filed_noActive: !form.isForeigner }"
        v-model="form.residenceTime"
        :disabled="!form.isForeigner"
        style="
          height: 48px;
          width: 160px;
          border: 1px solid #dcdcdc;
          border-radius: 2px;
          padding: 8px;
        "
      />
    </div>
    <div class="licensesBeyond">
      <div class="field-name" :class="{ filed_noActive: !form.isForeigner }">
        資格外活動許可
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.licensesBeyond"
        :disabled="!form.isForeigner"
      />
    </div>
    <div class="typeofWork">
      <div class="field-name" :class="{ filed_noActive: !form.isForeigner }">
        就労区分
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.typeofWork"
        :disabled="!form.isForeigner"
      />
    </div>
    <div class="residenceCardnumber">
      <div class="text_require">
        <p class="require" :class="[{ noActive: !form.isForeigner }]">必須</p>
        <p class="help-text" :class="{ filed_noActive: !form.isForeigner }">
          在留カード番号（半角）
        </p>
      </div>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        placeholder="入力してください"
        v-model="form.residenceCardnumber"
        :disabled="!form.isForeigner"
      />
    </div>
    <div style="margin-bottom: 6px" class="residentCardPhoto-font">
      <div class="form_title" :class="{ filed_noActive: !form.isForeigner }">
        在留カードの写真（表）
      </div>
      <p class="help-text" :class="{ filed_noActive: !form.isForeigner }">
        カードの表の写真を添付してください。
      </p>
      <!-- Select or drop image with Vuejs-->
      <div
        v-show="form.previewImage.residentCardPhotoFont"
        class="imagePreviewWrapper"
        :style="{
          'background-image': `url(${form.previewImage.residentCardPhotoFont})`,
        }"
      ></div>
      <div class="images_drop">
        <input
          @input="
            pickFile({
              refEl: 'imgResidentFont',
              setData: 'residentCardPhotoFont',
            })
          "
          ref="imgResidentFont"
          class="form-control form-control-sm"
          id="formFileSm"
          type="file"
          :disabled="!form.isForeigner"
        />

        <img src="../assets/images/upload.png" alt="" />
        <div class="mb-3"></div>
        <p>
          <span>ファイルをドラッグ&ドロップ</span> <br />
          ファイルをドロップするか、<br />
          ファイルを参照する
        </p>
      </div>
    </div>

    <div style="margin-bottom: 6px" class="residentCardPhoto-back">
      <div class="form_title" :class="{ filed_noActive: !form.isForeigner }">
        在留カードの写真（裏）
      </div>
      <p class="help-text" :class="{ filed_noActive: !form.isForeigner }">
        カードの裏の写真を添付してください。
      </p>
      <!-- Select or drop image with Vuejs-->
      <div
        v-show="form.previewImage.residentCardPhotoBack"
        class="imagePreviewWrapper"
        :style="{
          'background-image': `url(${form.previewImage.residentCardPhotoBack})`,
        }"
      ></div>
      <div class="images_drop">
        <input
          @input="
            pickFile({
              refEl: 'imgResidentBack',
              setData: 'residentCardPhotoBack',
            })
          "
          ref="imgResidentBack"
          class="form-control form-control-sm"
          id="formFileSm"
          type="file"
          :disabled="!form.isForeigner"
        />

        <img src="../assets/images/upload.png" alt="" />
        <div class="mb-3"></div>
        <p>
          <span>ファイルをドラッグ&ドロップ</span> <br />
          ファイルをドロップするか、<br />
          ファイルを参照する
        </p>
      </div>
    </div>
  </div>

  <div class="form_group">
    <div class="form_title">現住所を登録</div>

    <div class="householdDivision">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">世帯主区分</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.householdDivision"
      />
    </div>
    <div class="housingClassification">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">住居区分</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.housingClassification"
      />
    </div>
    <div class="zipCode">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">郵便番号</p>
      </div>
      <div class="dateMY">
        <div>
          <input
            type="number"
            name="date"
            id="date"
            placeholder="西暦（半角"
            v-model="form.zipCode.zip1"
          /><span class="horizontal"></span>
        </div>
        <div>
          <input
            type="number"
            name="date"
            id="date"
            placeholder="西暦（半角"
            v-model="form.zipCode.zip2"
          />
        </div>
        <button>住所取得</button>
      </div>
    </div>
    <div class="provinceRela">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">都道府県</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.provinceRela"
      />
      <form-error :errors="v$.form.provinceRela.$errors" />
    </div>
    <div class="autonomousCityRela">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">市区町村</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.autonomousCityRela"
      />
      <form-error :errors="v$.form.autonomousCityRela.$errors" />
    </div>
    <div class="addressRela">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">番地</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.addressRela"
      />
      <form-error :errors="v$.form.addressRela.$errors" />
    </div>
    <div>
      <div class="field-name" style="font-weight: 400">建物名称・部屋番号</div>

      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.buildingNameroomNumberRela"
      />
      <form-error :errors="v$.form.buildingNameroomNumberRela.$errors" />
    </div>

    <div class="phoneNumber">
      <div class="text_require">
        <div class="requireother">
          <div class="requireother_outline">
            <p>どちらか</p>
          </div>
          <p class="require">必須</p>
        </div>
        <p class="help-text">電話番号（半角）</p>
      </div>
      <p style="margin-bottom: 8px; margin-top: -3px">
        自宅電話番号が無い場合、携帯電話番号のみ登録してください。
      </p>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.phoneNumberRela"
      />
      <form-error :errors="v$.form.phoneNumberRela.$errors" />
    </div>
    <div class="mobilePhoneNumber">
      <div class="text_require">
        <div class="requireother">
          <div class="requireother_outline">
            <p>どちらか</p>
          </div>
          <p class="require">必須</p>
        </div>
        <p class="help-text">携帯電話番号（半角）</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.mobilePhoneNumber"
      />
      <div href="#" class="extensionLink"><span>+ </span> 学歴を追加する</div>
    </div>
  </div>
  <div class="form_group">
    <div class="form_title">住民票記載の住所を登録</div>
    <div class="white_content">
      <input
        type="checkbox"
        id="foreigner"
        style="margin-right: 8px"
        v-model="form.arcChecked"
      /><label for="foreigner">現住所記載の住所と同じです</label>
    </div>
    <div class="zipCode">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">郵便番号</p>
      </div>
      <div class="dateMY">
        <div>
          <input
            type="number"
            name="date"
            id="date"
            placeholder="西暦（半角"
            v-model="form.zipCodeArc.zip1"
          /><span class="horizontal"></span>
        </div>
        <div>
          <input
            type="number"
            name="date"
            id="date"
            placeholder="西暦（半角"
            v-model="form.zipCodeArc.zip2"
          />
        </div>
        <button>住所取得</button>
      </div>
    </div>

    <div class="provinceArc">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">都道府県</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.provinceArc"
      />
    </div>
    <div class="autonomousCityArc">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">市区町村</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.autonomousCityArc"
      />
    </div>
    <div class="addressArc">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">番地</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.addressArc"
      />
    </div>

    <div>
      <div class="field-name" style="font-weight: 400">建物名称・部屋番号</div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.buildingNameroomNumberArc"
      />
    </div>
  </div>
  <!-- 緊急連絡先を登録 đăng ký liên hệ khẩn cấp -->
  <div class="form_group">
    <div class="form_title">緊急連絡先を登録</div>
    <p style="margin-bottom: 5px">
      記入優先順位 <br />
      ①一親等：実父母、義父母、別居の兄弟姉妹、配偶者、子<br />
      ②一親等の者の勤務先<br />
      ③二親等：別居の実祖父母、義祖父母<br />
      ④三親等：別居の叔父叔母、甥、姪。配偶者の兄弟姉妹<br />
      ⑤知人、友人等
    </p>
    <div class="help-text">緊急連絡先1</div>

    <div class="lastnameRelationship">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">関係姓</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.lastnameRelationship"
      />
    </div>
    <div class="lastNameRela">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">姓</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.lastNameRela"
      />
    </div>
    <div class="fistNameRela">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">名</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.fistNameRela"
      />
    </div>
    <div class="surename">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">セイ</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.surename"
      />
    </div>
    <div class="nameMei">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">メイ</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.nameMei"
      />
    </div>
    <div class="zipCode">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">郵便番号</p>
      </div>
      <div class="dateMY">
        <div>
          <input
            type="number"
            name="date"
            id="date"
            placeholder="半角"
            v-model="form.zipCodeRela.zip1"
          /><span class="horizontal"></span>
        </div>
        <div>
          <input
            type="number"
            name="date"
            id="date"
            placeholder="半角"
            v-model="form.zipCodeRela.zip2"
          />
        </div>
        <button>住所取得</button>
      </div>
    </div>
    <div class="province">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">都道府県</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.province"
      />
    </div>
    <div class="autonomousCity">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">市区町村</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.autonomousCity"
      />
    </div>
    <div class="address">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">番地</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.address"
      />
    </div>
    <div>
      <div class="field-name" style="font-weight: 400">建物名称・部屋番号</div>

      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.buildingNameroomNumber"
      />
    </div>

    <div class="phoneNumber">
      <div class="text_require">
        <div class="requireother">
          <div class="requireother_outline">
            <p>どちらか</p>
          </div>
          <p class="require">必須</p>
        </div>
        <p class="help-text">電話番号（半角）</p>
      </div>
      <p style="margin-bottom: 8px; margin-top: -3px">
        自宅電話番号が無い場合、携帯電話番号のみ登録してください。
      </p>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        v-model="form.phoneNumber"
      />
      <form-error :errors="v$.form.phoneNumber.$errors" />
    </div>

    <div class="mobilePhoneNumber">
      <div class="text_require">
        <div class="requireother">
          <div class="requireother_outline">
            <p>どちらか</p>
          </div>
          <p class="require">必須</p>
        </div>
        <p class="help-text">携帯電話番号（半角）</p>
      </div>
      <input
        class="form_input"
        type="number"
        style="width: 100%"
        v-model="form.mobilePhoneNumberRela"
      />
      <form-error :errors="v$.form.mobilePhoneNumberRela.$errors" />
    </div>
  </div>
  <!-- 家族情報を登録 đăng ký thông tin gia đình -->
  <div class="form_group">
    <div class="form_title">家族情報を登録</div>
    <p style="margin-bottom: 5px">
      一等親以内は同居/別居に関わらず記入<br />
      二親等以上は同居、もしくは扶養義務がある場合に限り記載
    </p>
    <div class="help-text">家族情報1</div>

    <div class="relationship">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">続柄</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.relationship"
      />
    </div>
    <div class="lastNameRela2">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">姓</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.lastNameRela2"
      />
    </div>
    <div class="fistNameRela2">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">名</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.fistNameRela2"
      />
    </div>
    <div class="surename2">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">セイ</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.surename2"
      />
    </div>
    <div class="nameMei2">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">メイ</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.nameMei2"
      />
    </div>
    <div class="gender">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">性別</p>
      </div>

      <div class="radio_button">
        <div class="radio_button-1">
          <input
            type="radio"
            id="male2"
            value="Male"
            v-model="form.genderRela"
          />
          <label for="male2">男性</label>
        </div>
        <div class="radio_button-2">
          <input
            type="radio"
            id="female2"
            value="Female"
            v-model="form.genderRela"
          />
          <label for="female2">女性</label>
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
            v-model="form.dmy2.date"
            placeholder="西暦（半角"
          />
          <span>年</span>
        </div>
        <div>
          <input
            type="text"
            name="date"
            id="date"
            v-model="form.dmy2.month"
            placeholder="西暦（半角"
          />
          <span>月</span>
        </div>
        <div>
          <input
            type="text"
            name="date"
            id="date"
            v-model="form.dmy2.year"
            placeholder="半角"
          />
          <span>日</span>
        </div>
      </div>
    </div>
    <div class="field-name" style="font-weight: 400">年齢</div>

    <p style="margin-bottom: 5px">生年月日を入力すると表示されます</p>
    <div class="zipCode">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">郵便番号</p>
      </div>
      <div class="dateMY">
        <div>
          <input
            type="number"
            name="date"
            id="date"
            placeholder="半角"
            v-model="form.zipCodeRela2.zip1"
          /><span class="horizontal"></span>
        </div>
        <div>
          <input
            type="number"
            name="date"
            id="date"
            placeholder="半角"
            v-model="form.zipCodeRela2.zip2"
          />
        </div>
        <button>住所取得</button>
      </div>
    </div>
    <div class="provinceRela2">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">都道府県</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.provinceRela2"
      />
    </div>
    <div class="autonomousCity2">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">市区町村</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.autonomousCity2"
      />
    </div>
    <div class="addressRela2">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">番地</p>
      </div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.addressRela2"
      />
    </div>

    <div>
      <div class="field-name" style="font-weight: 400">建物名称・部屋番号</div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.buildingNameroomNumber2"
      />
    </div>

    <div>
      <div class="field-name" style="font-weight: 400">勤務先・学校名</div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.workOrSchoolName"
      />
    </div>
    <div>
      <div class="field-name" style="font-weight: 400">職業区分</div>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.occupationClassification"
      />
    </div>
    <div>
      <div class="field-name" style="font-weight: 400">
        職業区分でその他を選択の理由
      </div>

      <p style="margin-bottom: 5px">
        その他を選択した方は、詳細内容を入力してください。学生を選択した方は、大学<br />
        ○年生など、具体的に入力をお願いいたします。
      </p>
      <input
        class="form_input"
        type="text"
        style="width: 100%"
        v-model="form.reasonsChoseJob"
      />
    </div>
    <div>
      <div class="field-name" style="font-weight: 400">健康保険扶養区分</div>
      <input
        class="form_input"
        type="text"
        placeholder="選択してください"
        style="width: 100%"
        v-model="form.healthInsuranceClassification"
      />
    </div>

    <a href="" class="extensionLink"><span>+ </span> 学歴を追加する</a>
  </div>
  <div class="form_group">
    <div class="form_title">通勤ルート</div>
    <p class="help-text">
      経路が２つ以上ある場合は、運賃の安い方を選択してください。<br />
      片道料金はICカード料金ではなく現金（切符）料金となります。
    </p>
    <div class="field-name" style="font-weight: 400">通勤手段1</div>

    <div class="commutingMeans">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">通勤手段</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        v-model="form.going"
      />
    </div>
    <div class="departure">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">出発地</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        name="noName"
        v-model="form.departure"
      />
    </div>
    <div class="destination">
      <div class="text_require">
        <p class="require">必須</p>
        <p class="help-text">到着地</p>
      </div>
      <input
        class="form_input"
        type="text"
        placeholder="入力してください"
        name="lastName"
        v-model="form.destination"
      />
      <a
        @click.prevent="form.isMethodWork = true"
        style="margin-bottom: 8px"
        href=""
        class="extensionLink"
        ><span>+ </span> 通勤方法を追加する</a
      >
    </div>
    <div v-if="form.isMethodWork">
      <div style="margin-bottom: 6px" v-if="form.isMethodWork">
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">ルートの地図添付</p>
        </div>
        <div
          v-show="form.previewImage.routeMapPhoto"
          class="imagePreviewWrapper"
          :style="{
            'background-image': `url(${form.previewImage.routeMapPhoto})`,
            'margin-bottom': '12px',
          }"
        ></div>
        <div class="images_drop" style="margin-top: 0px">
          <input
            @input="
              pickFile({
                refEl: 'routeMap',
                setData: 'routeMapPhoto',
              })
            "
            ref="routeMap"
            class="form-control form-control-sm"
            id="formFileSm"
            type="file"
          />
          <img src="../assets/images/upload.png" alt="" />
          <div class="mb-3"></div>
          <p>
            <span>ファイルをドラッグ&ドロップ</span> <br />
            ファイルをドロップするか、<br />
            ファイルを参照する
          </p>
        </div>
      </div>
      <div>
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">距離（無料優先）</p>
        </div>
        <div class="haflInput">
          <input
            class="form_input"
            type="text"
            placeholder="選択してください"
            style="width: 146px"
            v-model="form.distance"
          />
          <p>km</p>
        </div>
      </div>

      <div>
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">所要時間（無料優先）</p>
        </div>
        <div class="haflInput">
          <input
            class="form_input"
            type="text"
            placeholder="選択してください"
            style="width: 146px"
            v-model="form.timeRequired"
          />
          <p>分</p>
        </div>
      </div>

      <div>
        <p class="field-name">距離（高速優先）</p>
        <div class="haflInput">
          <input
            class="form_input"
            type="text"
            placeholder="選択してください"
            style="width: 146px"
            v-model="form.distance2"
          />
          <p>Km</p>
        </div>
      </div>
      <div>
        <p class="field-name">時間（高速優先）</p>
        <div class="haflInput">
          <input
            class="form_input"
            type="text"
            placeholder="選択してください"
            style="width: 146px"
            v-model="form.timeSpeedHight"
          />
          <p>分</p>
        </div>
      </div>
      <div>
        <p class="field-name">高速料金</p>
        <div class="haflInput">
          <input
            class="form_input"
            type="text"
            placeholder="選択してください"
            style="width: 146px"
            v-model="form.hightSpeed"
          />
          <p>円</p>
        </div>
      </div>

      <div style="font-size: 13.5px; color: #666666; margin-top: 10px">
        <span style="font-weight: 700">通勤費/実費：</span>
        <span
          >生通勤の際に自家用車を利用する場合は、単価金額が自動表示されます</span
        >
      </div>
      <div class="white_content">
        <input
          type="checkbox"
          id="foreigner"
          style="margin-right: 8px"
          v-model="form.reasonHightway"
        /><label for="foreigner">外国籍の方はチェックを入れてください</label>
      </div>
      <div>
        <div class="text_require">
          <p class="require" :class="[{ noActive: !form.reasonHightway }]">
            必須
          </p>
          <p
            class="help-text"
            :class="{ filed_noActive: !form.reasonHightway }"
          >
            口座番号（半角）
          </p>
        </div>
        <textarea v-model="form.reasonHightwaytext"></textarea>
      </div>
      <div class="mt-5">
        <div class="form-field">通勤手段2</div>
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">通勤手段</p>
        </div>
        <input type="text" class="form_input" v-model="form.publicTransport" />
      </div>
      <div>
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">出発地</p>
        </div>
        <input type="text" class="form_input" v-model="form.departurePublic" />
      </div>
      <div>
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">到着地</p>
        </div>
        <input
          type="text"
          class="form_input"
          v-model="form.destinationPublic"
        />
      </div>
      <div>
        <div class="form-field">経由1</div>
        <div class="upAndDown">
          <input
            type="text"
            class="form_input"
            v-model="form.publicTransport"
          />
          <img src="../assets/images/increase.png" alt="" />
          <img src="../assets/images/decrease.png" alt="" />
        </div>
      </div>
      <button
        class="button-agrre"
        style="background-color: #dcdcdc; color: #ffffff; font-size: 16px"
        @click.prevent="handleSubumit"
        type="submit"
      >
        入社手続きの入力に進む
      </button>
      <div>
        <div class="white_content">
          <div class="spaceBettwen">
            <p>テキストテキスト駅</p>
            <img src="../assets/images/ArrowsRight.png" alt="" />
            <p>テキストテキスト駅</p>
          </div>
        </div>
      </div>
      <div class="white_content">
        <p>対象ルートを表示しました</p>
        <div class="routes">
          <div class="col1 flex-item">
            <p>ルート １</p>
            <p>ルート 2</p>
            <p>ルート 3</p>
          </div>
          <div class="col2 flex-item">
            <p>35分</p>
            <p>31分</p>
            <p>30分</p>
          </div>
          <div class="col3 flex-item">
            <p>400円</p>
            <p>1,600円</p>
            <p>1,630円</p>
          </div>
          <div class="col4 flex-item">
            <p>24km</p>
            <p>23km</p>
            <p>22km</p>
          </div>
          <div class="col5 flex-item">
            <p>ルート １</p>
            <p>ルート 2</p>
            <p>ルート 3</p>
          </div>
          <div class="col6 flex-item">
            <a href="">ルートを見る</a>
            <a href="">ルートを見る</a>
            <a href="">ルートを見る</a>
          </div>
        </div>
      </div>
      <div class="form_title">ルート1が表示されています</div>
      <div class="white_content">
        <div style="display: flex; gap: 8px">
          <p
            style="
              border: 1px solid #45d1d1;
              font-size: 16px;
              width: 62px;
              height: 28px;
              color: #45d1d1;
              text-align: center;
              border-radius: 4px;
            "
          >
            JR
          </p>
          <p style="font-size: 16px">都営三田線</p>
        </div>
        <div class="displayRoute">
          <div class="displayRoute_arrow">
            <p>西台駅</p>
            <img src="../assets/images/ArrowsRight.png" alt="" />
            <p>芝公園駅</p>
          </div>
          <div class="displayRoute_info">
            <div>
              <p>１ヶ月</p>
              <p>9,220円</p>
            </div>
            <div>
              <p>3ヶ月</p>
              <p>26,26,290円</p>
            </div>
            <div>
              <p>6ヶ月</p>
              <p>9,44,260円</p>
            </div>
          </div>
        </div>
      </div>
      <div class="white_content">
        <div class="displayRoute">
          <div class="displayRoute_arrow">
            <p>定期代合計</p>
          </div>
          <div class="displayRoute_info">
            <div>
              <p>１ヶ月</p>
              <p>9,220円</p>
            </div>
            <div>
              <p>3ヶ月</p>
              <p>26,26,290円</p>
            </div>
            <div>
              <p>6ヶ月</p>
              <p>9,44,260円</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="text_require">
          <p class="require">必須</p>
        </div>
        <div class="white_content">
          <input
            type="checkbox"
            id="travelExpenses"
            style="margin-right: 8px"
            v-model="travelExpenses"
          /><label for="travelExpenses">表示されている通勤代で固定する</label>
        </div>
      </div>
    </div>
    <!-- ssssssssssssssss -->
    <div class="white_content">合計交通費：0円</div>

    <div>
      <div class="field-name" style="font-weight: 400; margin-top: 32px">
        備考
      </div>
      <textarea v-model="form.comment" />
    </div>
  </div>

  <div class="form_group">
    <div class="form_title">自家用車通勤について</div>
    <div class="text_require">
      <p class="require">必須</p>
      <p class="help-text">自家用車の通勤許可を申請しますか？</p>
    </div>
    <!-- Select or drop image with Vuejs-->
    <div>
      <div class="radio_button" style="margin-bottom: 0px">
        <div class="radio_button-1">
          <input
            type="radio"
            id="car1"
            value="yes"
            v-model="form.isCarCheck"
          /><label for="car1">はい</label>
        </div>
        <div class="radio_button-2">
          <input
            type="radio"
            id="car2"
            value="no"
            v-model="form.isCarCheck"
          /><label for="car2">いいえ</label>
        </div>
      </div>
      <div v-if="form.isCarCheck === 'yes'">
        <div class="reasonForApplication">
          <div class="text_require">
            <p class="require">必須</p>
            <p class="help-text">出発地</p>
          </div>
          <div class="text-important">
            ※その他を選択した場合は、必ず理由を入力してください
          </div>
          <input
            class="form_input"
            type="text"
            placeholder="テキスト"
            name="noName"
            v-model="forreasonForApplication"
          />
        </div>
        <div class="nameFore">
          <div class="text_require">
            <p class="require noActive">必須</p>
            <p class="help-text filed_noActive">
              申請事由（その他）を選択した場合は理由を入力してください
            </p>
          </div>
          <textarea style="height: 101px" v-model="form.otherReason" />
        </div>
        <div class="commuterVehicle">
          <div class="text_require">
            <p class="require">必須</p>
            <p class="help-text">通勤車両</p>
          </div>
          <input
            class="form_input"
            type="text"
            placeholder="テキスト"
            name="noName"
            v-model="form.commuterVehicle"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="form_group">
    <div class="form_title">自家用車の業務使用許可について</div>
    <div class="text_require">
      <p class="require">必須</p>
      <p class="help-text">申請事由</p>
    </div>
    <!-- Select or drop image with Vuejs-->
    <div class="radio_button" style="margin-bottom: 0px">
      <div class="radio_button-1">
        <input
          type="radio"
          id="male"
          value="yes"
          v-model="form.isCarCheck2"
        /><label for="male">はい</label>
      </div>
      <div class="radio_button-2">
        <input
          type="radio"
          id="female"
          value="no"
          v-model="form.isCarCheck2"
        /><label for="female">いいえ</label>
      </div>
    </div>
    <div v-if="form.isCarCheck2 === 'yes'">
      <div class="reasonForApplication">
        <div class="text_require">
          <p class="require">必須</p>
          <p class="help-text">申請事由</p>
        </div>
        <div class="text-important">
          ※その他を選択した場合は、必ず理由を入力してください
        </div>
        <input
          class="form_input"
          type="text"
          placeholder="テキスト"
          name="noName"
          v-model="form.reasonForApplication"
        />
      </div>
      <div class="nameFore">
        <div class="text_require">
          <p class="require noActive">必須</p>
          <p class="help-text filed_noActive">
            申請事由（その他）を選択した場合は理由を入力してください
          </p>
        </div>
        <textarea style="height: 101px" v-model="form.otherReason2" />
      </div>
      <div>
        <div class="field-name" style="font-weight: 700">補足</div>
        <p style="margin-bottom: 5px; font-size: 14px">
          運転免許証（両面）のコピーを添付してください
        </p>
        <input
          class="form_input"
          type="text"
          style="width: 100%"
          v-model="form.supplement"
        />
      </div>
      <div>
        <div class="field-name" style="font-weight: 700">車両車検証コピー</div>
        <p style="margin-bottom: 5px; font-size: 14px">
          高速道路は原則利用不可。上長が認めた場合にかぎり利用路線の出発IC、到着IC、<br />
          高速料金を必ず記入してください。
        </p>
        <input
          class="form_input"
          type="text"
          style="width: 100%"
          v-model="form.vehicleVerification"
        />
        <div
          v-show="form.previewImage.vehicleVerificationPhoto"
          class="imagePreviewWrapper"
          :style="{
            'background-image': `url(${form.previewImage.vehicleVerificationPhoto})`,
          }"
        ></div>
        <div class="images_drop">
          <input
            @input="
              pickFile({
                refEl: 'vehicleVerification',
                setData: 'vehicleVerificationPhoto',
              })
            "
            ref="vehicleVerification"
            class="form-control form-control-sm"
            id="formFileSm"
            type="file"
          />

          <img src="../assets/images/upload.png" alt="" />
          <div class="mb-3"></div>
          <p>
            <span>ファイルをドラッグ&ドロップ</span> <br />
            ファイルをドロップするか、<br />
            ファイルを参照する
          </p>
        </div>
      </div>
      <div>
        <div class="field-name" style="font-weight: 700">
          任意保険の保険証コピー
        </div>
        <p style="margin-bottom: 5px; font-size: 14px">
          任意保険の保険証のコピーを添付してください
        </p>
        <div
          v-show="form.previewImage.driversLicenseFontPhoto"
          class="imagePreviewWrapper"
          :style="{
            'background-image': `url(${form.previewImage.driversLicenseFontPhoto})`,
          }"
        ></div>
        <div class="images_drop">
          <input
            @input="
              pickFile({
                refEl: 'driversLicenseFont',
                setData: 'driversLicenseFontPhoto',
              })
            "
            ref="driversLicenseFont"
            class="form-control form-control-sm"
            id="formFileSm"
            type="file"
          />

          <img src="../assets/images/upload.png" alt="" />
          <div class="mb-3"></div>
          <p>
            <span>ファイルをドラッグ&ドロップ</span> <br />
            ファイルをドロップするか、<br />
            ファイルを参照する
          </p>
        </div>
      </div>
      <div>
        <div class="field-name" style="font-weight: 700">
          運転免許証（両面）コピー
        </div>
        <p style="margin-bottom: 5px; font-size: 14px">
          任意保険の保険証のコピーを添付してください
        </p>
        <div
          v-show="form.previewImage.driversLicenseBackPhoto"
          class="imagePreviewWrapper"
          :style="{
            'background-image': `url(${form.previewImage.driversLicenseBackPhoto})`,
          }"
        ></div>
        <div class="images_drop">
          <input
            @input="
              pickFile({
                refEl: 'driversLicenseBack',
                setData: 'driversLicenseBackPhoto',
              })
            "
            ref="driversLicenseBack"
            class="form-control form-control-sm"
            id="formFileSm"
            type="file"
          />

          <img src="../assets/images/upload.png" alt="" />
          <div class="mb-3"></div>
          <p>
            <span>ファイルをドラッグ&ドロップ</span> <br />
            ファイルをドロップするか、<br />
            ファイルを参照する
          </p>
        </div>
      </div>
    </div>
  </div>
  <p style="font-size: 14px; color: #666666; margin-top: 32px">
    入力ありがとうございました。<br />
    続けて扶養控除申告の入力をお願いいたします。
  </p>
  <!-- submit form -->
  <button class="button-agrre" @click.prevent="handleSubumit" type="submit">
    入社手続きの入力に進む
  </button>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FormError from "./FormError.vue";
import FormGroup from "./FieldForm/FormGroup.vue";
import FormInput from "./FieldForm/FormInput.vue";
import FormBirth from "./FieldForm/FormBirth.vue";

export default {
  components: {
    FormError,
    FormGroup,
    FormInput,
    FormBirth,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      form: {
        reasonHightway: false,
        isMethodWork: false,
        isShowRoute: false,
        isShowAddShool: false,
        previewImage: {
          facePhoto: null,
          photoDocument: null,
          pensionBookPhoto: null,
          identificationPhoto: null,
          residentCardPhotoBack: null,
          residentCardPhotoFont: null,
          routeMapPhoto: null,
        },
        lastnameMain: "",
        fistnameMain: "",
        seiMain: "",
        meiMain: "",
        lastnameRoMain: "",
        fistnameRoMain: "",
        companyName: "",
        picked: [],
        searchForFinancial: null,
        searchForFinancial1: "",
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
        courseTime2: {
          start: "",
          end: "",
        },
        educationBg: "",
        schoolName: "",
        facultyName: "",
        basicPension: "",
        educationBg2: "",
        schoolName2: "",
        facultyName2: "",
        insuranceNumber: null,
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
        relationship: "",
        lastNameRela2: "",
        fistNameRela2: "",
        surename2: "",
        nameMei2: "",
        genderRela: "",
        //
        provinceRela2: "",
        autonomousCity2: "",
        addressRela2: "",
        buildingNameroomNumber2: "",
        workOrSchoolName: "",
        occupationClassification: "",
        reasonsChoseJob: "",
        healthInsuranceClassification: "",
        annualIncome: "",
        going: "",
        departure: "",
        destination: "",
        comment: "",
        //
        isCarCheck: null,
        isCarCheck2: null,
        forreasonForApplication: "",
        otherReason: "",
        commuterVehicle: "",
      },
    };
  },

  validations() {
    return {
      form: {
        previewImage: {
          facePhoto: { required },
        },
        provinceRela: { required },
        phoneNumber: { required },
        autonomousCityRela: { required },
        addressRela: { required },
        buildingNameroomNumberRela: { required },
        phoneNumberRela: { required },
        mobilePhoneNumberRela: { required },
      },
    };
  },

  methods: {
    pickFile(payload) {
      let input = this.$refs[payload.refEl];
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.form.previewImage[payload.setData] = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },

    async handleSubumit() {
      // await this.v$.$validate();
      const isValid = await this.v$.$validate();
      if (this.dataVuex && isValid) {
        this.$store.dispatch("setInfomation", { data: this.form, step: 3 });
        this.$router.push("/form3");
      } else {
        alert("chưa nhập đủ các field");
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  computed: {
    dataVuex() {
      return this.$store.state.data;
    },
    isValid() {
      return async () => {
        return await this.v$.$validate();
      };
    },
  },
  created() {
    this.scrollToTop();
    this.$store.dispatch("setStep", 2);
    if (this.dataVuex.provinceRela) {
      this.form = this.dataVuex;
    }
  },
};
</script>
<style scope lang="scss">
::placeholder {
  color: #9999;
}
p {
  margin: 0;
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
  textarea {
    border: none;
    background-color: white;
    resize: none;
    outline: none;
    width: 522px;
    height: 150px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
  }
  .text-important {
    color: #ed5d5d;
    font-weight: 400;
    font-size: 14px;
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
    color: #333333 !important;
    margin-bottom: 8px;
    font-size: 14px;
  }
  .title_guide {
    margin-bottom: 8px;
  }
  .routes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .flex-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
  .haflInput {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .upAndDown {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .extensionLink {
    text-decoration: none;
    color: #007bc3;
    margin-top: 8px;
    display: block;
  }
  .spaceBettwen {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    p {
      margin: 0;
      font-weight: 700;
    }
  }
  .text_require {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    .help-text {
      flex: 1;
      color: #333333;
      font-size: 14px;
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
    padding: 14px;
    width: 100%;
    margin-bottom: 5px;
    border-bottom: 5px;
  }

  .dateMY {
    display: flex;
    gap: 12px;
    margin-bottom: 5px;
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
    padding: 8px;
    padding: 0px 40px !important;
    height: 48px;
    border: 1px solid #dcdcdc;
    border-radius: 2px;

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
    input[type="radio"]:checked:after {
      width: 12px;
      height: 12px;
      border-radius: 15px;
      top: -4px;
      left: 1px;
      position: relative;
      background-color: #45d1c9;
      content: "";
      display: inline-block;
      visibility: visible;
      border: 2px solid white;
      outline: #45d1c9 solid 1px;
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
    padding: 18px 8px;
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
    .label-checkbox {
      margin-left: -10px;
      align-items: center;
      display: flex;
      gap: 8px;
    }
    input[type="checkbox"] {
      appearance: none;
    }
    input[type="checkbox"]:checked ~ .item--checked {
      display: block;
    }
    input[type="checkbox"]:checked ~ .item--unchecked {
      display: none;
    }
    .item--checked {
      display: none;
    }
    .displayRoute {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      &_arrow {
        display: flex;
        gap: 9px;
        p {
          font-weight: 700;
        }
      }
      &_info {
        display: flex;
        gap: 30px;
        p {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        p:last-child {
          font-weight: 700;
        }
      }
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
    color: #dcdcdc !important;
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
  padding: 14px 8px;
  background: #b2b1ff;
  cursor: pointer;
}
</style>
