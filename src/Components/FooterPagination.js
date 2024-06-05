import React from 'react';

export default function FooterPagination() {
  return (
    <div
      className='flex flex-row justify-between text-sm bg-white px-2 pt-2 h-8 '
      style={{ color: '#343434' }}
    >
      <div className='flex flex-row gap-3'>
        <div>Entries Per Page</div>
        <div style={{ border: '1px solid #A5A5A5' }}>
          <select>
            <option>20</option>
          </select>
        </div>
        <div>Showing 20 of 120</div>
      </div>
      <div className='flex flex-row gap-3'>
        <div>Page</div>
        <div className='pl-2 pr-2' style={{ border: '1px solid #A5A5A5' }}>
          1
        </div>
        <div>of 15</div>
        <div>{'<<'}</div>
        <div>{'<'}</div>
        <div>{'>'}</div>
        <div>{'>>'}</div>
      </div>
    </div>
  );
}
