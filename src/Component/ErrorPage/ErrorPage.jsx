import React from 'react'
import './ErrorPage.css'
const ErrorPage = (props) => {

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <div className='errWrapper'>
      <div className='errorContent'>
        <h1> Lost in the clouds.</h1>
        <h4 className='errMsg'>The page you are looking can not be found !!!</h4>
        <div className='return2Home' onClick={refreshPage}>Return to Home Page</div>
      </div>
    </div>
  )
}

export default ErrorPage;
