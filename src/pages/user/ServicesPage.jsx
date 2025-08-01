import React from "react";
import Navbar from "../../components/user/common/Navbar";
import Services from "../../components/user/services/Services";
import Testimonials from "../../components/user/common/Testimonials";
import CTASection from "../../components/user/common/NewsLetter";
import SplitSection from "../../components/user/services/SplitSection";
import Footer from "../../components/user/common/Footer";
import { Helmet } from "react-helmet";

const ServicesPage = () => {
  return (
    <>
    <Helmet>
      <title>Services</title>
    </Helmet>
    <div className="ServicesPage">
      <Services />
      <SplitSection />
      <Testimonials />
      <CTASection />
    </div>
    </>
  );
};

export default ServicesPage;
