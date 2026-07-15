import { Footer } from "./components/footer/Footer.tsx";
import { Header } from "./components/header/Header.tsx";
import { Main } from "./components/main/Main.tsx";
import styles from "./App.module.css";

function FindGeeksApp() {
  return (
    <div className={styles.layout}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default FindGeeksApp;
