// client/src/components/Footer.js
import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: 'var(--secondary-bg)',
      padding: '2rem',
      textAlign: 'center',
      marginTop: '4rem',
      borderTop: '1px solid var(--border-color)'
    },
    socialLinks: {
      margin: '1rem 0'
    },
    link: {
      margin: '0 15px',
      color: 'var(--accent-color)',
      textDecoration: 'none',
      fontSize: '1.5rem'
    }
  };

  return (
    <footer style={styles.footer}>
      <h3>Contact Us</h3>
      <p>contact@yourcompany.com | (123) 456-7890</p>
      <div style={styles.socialLinks}>
        <a href="https://linkedin.com/company/your-company" target="_blank" rel="noopener noreferrer" style={styles.link}>
          LinkedIn
        </a>
        <a href="https://facebook.com/your-company" target="_blank" rel="noopener noreferrer" style={styles.link}>
          Facebook
        </a>
        <a href="https://instagram.com/your-company" target="_blank" rel="noopener noreferrer" style={styles.link}>
          Instagram
        </a>
      </div>
      <p>© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;