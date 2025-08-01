import { Helmet } from "react-helmet";
import Navbar from "../../components/user/common/Navbar";
import Hero from "../../components/user/home/Hero";
import AboutSection from "../../components/user/common/AboutSection";
import ServicesSection from "../../components/user/common/ServicesSection";
import Products from "../../components/user/home/Products";
import Portfolio from "../../components/user/home/Portfolio";
import Testimonials from "../../components/user/common/Testimonials";
import Newsletter from "../../components/user/common/NewsLetter";
import Footer from "../../components/user/common/Footer";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="HomePage">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <Products />
        <Portfolio />
        <Testimonials />
        <Newsletter />
      </div>
    </>
  );
};

export default HomePage;
