import { Helmet } from 'react-helmet'
import Navbar from '../../components/user/common/Navbar'
import Hero from '../../components/user/portfolio/Hero'
import Work from '../../components/user/portfolio/Work'
import Testimonials from '../../components/user/common/Testimonials'
import Newsletter from '../../components/user/common/NewsLetter'
import Footer from '../../components/user/common/Footer'

const Portfolio = () => {
  return (
    <>
    <Helmet>
      <title>Portfolio Colourcraft India</title>
    </Helmet>
    <div className='PortfolioPage'>
        <Hero/>
        <Work/>
        <Testimonials/>
        <Newsletter/>
    </div>
    </>
  )
}

export default Portfolio