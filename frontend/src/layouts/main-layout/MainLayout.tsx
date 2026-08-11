import { Header } from "@/components/header/Header.tsx";
import { Main } from "@/components/main/Main.tsx";
import styles from "./MainLayout.module.css";

export const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <Main />
    </div>
  );
};
