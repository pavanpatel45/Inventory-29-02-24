import exportIcon from '../Icons/export.png';
import down from '../Icons/arrow-down.svg';
import '../CSS/OrderDropdown.css';
import React, { useState, useEffect, useRef } from 'react';
import cross from '../Icons/cross.svg';
import axios from 'axios';
import { api_url } from '../Data/Constants';

function Export({ selected, called }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);
  const [isCsvSelected, setIsCsvSelected] = useState(false);
  const [isPdfSelected, setIsPdfSelected] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = async () => {
    setIsOpen(false);

    if (isPdfSelected && called == 'products') {
      await exportProductPdf();
    }
    if (isPdfSelected && called == 'materials') {
      await exportMaterialPdf();
    }
    if (isCsvSelected && called == 'products') {
      await exportProductCsv();
    }
    if (isCsvSelected && called == 'materials') {
      await exportMaterialCsv();
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === 'csv') {
      setIsCsvSelected(checked);
    } else if (name === 'pdf') {
      setIsPdfSelected(checked);
    }

    setIsAnyCheckboxSelected(isCsvSelected || isPdfSelected || checked);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsAnyCheckboxSelected(false);
      setIsCsvSelected(false);
      setIsPdfSelected(false);
    }
  }, [isOpen]);

  const exportProductPdf = async () => {
    try {
      const url = `${api_url}/productBatch/exportPdf`;
      console.log('Export pdf at', selected);
      const response = await axios.post(url, selected, {
        responseType: 'blob' // Ensure the response is handled as a blob
      });
      if (response.status === 200 && response.data instanceof Blob) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'export.pdf';
        link.click();
        console.log('PDF export successful');
      } else {
        console.error('Failed to handle response as a Blob');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const exportMaterialPdf = async () => {
    try {
      const url = `${api_url}/materialBatch/exportPdf`;
      console.log('Export pdf at', selected);
      const response = await axios.post(url, selected, {
        responseType: 'blob' // Ensure the response is handled as a blob
      });
      if (response.status === 200 && response.data instanceof Blob) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'export.pdf';
        link.click();
        console.log('PDF export successful');
      } else {
        console.error('Failed to handle response as a Blob');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const exportProductCsv = async () => {
    try {
      const url = `${api_url}/productBatch/exportCsv`;
      console.log('Export csv at', selected);
      const response = await axios.post(url, selected, {
        responseType: 'blob' // Ensure the response is handled as a blob
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'export.csv';
      link.click();
    } catch (error) {
      console.log('Error', error);
    }
  };

  const exportMaterialCsv = async () => {
    try {
      const url = `${api_url}/materialBatch/exportCsv`;
      console.log('Export csv at', selected);
      const response = await axios.post(url, selected, {
        responseType: 'blob' // Ensure the response is handled as a blob
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'export.csv';
      link.click();
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className='border flex flex-row items-center'
        style={{
          width: '129px',
          height: '42px',
          borderRadius: '8px',
          backgroundColor: '#EFEFEF',
          cursor: 'pointer'
        }}
        onClick={toggleDropdown}
      >
        <div className='pl-3'>
          <img src={exportIcon} alt='icon' />
        </div>
        <div
          className='pl-2'
          style={{
            fontWeight: '500',
            fontSize: '14px',
            fontFamily: 'roboto',
            lineHeight: '22px'
          }}
        >
          Export
        </div>
        <div className='pl-3'>
          <img src={down} alt='icon' />
        </div>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className='outer-box dropdown bg-white z-50'
          style={{
            position: 'absolute',
            top: '60%',
            left: '-30%',
            width: '170px',
            height: '134px'
          }}
        >
          <div className='flex flex-row justify-between'>
            <p
              className='pb-1 pl-1'
              style={{
                backgroundColor: 'white',
                color: '#737373',
                fontSize: '12px',
                letterSpacing: '1%'
              }}
            >
              Export as
            </p>
            <img
              src={cross}
              alt='icon'
              className='pr-2 cursor-pointer'
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className='box-text'>
            <ul>
              <li
                className='dropHover flex justify-start items-center'
                style={{ width: '160px' }}
              >
                <input
                  type='checkbox'
                  name='csv'
                  onChange={handleCheckboxChange}
                />{' '}
                <p className='pl-2'>.CSV</p>
              </li>
              <li
                className='dropHover flex justify-start items-center '
                style={{ width: '160px' }}
              >
                <input
                  type='checkbox'
                  name='pdf'
                  onChange={handleCheckboxChange}
                />{' '}
                <p className='pl-2'>.PDF</p>
              </li>
            </ul>
            <div className='flex justify-end pt-1'>
              <button
                onClick={handleSave}
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
                className={!isAnyCheckboxSelected ? 'cursor-not-allowed' : ''}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Export;
