import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    // font goes here
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayouts;
