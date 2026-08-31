import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ko from "@/locales/ko.json";

const LANGUAGE_STORAGE_KEY = "language";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "ko"] as const;

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const isSupportedLanguage = (
  language: string | null | undefined,
): language is SupportedLanguage =>
  SUPPORTED_LANGUAGES.some((supported) => supported === language);

const getInitialLanguage = (): SupportedLanguage => {
  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(storedLanguage)
      ? storedLanguage
      : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

const syncLanguage = (language: SupportedLanguage) => {
  document.documentElement.lang = language;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Keep the selected language in memory when storage is unavailable.
  }
};

const initialLanguage = getInitialLanguage();

await i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = initialLanguage;

i18n.on("languageChanged", () => {
  const language = i18n.resolvedLanguage;
  if (isSupportedLanguage(language)) {
    syncLanguage(language);
  }
});

export default i18n;
