import { Helmet } from "react-helmet";
import Navbar from "../../components/user/common/Navbar";
import AboutHeader from "../../components/user/about-us/AboutHeader";
import StorySection from "../../components/user/about-us/StorySection";
import PrioritySection from "../../components/user/about-us/PrioritySection";
import ServicesSection from "../../components/user/common/ServicesSection";
import AboutSection from "../../components/user/common/AboutSection";
import Testimonials from "../../components/user/common/Testimonials";
import Newsletter from "../../components/user/common/NewsLetter";
import Footer from "../../components/user/common/Footer";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Page</title>
      </Helmet>
      <div className="AboutPage">
        <AboutHeader />
        <StorySection />
        <PrioritySection />
        <ServicesSection />
        <AboutSection />
        <Testimonials/>
        <Newsletter />
      </div>
    </>
  );
};

export default AboutPage;
