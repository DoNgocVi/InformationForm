<template>
  <FormGroup>
    <template #title>本人確認書類</template>
    <!-- Select or drop image with Vuejs-->
    <DropImages
      @inputData="updateImage"
      :isShow="form.previewImage.facePhoto"
      :linkImage="form.previewImage.facePhoto"
      refEl="imgFace"
      setData="facePhoto"
    >
    </DropImages>
    <form-error :errors="v$.form.previewImage.facePhoto.$errors" />
  </FormGroup>

  <FormGroup>
    <template #title>{{
      $t("title.identity_verification_documents")
    }}</template>
    <template #infoText>
      {{ $t("desc.identity_verification_documents_desc") }}
    </template>
    <FormInput
      v-for="(item, index) in formGr1"
      :key="index"
      :helpText="item.helpText"
      inputType="text"
      v-model="form[item.key]"
    ></FormInput>
    <FormInput
      inputType="radio"
      mainTitle="性別"
      v-model="form.gender"
      :valueRadio="{ value1: '男性', value2: '女性' }"
    >
    </FormInput>

    <CustomForm helpText="生年月日">
      <FormInput
        inputType="number"
        :isRequire="false"
        width="116px"
        unit="年"
        v-model="form.dmy.date"
      >
      </FormInput>
      <FormInput
        inputType="number"
        :isRequire="false"
        width="116px"
        unit="月"
        v-model="form.dmy.month"
      >
      </FormInput>
      <FormInput
        inputType="number"
        :isRequire="false"
        width="116px"
        unit="日"
        v-model="form.dmy.year"
      >
      </FormInput>
    </CustomForm>
    <div class="display_info">
      <div class="display_date">
        <p>年齢</p>
        <p v-if="form.dmy.date">
          {{ `${form.dmy.date} - ${form.dmy.month} - ${form.dmy.year}` }}
        </p>
        <p v-else>生年月日を入力すると表示されます</p>
      </div>
      <FormInput
        inputType="text"
        mainTitle="ビジネスネーム"
        titleGuide=" 旧姓を利用する等の場合に入力をしてください"
        v-model="form.companyName"
        :isRequire="false"
      >
      </FormInput>
    </div>
  </FormGroup>

  <FormGroup>
    <template #title>{{ $t("title.final_education") }}</template>
    <template #infoText>
      {{ $t("desc.final_education_desc") }}
    </template>
    <div class="title">学歴1</div>
    <FormInput
      inputType="date"
      helpText="入学年月日"
      v-model="form.courseTime.start"
      width="160px"
    >
    </FormInput>
    <FormInput
      inputType="date"
      helpText="卒業年月日"
      v-model="form.courseTime.end"
      width="160px"
    >
    </FormInput>

    <FormInput
      inputType="select"
      titleGuide="学歴区分"
      :isRequire="false"
      v-model="form.educationBg"
      width="160px"
      :optionValue="{
        option1: '1',
        option2: '2',
      }"
    >
    </FormInput>
    <FormInputSearch
      class="search"
      inputType="text"
      helpText="学校名"
      v-model="form.schoolName"
    >
    </FormInputSearch>

    <FormInput
      inputType="text"
      helpText="学部名"
      v-model="form.facultyName"
      :isRequire="false"
    >
    </FormInput>

    <!-- Add thêm ngày nhập học -->
    <template v-if="form.isShowAddShool">
      <div class="title">学歴2</div>
      <FormInput
        inputType="date"
        helpText="入学年月日"
        v-model="form.courseTime2.start"
        width="160px"
      >
      </FormInput>
      <FormInput
        inputType="date"
        helpText="卒業年月日"
        v-model="form.courseTime2.end"
        width="160px"
      >
      </FormInput>
      <FormInput
        inputType="select"
        titleGuide="学歴区分"
        :isRequire="false"
        v-model="form.educationBg2"
        width="160px"
        :optionValue="{
          option1: '1',
          option2: '2',
        }"
      >
      </FormInput>

      <FormInput inputType="text" helpText="学校名" v-model="form.facultyName2">
      </FormInput>
    </template>

    <a
      v-show="!form.isShowAddShool"
      @click.prevent="this.form.isShowAddShool = true"
      href="#"
      class="extensionLink"
      ><span>+ </span> 学歴を追加する</a
    >
  </FormGroup>

  <FormGroup :isDocument="false">
    <template #title>{{ $t("title.insurance_pension") }}</template>
    <FormInput
      inputType="text"
      helpText="基礎年金番号"
      v-model="form.basicPension"
    >
    </FormInput>
    <FormInput
      inputType="text"
      mainTitle="雇用保険被保険者番号"
      titleGuide="番号をお持ちの方は必ず入力してください"
      v-model="form.insuranceNumber"
      :isRequire="false"
    >
    </FormInput>
    <FormInput
      inputType="text"
      mainTitle="前職会社名"
      titleGuide="雇用保険番号が不明の場合は入力をしてください"
      v-model="form.oldCompanyName"
      :isRequire="false"
    >
    </FormInput>

    <DropImages
      @inputData="updateImage"
      :isDisable="true"
      mainTitle="資格証明書類（年金手帳）"
      titleGuide="年金手帳の写真を添付してください"
      :linkImage="form.previewImage.pensionBookPhoto"
      refEl="pensionBook"
      setData="pensionBookPhoto"
    >
    </DropImages>
    <DropImages
      @inputData="updateImage"
      mainTitle="資格署名書類（雇用保険被保険者証）"
      titleGuide="雇用保険被保険者証の写真を添付してください"
      :linkImage="form.previewImage.identificationPhoto"
      refEl="identification"
      setData="identificationPhoto"
    >
    </DropImages>
    <FormInput
      inputType="radio"
      mainTitle="資格署名書類（雇用保険被保険者証）"
      v-model="form.picked"
      :valueRadio="{ value1: '希望する', value2: '利用しない' }"
    >
    </FormInput>
  </FormGroup>

  <FormGroup :isDocument="false">
    <template #title>{{ $t("title.salary_transfer_account") }}</template>
    <FormInputSearch
      class="search"
      inputType="text"
      helpText="基礎年金番号"
      titleGuide="｢とうきょう｣や｢しんよう｣などの一単語のみで検索できます"
      v-model="form.searchForFinancial"
    >
    </FormInputSearch>
    <FormInputSearch
      class="search"
      inputType="text"
      helpText="基礎年金番号"
      titleGuide="｢とうきょう｣や｢しんよう｣などの一単語のみで検索できます"
      v-model="form.searchForFinancial1"
      :isActive="form.searchForFinancial"
    >
    </FormInputSearch>

    <div class="help-text" style="margin-top: 12px">口座預金科目</div>
    <div class="help-text" style="margin-bottom;:12px">普通</div>

    <FormInput
      inputType="text"
      helpText="口座番号（半角）"
      v-model="form.accountNumber"
    >
    </FormInput>

    <FormInput
      inputType="text"
      helpText="口座名義（カタカナ）"
      v-model="form.accountName"
    >
    </FormInput>
  </FormGroup>

  <FormGroup>
    <template #title>{{ $t("title.residence_card") }}</template>
    <!-- last -->
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

    <FormInput
      v-for="(item, index) in formGr2"
      :key="index"
      :helpText="item.helpText"
      inputType="text"
      v-model="form[item.key]"
      :isForeigner="!form.isForeigner"
    ></FormInput>
    <FormInput
      v-for="(item, index) in formGr3"
      :key="index"
      :helpText="item.helpText"
      inputType="text"
      v-model="form[item.key]"
      :isRequire="false"
      :isForeigner="!form.isForeigner"
    ></FormInput>

    <DropImages
      @inputData="updateImage"
      mainTitle="在留カードの写真（表）"
      titleGuide="カードの表の写真を添付してください。"
      :linkImage="form.previewImage.residentCardPhotoFont"
      refEl="imgResidentFont"
      setData="residentCardPhotoFont"
      :isForeigner="!form.isForeigner"
    >
    </DropImages>

    <DropImages
      @inputData="updateImage"
      mainTitle="在留カードの写真（裏）"
      titleGuide="カードの裏の写真を添付してください。"
      :linkImage="form.previewImage.residentCardPhotoBack"
      refEl="imgResidentBack"
      setData="residentCardPhotoBack"
      :isForeigner="!form.isForeigner"
    >
    </DropImages>
  </FormGroup>

  <FormGroup :isDocument="false">
    <template #title> {{ $t("title.current_address") }} </template>
    <FormInput
      inputType="text"
      helpText="世帯主区分"
      v-model="form.householdDivision"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="住居区分"
      v-model="form.housingClassification"
    >
    </FormInput>

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
    <FormInput inputType="text" helpText="都道府県" v-model="form.provinceRela">
    </FormInput>
    <form-error :errors="v$.form.provinceRela.$errors" />
    <FormInput
      inputType="text"
      helpText="市区町村"
      v-model="form.autonomousCityRela"
    >
    </FormInput>
    <form-error :errors="v$.form.autonomousCityRela.$errors" />
    <FormInput inputType="text" helpText="番地" v-model="form.addressRela">
    </FormInput>
    <form-error :errors="v$.form.addressRela.$errors" />

    <FormInput
      inputType="text"
      helpText="建物名称・部屋番号"
      v-model="form.buildingNameRoomNumberRela"
      :isRequire="false"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="電話番号（半角）"
      :require2="true"
      titleGuide="自宅電話番号が無い場合、携帯電話番号のみ登録してください。"
      v-model="form.phoneNumber1"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="携帯電話番号（半角）"
      :require2="true"
      v-model="form.mobilePhoneNumber"
    >
    </FormInput>
  </FormGroup>

  <FormGroup>
    <template #title>{{ $t("title.address_resident_card") }}</template>
    <div class="white_content">
      <input
        type="checkbox"
        id="foreigners"
        style="margin-right: 8px"
        v-model="form.arcChecked"
      /><label for="foreigners">現住所記載の住所と同じです</label>
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

    <FormInput inputType="text" helpText="都道府県" v-model="form.provinceArc">
    </FormInput>

    <FormInput
      inputType="text"
      helpText="市区町村"
      v-model="form.autonomousCityArc"
    >
    </FormInput>

    <FormInput inputType="text" helpText="番地" v-model="form.addressArc">
    </FormInput>

    <FormInput
      inputType="text"
      helpText="建物名称・部屋番号"
      v-model="form.buildingNameRoomNumberArc"
      :isRequire="false"
    >
    </FormInput>
  </FormGroup>
  <!-- 緊急連絡先を登録 đăng ký liên hệ khẩn cấp -->
  <FormGroup>
    <template #title>{{ $t("title.register_emergency_contact") }}</template>
    <template #infoText>
      記入優先順位 <br />
      ①一親等：実父母、義父母、別居の兄弟姉妹、配偶者、子<br />
      ②一親等の者の勤務先<br />
      ③二親等：別居の実祖父母、義祖父母<br />
      ④三親等：別居の叔父叔母、甥、姪。配偶者の兄弟姉妹<br />
      ⑤知人、友人等
    </template>
    <p style="margin: 10px 0px">緊急連絡先1</p>

    <FormInput
      inputType="text"
      helpText="関係姓"
      v-model="form.lastNameRelationship"
    >
    </FormInput>
    <FormInput inputType="text" helpText="姓" v-model="form.lastNameRela">
    </FormInput>
    <FormInput inputType="text" helpText="名" v-model="form.fistNameRela">
    </FormInput>
    <FormInput inputType="text" helpText="セイ" v-model="form.sureName">
    </FormInput>
    <FormInput inputType="text" helpText="メイ" v-model="form.nameMei">
    </FormInput>

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
    <FormInput inputType="text" helpText="都道府県" v-model="form.province">
    </FormInput>
    <FormInput
      inputType="text"
      helpText="市区町村"
      v-model="form.autonomousCity"
    >
    </FormInput>
    <FormInput inputType="text" helpText="番地" v-model="form.address">
    </FormInput>

    <FormInput
      inputType="text"
      helpText="建物名称・部屋番号"
      v-model="form.buildingNameRoomNumber"
      :isRequire="false"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="電話番号（半角）"
      :require2="true"
      titleGuide="自宅電話番号が無い場合、携帯電話番号のみ登録してください。"
      v-model="form.phoneNumber"
    >
    </FormInput>
    <form-error :errors="v$.form.phoneNumber.$errors" />

    <FormInput
      inputType="text"
      helpText="携帯電話番号（半角）"
      :require2="true"
      v-model="form.mobilePhoneNumberRela"
    >
    </FormInput>
    <form-error :errors="v$.form.mobilePhoneNumberRela.$errors" />
  </FormGroup>
  <!-- 家族情報を登録 đăng ký thông tin gia đình -->
  <FormGroup :isDocument="false">
    <template #title> {{ $t("title.register_family_information") }} </template>
    <template #infoText>
      一等親以内は同居/別居に関わらず記入<br />
      二親等以上は同居、もしくは扶養義務がある場合に限り記載
    </template>
    <div class="help-text">家族情報1</div>
    <FormInput
      inputType="text"
      helpText="続柄"
      :require2="true"
      v-model="form.relationship"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="姓"
      :require2="true"
      v-model="form.lastNameRela2"
    >
    </FormInput>

    <FormInput
      inputType="text"
      helpText="名"
      :require2="true"
      v-model="form.fistNameRela2"
    >
    </FormInput>

    <FormInput
      inputType="text"
      helpText="セイ"
      :require2="true"
      v-model="form.sureName2"
    >
    </FormInput>

    <FormInput
      inputType="text"
      helpText="メイ"
      :require2="true"
      v-model="form.nameMei2"
    >
    </FormInput>

    <FormInput
      inputType="radio"
      mainTitle="性別"
      v-model="form.genderRela"
      :valueRadio="{ value1: '男性', value2: '女性' }"
    >
    </FormInput>
    <CustomForm helpText="生年月日">
      <FormInput
        inputType="number"
        :isRequire="false"
        width="116px"
        unit="年"
        v-model="form.dmy2.date"
      >
      </FormInput>
      <FormInput
        inputType="number"
        :isRequire="false"
        width="116px"
        unit="月"
        v-model="form.dmy2.month"
      >
      </FormInput>
      <FormInput
        inputType="number"
        :isRequire="false"
        width="116px"
        unit="日"
        v-model="form.dmy2.year"
      >
      </FormInput>
    </CustomForm>
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

    <FormInput
      inputType="text"
      helpText="都道府県"
      :require2="true"
      v-model="form.provinceRela2"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="市区町村"
      :require2="true"
      v-model="form.autonomousCity2"
    >
    </FormInput>

    <FormInput
      inputType="text"
      helpText="番地"
      :require2="true"
      v-model="form.addressRela2"
    >
    </FormInput>

    <FormInput
      inputType="text"
      helpText="建物名称・部屋番号"
      v-model="form.buildingNameRoomNumber2"
      :isRequire="false"
    >
    </FormInput>

    <FormInput
      inputType="text"
      helpText="建物名称・部屋番号"
      v-model="form.workOrSchoolName"
      :isRequire="false"
    >
    </FormInput>

    <FormInput
      inputType="text"
      helpText="建物名称・部屋番号"
      v-model="form.occupationClassification"
      :isRequire="false"
    >
    </FormInput>

    <FormInput
      inputType="text"
      mainTitle="職業区分でその他を選択の理由"
      titleGuide=" その他を選択した方は、詳細内容を入力してください。学生を選択した方は、大学<br />
        ○年生など、具体的に入力をお願いいたします。"
      v-model="form.reasonsChoseJob"
      :isRequire="false"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="健康保険扶養区分"
      v-model="form.healthInsuranceClassification"
      :isRequire="false"
    >
    </FormInput>
    <FormInput
      inputType="text"
      helpText="健康保険扶養区分"
      v-model="form.annualIncome"
      :isRequire="false"
      :width="'161px'"
    >
    </FormInput>

    <a href="" @click.prevent="" class="extensionLink"
      ><span>+ </span> 学歴を追加する</a
    >
  </FormGroup>
  <FormGroup>
    <template #title> {{ $t("title.commute_route") }} </template>
    <div class="form_title"></div>
    <template #infoText>
      経路が２つ以上ある場合は、運賃の安い方を選択してください。<br />
      片道料金はICカード料金ではなく現金（切符）料金となります。
    </template>
    <div class="field-name" style="font-weight: 400">通勤手段1</div>

    <FormInput inputType="text" helpText="通勤手段" v-model="form.going">
    </FormInput>
    <FormInput inputType="text" helpText="出発地" v-model="form.departure">
    </FormInput>
    <FormInput inputType="text" helpText="到着地" v-model="form.destination">
    </FormInput>
    <a
      @click.prevent="form.isMethodWork = true"
      style="margin-bottom: 8px"
      href=""
      class="extensionLink"
      ><span>+ </span> 通勤方法を追加する</a
    >
    <div
      v-if="form.isMethodWork"
      style="display: flex; flex-direction: column; gap: 8px"
    >
      <DropImages
        @inputData="updateImage"
        mainTitle="在留カードの写真（裏）"
        titleGuide="カードの裏の写真を添付してください。"
        :linkImage="form.previewImage.routeMapPhoto"
        refEl="routeMap"
        setData="routeMapPhoto"
        :isForeigner="!form.isForeigner"
      >
      </DropImages>
      <FormInput
        inputType="text"
        helpText="距離（無料優先）"
        v-model="form.distance"
      >
      </FormInput>
      <FormInput
        inputType="text"
        helpText="所要時間（無料優先）"
        width="161px"
        unit="分"
        v-model="form.timeRequired"
      >
      </FormInput>
      <FormInput
        inputType="text"
        helpText="距離（高速優先）"
        width="161px"
        unit="Km"
        v-model="form.distance2"
      >
      </FormInput>
      <FormInput
        inputType="text"
        helpText="時間（高速優先）"
        width="161px"
        unit="分"
        v-model="form.timeSpeedHight"
      >
      </FormInput>
      <FormInput
        inputType="text"
        helpText="高速料金"
        width="161px"
        unit="円"
        v-model="form.hightSpeed"
      >
      </FormInput>

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
          v-model="form.reasonHightWay"
        /><label for="foreigner">外国籍の方はチェックを入れてください</label>
      </div>
      <div>
        <div class="text_require">
          <p class="require" :class="[{ noActive: !form.reasonHightWay }]">
            必須
          </p>
          <p
            class="help-text"
            :class="{ filed_noActive: !form.reasonHightWay }"
          >
            口座番号（半角）
          </p>
        </div>
        <textarea v-model="form.reasonHightWayText"></textarea>
      </div>
      <div class="mt-5">
        <div class="field-name">通勤手段2</div>
        <FormInput inputType="text" helpText="通勤手段" v-model="form.commute">
        </FormInput>
      </div>
      <FormInput
        inputType="text"
        helpText="出発地"
        v-model="form.departurePublic"
      >
      </FormInput>
      <FormInput
        inputType="text"
        helpText="到着地"
        v-model="form.destinationPublic"
      >
      </FormInput>

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
      <FormButton :isDisable="true"> 入社手続きの入力に進む </FormButton>
      <br />
      <div>
        <div class="white_content">
          <div class="spaceBetween">
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
  </FormGroup>

  <FormGroup>
    <template #title> {{ $t("title.private_car") }} </template>
    <div class="text_require">
      <p class="require">必須</p>
      <p class="help-text">自家用車の通勤許可を申請しますか？</p>
    </div>
    <!-- Select or drop image with Vuejs-->
    <div>
      <FormInput
        inputType="radio"
        v-model="form.isCarCheck"
        :valueRadio="{ value1: 'はい', value2: 'いいえ' }"
      >
      </FormInput>
      <div v-if="form.isCarCheck === 'はい'">
        <FormInput
          inputType="text"
          helpText="必須"
          v-model="form.forreasonForApplication"
          textImportant="※その他を選択した場合は、必ず理由を入力してください"
        >
        </FormInput>

        <div class="nameFore">
          <div class="text_require">
            <p class="require noActive">必須</p>
            <p class="help-text filed_noActive">
              申請事由（その他）を選択した場合は理由を入力してください
            </p>
          </div>
          <textarea style="height: 101px" v-model="form.otherReason" />
        </div>

        <FormInput
          inputType="text"
          helpText="通勤車両"
          v-model="form.commuterVehicle"
        >
        </FormInput>
      </div>
    </div>
  </FormGroup>
  <FormGroup>
    <template #title>{{ $t("title.owned_car") }}</template>
    <div class="text_require">
      <p class="require">必須</p>
      <p class="help-text">申請事由</p>
    </div>
    <!-- Select or drop image with Vuejs-->
    <FormInput
      inputType="radio"
      v-model="form.isCarCheck2"
      :valueRadio="{ value1: 'はい', value2: 'いいえ' }"
    >
    </FormInput>

    <div v-if="form.isCarCheck2 === 'はい'">
      <FormInput
        inputType="text"
        helpText="申請事由"
        v-model="form.reasonForApplication"
        textImportant="※その他を選択した場合は、必ず理由を入力してください"
      >
      </FormInput>
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
        <textarea
          style="width: 100%; height: 109px"
          v-model="form.supplement"
        />
      </div>
      <div>
        <DropImages
          @inputData="updateImage"
          mainTitle="車両車検証コピー"
          titleGuide="高速道路は原則利用不可。上長が認めた場合にかぎり利用路線の出発IC、到着IC、<br />
          高速料金を必ず記入してください。"
          :linkImage="form.previewImage.vehicleVerificationPhoto"
          refEl="vehicleVerification"
          setData="vehicleVerificationPhoto"
        >
        </DropImages>
      </div>
      <div>
        <DropImages
          @inputData="updateImage"
          mainTitle="任意保険の保険証コピー"
          titleGuide="任意保険の保険証のコピーを添付してください"
          :linkImage="form.previewImage.driversLicenseFontPhoto"
          refEl="driversLicenseFont"
          setData="driversLicenseFontPhoto"
        >
        </DropImages>
      </div>
      <div>
        <DropImages
          @inputData="updateImage"
          mainTitle="任意保険の保険証コピー"
          titleGuide="任意保険の保険証のコピーを添付してください"
          :isShow="form.previewImage.driversLicenseBackPhoto"
          :linkImage="form.previewImage.driversLicenseBackPhoto"
          refEl="driversLicenseBack"
          setData="driversLicenseBackPhoto"
        >
        </DropImages>
      </div>
    </div>
  </FormGroup>
  <p style="font-size: 14px; color: #666666; margin-top: 32px">
    入力ありがとうございました。<br />
    続けて扶養控除申告の入力をお願いいたします。
  </p>
  <!-- submit form -->
  <FormButton :onSubmit="handleSubmit"> 入社手続きの入力に進む </FormButton>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FormError from "./FormError.vue";
import FormGroup from "./FieldForm/FormGroup.vue";
import FormInput from "./FieldForm/FormInput.vue";
import CustomForm from "./FieldForm/CustomForm.vue";
import DropImages from "./FieldForm/DropImages.vue";
import FormInputSearch from "./FieldForm/FormInputSearch.vue";
import FormButton from "./layout/FormButton.vue";

export default {
  components: {
    FormError,
    FormGroup,
    FormInput,
    CustomForm,
    DropImages,
    FormInputSearch,
    FormButton,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      formGr1: [
        {
          key: "lastNameMain",
          helpText: "姓（ローマ字）",
        },
        {
          key: "fistNameMain",
          helpText: "名（ローマ字）",
        },
        {
          key: "seiMain",
          helpText: "姓（カナ）",
        },

        {
          key: "meiMain",
          helpText: "名（カナ）",
        },
        {
          key: "lastNameRoMain",
          helpText: "姓（ローマ字）",
        },
        {
          key: "fistNameRoMain",
          helpText: "国籍",
        },
      ],
      formGr2: [
        {
          key: "lastNameForeRo",
          helpText: "姓",
        },
        {
          key: "nameFore",
          helpText: "名",
        },
        {
          key: "lastNameForeKana",
          helpText: "セイ",
        },

        {
          key: "nameForeKana",
          helpText: "メイ",
        },
        {
          key: "nationality",
          helpText: "姓（ローマ字）",
        },
      ],
      formGr3: [
        {
          key: "residence",
          helpText: "在留資格",
        },
        {
          key: "residenceTime",
          helpText: "在留期間（満了日）",
        },
        {
          key: "licensesBeyond",
          helpText: "資格外活動許可",
        },

        {
          key: "typeofWork",
          helpText: "就労区分",
        },
        {
          key: "residenceCardNumber",
          helpText: "在留カード番号（半角）",
        },
      ],
      form: {
        reasonHightWay: false,
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
          vehicleVerificationPhoto: null,
          driversLicenseFontPhoto: null,
          driversLicenseBackPhoto: null,
        },
        lastNameMain: "",
        fistNameMain: "",
        seiMain: "",
        meiMain: "",
        lastNameRoMain: "",
        fistNameRoMain: "",
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
        buildingNameRoomNumber: "",
        phoneNumber: null,
        mobilePhoneNumber: null,
        phoneNumber1: null,
        arcChecked: false,
        zipCodeArc: {
          zip1: null,
          zip2L: null,
        },
        provinceArc: "",
        autonomousCityArc: "",
        addressArc: "",
        buildingNameRoomNumberArc: "",
        lastNameRelationship: "",
        lastNameRela: "",
        fistNameRela: "",
        sureName: "",
        nameMei: "",
        zipCodeRela: {
          zip1: null,
          zip2L: null,
        },
        provinceRela: "",
        autonomousCityRela: "",
        addressRela: "",
        buildingNameRoomNumberRela: "",
        phoneNumberRela: "",
        mobilePhoneNumberRela: "",
        //
        zipCodeRela2: {
          zip1: null,
          zip2: null,
        },
        dmy2: {
          date: "",
          month: "",
          year: "",
        },
        relationship: "",
        lastNameRela2: "",
        fistNameRela2: "",
        sureName2: "",
        nameMei2: "",
        genderRela: "",
        //
        provinceRela2: "",
        autonomousCity2: "",
        addressRela2: "",
        buildingNameRoomNumber2: "",
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
        supplement: "",
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
        mobilePhoneNumberRela: { required },
      },
    };
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
          this.form.previewImage[payload.setData] = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },

    async handleSubmit() {
      // await this.v$.$validate();
      const isValid = true;
      if (this.dataVuex && isValid) {
        this.$store.dispatch("setInfomation", { data: this.form, step: 3 });
        this.$router.push("/form3");
      } else {
        alert("chưa nhập đủ các field");
      }
    },
    updateImage(data) {
      const curRefImage = data.setData;
      this.form.previewImage[curRefImage] = data.image;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  computed: {
    dataVuex() {
      return this.$store.state.data;
    },
  },
  created() {
    this.scrollToTop();
    this.$store.dispatch("setStep", 2);
    if (this.dataVuex.lastNameMain) {
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
  .main_title {
    margin-bottom: 4px;
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
  .spaceBetween {
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
  .requireOther {
    display: flex;
    .requireOther_outline {
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
    gap: 16px;
    margin-bottom: 5px;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      gap: 16px;
      input {
        padding: 8px;
        width: 116px;
        height: 48px;
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
      margin-left: 8px;
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
    padding: 12px 8px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    margin-bottom: 10px;
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
