import React from 'react';

function Header({text}) {
  return (
      <div className='navbar mb-12 shadow-lg  bg-neutral text-neutral-content flex justify-center '>
          <h2 className='text-3xl'>{text}</h2>
      </div>
  )
}

export default Header;
