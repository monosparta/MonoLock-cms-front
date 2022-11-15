import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./assets/locales/en/translation.json";
import tw from "./assets/locales/zh-tw/translation.json";
import de from "./assets/locales/de/translation.json";
const resources = {
  "en": {
    translation: en,
  },
  "zh-TW": {
    translation: tw,
  },
  "de": {
    translation: de,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "zh-TW", //預設語言
  fallbackLng: "zh-TW", //如果當前切換的語言沒有對應的翻譯則使用這個語言，
  interpolation: {
    escapeValue: false,
  },
});
