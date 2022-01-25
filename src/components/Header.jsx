import React from 'react';

function Header({text}) {
  return (
      <div className='navbar mb-12 shadow-lg flex justify-center bg-[#1c1b2498]'>
          <h2 className='text-3xl'>{text}</h2>
      </div>
  )
}

export default Header;
