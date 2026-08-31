import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

type Language = "en" | "ko";

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage === "ko" ? "ko" : "en";

  const changeLanguage = (language: Language) => {
    void i18n.changeLanguage(language);
  };

  return (
    <nav
      className={styles.languageSwitcher}
      aria-label={t("languageSwitcher.label")}>
      <button
        type="button"
        lang="en"
        aria-pressed={currentLanguage === "en"}
        className={styles.languageButton}
        onClick={() => changeLanguage("en")}>
        English
      </button>
      <button
        type="button"
        lang="ko"
        aria-pressed={currentLanguage === "ko"}
        className={styles.languageButton}
        onClick={() => changeLanguage("ko")}>
        한국어
      </button>
    </nav>
  );
};
