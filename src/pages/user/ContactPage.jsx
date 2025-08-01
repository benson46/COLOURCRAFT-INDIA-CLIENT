import { Helmet } from 'react-helmet'
import Navbar from '../../components/user/common/Navbar'
import ContactMap from '../../components/user/contact/contactMap'
import ContactInfo from '../../components/user/contact/ContactInfo'
import Newsletter from '../../components/user/common/NewsLetter'
import Footer from '../../components/user/common/Footer'

const ContactPage = () => {
  return (
    <>
    <Helmet>
      <title>Contact Page</title>
    </Helmet>
    <div className='ContactPage'>
        <ContactMap/>
        <ContactInfo/>
        <Newsletter/>
    </div>
    
    </>
  )
}

export default ContactPage