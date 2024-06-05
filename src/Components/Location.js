import React, { useState, useEffect } from 'react';
import search from '../Icons/search-navbar.svg';
import cross from '../Icons/cross.svg';
import { Popover } from 'react-tiny-popover';

function Location({
  children,
  Options,
  selectedLocation = 'All Locations',
  setSelectedLocation,
  isPopoverOpen,
  setIsPopoverOpen,
  isAnyCheckboxSelected,
  setIsAnyCheckboxSelected,
  clearFilter
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [tempSelectedLocation, setTempSelectedLocation] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSave = () => {
    setIsPopoverOpen(false);
    setSelectedLocation(tempSelectedLocation);
    console.log('selected Location at handleSave :', tempSelectedLocation);
  };

  const handleClear = () => {
    setIsAnyCheckboxSelected(false);
    setTempSelectedLocation([]);

    clearFilter();
  };

  const handleCross = () => {
    setIsAnyCheckboxSelected(false);
    setTempSelectedLocation([]);
    setIsPopoverOpen(false);
    clearFilter();
  };

  const handleCheckboxChange = (event, value) => {
    const isChecked = event.target.checked;
    const locationValue = value;
    console.log('at handlecheckboxChange :', locationValue);
    let updatedSelected = [...tempSelectedLocation];

    if (isChecked) {
      updatedSelected.push(locationValue);
    } else {
      updatedSelected = updatedSelected.filter(
        (item) => item !== locationValue
      );
    }

    setTempSelectedLocation(updatedSelected);
    setIsAnyCheckboxSelected(updatedSelected.length > 0);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (!isOpen) {
      setIsAnyCheckboxSelected(false);
    }
  }, [isOpen]);

  const filteredOptions = searchInput
    ? Options.filter((option) =>
        option.value.toLowerCase().includes(searchInput.toLowerCase())
      )
    : Options;

  return (
    <div>
      <Popover
        isOpen={isPopoverOpen}
        positions={['up', 'left', 'bottom', 'right']}
        padding={80}
        reposition={true}
        onClickOutside={() => setIsPopoverOpen(false)}
        containerStyle={{
          position: 'absolute',
          top: '112px',
          left: 0,
          width: '170px'
        }}
        content={() => (
          <div className='outer-box bg-white'>
            <div className='flex flex-row '>
              <img src={search} alt='icon' />
              <div>
                <input
                  type='text'
                  placeholder='Search...'
                  className='w-24 pl-2'
                  style={{ fontSize: '12px' }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <img
                src={cross}
                alt='icon'
                className='pl-6 cursor-pointer'
                onClick={handleCross}
              />
            </div>
            {filteredOptions.length === 0 && searchInput !== '' && (
              <div
                style={{ fontSize: '14px', color: 'red', fontWeight: '500' }}
                className='flex justify-center'
              >
                No results found
              </div>
            )}
            {/* {filteredOptions.length>0 && ( */}
            <ul className='bg-white box-text text-black'>
              {Options.map(
                (ele) =>
                  ele?.value
                    .toLowerCase()
                    ?.includes(searchInput?.toLowerCase()) && (
                    <div
                      className='flex flex-row items-center dropHover'
                      key={ele.id}
                    >
                      <input
                        type='checkbox'
                        className='pl-1'
                        onChange={(e) => handleCheckboxChange(e, ele.value)}
                        checked={tempSelectedLocation.includes(ele.value)}
                      />
                      <li className='pl-2 mb-0.5'>{ele.value}</li>
                    </div>
                  )
              )}
            </ul>
            {/* )} */}
            <div className='flex justify-end pt-1'>
              <button
                style={{
                  width: '46px',
                  height: '24px',
                  backgroundColor: '#',
                  borderRadius: '4px',
                  color: '#9A9898',
                  fontSize: '12px',
                  fontWeight: '500',
                  borderColor: '#D1D0D0'
                }}
                className='mr-2 border border-1 '
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                style={{
                  width: '48px',
                  height: '24px',
                  backgroundColor: isAnyCheckboxSelected
                    ? '#2CAE66'
                    : '#EBEBEB',
                  borderRadius: '4px',
                  color: isAnyCheckboxSelected ? 'white' : '#9A9898',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
                disabled={!isAnyCheckboxSelected}
                onClick={handleSave}
                className={isAnyCheckboxSelected ? '' : 'cursor-not-allowed'}
              >
                Save
              </button>
            </div>
          </div>
        )}
      >
        <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>{children}</div>
      </Popover>
    </div>
  );
}

export default Location;
