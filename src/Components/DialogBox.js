import React, { useState } from 'react';

const DialogBox = ({
  isOpen,
  setIsOpen,
  handleReadytoShip,
  handleCancelOrder,
  id,
  content
}) => {
  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  const handleClear = () => {
    setSelectOption(0);
  };
  const handleSave = () => {
    if (selectOption == 1) {
      console.log('at dialogBox ready to ship', id);
      handleReadytoShip({ id });
    } else if (selectOption == 2) {
      console.log('at dialogBox cancelOrder', id);
      handleCancelOrder({ id });
    }
    setSelectOption(0);
    setIsOpen(false);
  };
  const [selectOption, setSelectOption] = useState(0);
  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='fixed inset-0 transition-opacity' onClick={closeDialog}>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>
        <div className='bg-white rounded-lg shadow-xl overflow-hidden transform transition-all max-w-lg w-44'>
          <div className='flex flex-col p-1'>
            <div
              className='text-sm dialogBoxText p-2'
              style={{
                backgroundColor: selectOption == 1 ? '#DDF8E9' : 'white',
                color: selectOption == 1 ? '#2D2D2D' : '#888888'
              }}
              onClick={() => {
                setSelectOption(1);
              }}
            >
              {content}
            </div>
            <div
              className='text-sm dialogBoxText p-2'
              style={{
                backgroundColor: selectOption == 2 ? '#DDF8E9' : 'white',
                color: selectOption == 2 ? '#2D2D2D' : '#888888'
              }}
              onClick={() => {
                setSelectOption(2);
              }}
            >
              Cancel Order
            </div>
            <div className='flex justify-end'>
              <button
                className=' my-1 mx-1 py-0 px-2 rounded-md orderBoxButton'
                style={{ border: '1px solid #2CAE66', color: '#2CAE66' }}
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                className=' my-1 mx-1 py-0 px-2 rounded-md orderBoxButton'
                style={{ border: '1px solid #2CAE66', color: '#2CAE66' }}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
