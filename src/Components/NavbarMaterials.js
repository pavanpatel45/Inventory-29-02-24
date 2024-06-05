import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import down from '../Icons/arrow-down.svg';
import locationIcon from '../Icons/location.svg';
import Export from './Export';
import Button from './Button';

import plus from '../Icons/plus-outline.svg';
import dlt from '../Icons/Delete.svg';
import cancel from '../Icons/x.svg';
import '../CSS/NavbarMaterials.css';
import Location from './Location';
import { api_url } from '../Data/Constants';
import axios from 'axios';
import SearchBox from './SearchBox';

export default function NavbarMaterials({
  className,
  select = true,
  count,
  handleDelete,
  selected,
  setSelected,
  materialsTableData,
  selectedLocation,
  setSelectedLocation,
  search,
  setSearch
}) {
  const [exportOption, setExportOption] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [locationData, setLocationData] = useState([]);
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);

  const getLocations = async () => {
    try {
      const url = `${api_url}/productCategory/getAllLocations`;
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log('Response at newOrderRequest', response.data);
      setLocationData(response.data);
    } catch (error) {
      console.log('Error :', error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const togglePopoverOpen = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const clearFilter = () => {
    setSelectedLocation([]);
    materialsTableData();
  };

  return (
    <div className='flex flex-row justify-between items-center  ml-4 mt-3 bg-white'>
      <div className='flex flex-row gap-2 '>
        {!select && <div className='font-medium'>Materials View</div>}
        {select && (
          <div className='flex flex-row gap-2'>
            <img
              src={cancel}
              onClick={() => {
                setSelected([]);
                materialsTableData();
              }}
              style={{ cursor: 'pointer' }}
            />
            <div style={{ color: '#343434', fontWeight: '500' }}>
              {count} Item(s) Selected
            </div>
          </div>
        )}
      </div>

      <div className='flex justify-end'>
        {!select && <SearchBox search={search} setSearch={setSearch} />}

        {!select && (
          <div className='mr-4'>
            <Location
              Options={locationData}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              isPopoverOpen={isPopoverOpen}
              setIsPopoverOpen={setIsPopoverOpen}
              isAnyCheckboxSelected={isAnyCheckboxSelected}
              setIsAnyCheckboxSelected={setIsAnyCheckboxSelected}
              clearFilter={clearFilter}
            >
              <div
                className='border flex flex-row items-center justify-between cursor-pointer'
                style={{
                  width: '170px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: '#EFEFEF',
                  position: 'relative'
                }}
                onClick={togglePopoverOpen}
              >
                <div className='pl-2'>
                  <img
                    src={locationIcon}
                    alt='icon'
                    style={{ color: 'black' }}
                  />
                </div>
                <div
                  className='pr-2'
                  style={{ fontSize: '16px', fontWeight: '500' }}
                >
                  {selectedLocation.length === 0
                    ? 'All Locations'
                    : selectedLocation}
                </div>
                <div className='pr-5'>
                  <img src={down} alt='icon' />
                </div>
              </div>
            </Location>
          </div>
        )}
        <div className='mr-4'>
          <Export selected={selected} called='materials' />
        </div>

        {!select && (
          <Link to='CreateBatch'>
            <Button btnTitle={'Add'} className='style' icon={plus}></Button>
          </Link>
        )}
        {select && (
          <Button
            btnTitle={'Delete'}
            className='style1'
            icon={dlt}
            onClickfunction={handleDelete}
          ></Button>
        )}
      </div>
    </div>
  );
}
