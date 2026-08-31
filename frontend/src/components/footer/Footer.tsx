import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <p>© 2026 Find Geeks</p>
      <p>
        {t("footer.builtBy")}{" "}
        <a
          href="https://github.com/eudooyoung"
          target="_blank"
          rel="noopener nereferrer">
          Dooyoung
        </a>
      </p>
      <p>
        <a
          href="https://github.com/eudooyoung/odin-photo-tagging-app"
          target="_blank"
          rel="noopener nereferrer">
          GitHub
        </a>{" "}
        •{" "}
        <a
          href="https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app"
          target="_blank"
          rel="noopener nereferrer">
          The Odin Project
        </a>
      </p>
    </footer>
  );
};
