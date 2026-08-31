import { Footer } from "@/components/footer/Footer.tsx";
import { LanguageSwitcher } from "@/components/language-switcher/LanguageSwitcher.tsx";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <LanguageSwitcher />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
