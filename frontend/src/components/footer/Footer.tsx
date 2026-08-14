import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2026 Find Geeks</p>
      <p>
        Built by{" "}
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
          Github
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
