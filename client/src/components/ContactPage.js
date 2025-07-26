// client/src/components/ContactPage.js
import React from 'react';

const ContactPage = () => {
  return (
    <div className="container">
      <h1>Contact & Support</h1>
      <p>We're here to help. Reach out to us through any of the channels below.</p>
      
      <div className="contact-details">
        <h2>Corporate Office</h2>
        <p>123 Insight Avenue, Data City, DC 45678</p>
        <p><strong>Email:</strong> support@insighthub.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
      </div>

      <div className="map-container">
        {/* Replace with your company's actual Google Maps embed code */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0361623841!2d-74.309343958994!3d40.69753995583273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1672840655389!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Company Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;