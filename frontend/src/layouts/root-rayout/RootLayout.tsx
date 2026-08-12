import { Footer } from "@/components/footer/Footer.tsx";
import { Outlet } from "react-router";
import styles from "./RootLayout.module.css";

function RootLayout() {
  return (
    <div className={styles.rootRayout}>
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
