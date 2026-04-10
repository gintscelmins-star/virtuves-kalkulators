import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import lv from "./locales/lv.json";
import ru from "./locales/ru.json";
i18n.use(initReactI18next).init({
  resources: { lv: { translation: lv }, ru: { translation: ru } },
  lng: "lv", fallbackLng: "lv",
  interpolation: { escapeValue: false }
});
export default i18n;
