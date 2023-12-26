import React from 'react';
import './footer.css';
import signature from '../../images/signature.png'

function Footer() {
  return (
    <footer className='footerContainer'> &copy; 2024 || Weather App<img className='signature' alt='signature' src={signature}/></footer>
  )
}

export default Footer