import { Footer } from "@/components/footer/Footer.tsx";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
