import React from 'react';
import { Link } from 'react-router-dom';

function AddThisMaterial({ title, link }) {
  return (
    <div className='flex flex-row items-center'>
      <p style={{ color: 'black', fontWeight: '600', fontSize: '12px' }}>
        This {title} is not available in your {title}s list
      </p>
      <Link to={link}>
        <p
          style={{ color: '#2CAE66', fontWeight: '600', fontSize: '12px' }}
          className='cursor-pointer pl-2'
        >
          Add this {title}
        </p>
      </Link>
    </div>
  );
}

export default AddThisMaterial;
