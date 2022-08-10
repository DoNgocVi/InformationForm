import { createI18n } from "vue-i18n";
import ja from "./ja.json"
import en from "./en.json"

const messages = {
  ja: ja,
  en: en
}

const i18n = createI18n({
  locale: "ja",
  messages
});

export default i18n