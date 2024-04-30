import React from 'react';

export default function Button({ btnTitle, className, icon }) {
  return (
    <div>
      <button type="submit" className={className}>
        <div className='flex flex-row items-center justify-center'>
            <div className='flex items-center mx-1 justify-center'>{btnTitle}</div>
            {icon && <div className='mx-1'><img height = "16px" width="16px" src={icon}/></div>}
        </div>
      </button>
    </div>
  );
}
