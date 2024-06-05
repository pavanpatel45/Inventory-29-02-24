import React from 'react';

function OutOfStock() {
  return (
    <div
      className='flex justify-center items-center ml-4'
      style={{
        backgroundColor: '#FFEBEB',
        borderRadius: '50px',
        height: '30px',
        width: '101px'
      }}
    >
      <p
        style={{
          color: '#C62222',
          fontSize: '14px',
          fontFamily: 'Roboto',
          fontWeight: '500',
          lineHeight: '22px'
        }}
      >
        Out of Stock!{' '}
      </p>
    </div>
  );
}

export default OutOfStock;
