import React from 'react';
import './SeniorRenew.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlineXMark } from 'react-icons/hi2';


export const SeniorRenew = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className='senior-renew-container'>
      <button
        type="button"
        className="senior-renew-close"
        onClick={() => navigate('/')}
        aria-label="Close"
      >
        <HiOutlineXMark aria-hidden="true" />
      </button>
      <div className='senior-renew-header'>
        <span className='senior-renew-header-title'>Senior Renew</span>
        <span>
          <h1>Verify Your Mobile Number</h1>
          <p>
          Please verify your mobile number to continue with your health insurance renewal journey.
          </p>
        </span>
      </div>
      <div className='senior-renew-content'>
          <label>Mobile Number</label>
          <br/>
          <input type='text' placeholder='Enter your mobile number' />
      </div> 
      <div>
        <button>Verify</button>
      </div>
    </div>
    </>
    
  )
}
