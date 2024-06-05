import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../Components/InputBox';
import DropDown from '../../Components/Dropdown';
import Navbar from '../../Components/NavbarCreateBatch';
import Button from '../../Components/Button';
import '../../CSS/CreateBatch.css';
import { Link, useLocation } from 'react-router-dom';
import { api_url } from '../../Data/Constants';
import axios from 'axios';

export default function UpdateMaterial() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(location?.state);
  const [storageLocation, setStorageLocation] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [formData, setFormData] = useState({
    materialName: '',
    storageLocation: '',
    batchId: '',
    purchaseOrder: '',
    expiryDate: '',
    quantity: '',
    price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const checkFormCompletion = () => {
    const formEntries = Object.entries(formData);

    const allFieldsFilled = formEntries.every(([name, value]) => {
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).every(
          (val) =>
            (typeof val === 'string' || typeof val === 'number') &&
            String(val).trim() !== ''
        );
      } else {
        return (
          (typeof value === 'string' || typeof value === 'number') &&
          String(value).trim() !== ''
        );
      }
    });

    setIsFormComplete(allFieldsFilled);
  };

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  const getStorageLocation = async () => {
    const url = `${api_url}/productCategory/getAllLocations`;
    try {
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      if (response?.status === 200) {
        setStorageLocation(response?.data);
      } else {
        console.error('Received unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log('data is', data);
  useEffect(() => {
    if (data) {
      setFormData({
        materialName: data.materialName || '',
        storageLocation: data.location || '',
        batchId: data.batchId || '',
        purchaseOrder: data.purchaseOrder || '',
        expiryDate: data.expiryDate || '',
        quantity: data.quantity || '',
        price: data.price || ''
      });
    }
    getStorageLocation();
  }, [data]);

  const updateBatchData = async (Data, id) => {
    try {
      const url = `${api_url}/materialBatch/${id}`;
      const resp = await axios.put(url, Data);
      console.log('Response', resp);
    } catch (error) {
      console.log('Error :', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = {
      materialName: formData.materialName,
      storageLocation: formData.storageLocation,
      batchId: formData.batchId,
      purchaseOrder: formData.purchaseOrder,
      expiryDate: formData.expiryDate,
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price)
    };
    updateBatchData(Data, data.id);
    navigate('/materials');
  };

  return (
    <form>
      <div className='p-8 bg-white'>
        <Navbar title='Edit Batch' backLink='/materials' />
        <div className='grid gap-y-4 pt-8'>
          <div className='grid gap-2'>
            <div className='grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8'>
              <InputBox
                type='text'
                title='Material Name/Code*'
                name='materialName'
                value={formData.materialName}
                onChange={handleInputChange}
                labelCss={formData.materialName ? 'label-up' : 'label-down'}
              />
              <DropDown
                title='Storage Location*'
                name='storageLocation'
                onChange={handleInputChange}
                options={storageLocation}
                value={formData.storageLocation}
                labelCss={formData.storageLocation ? 'label-up' : 'label-down'}
              />
              <InputBox
                type='text'
                title='Batch ID*'
                name='batchId'
                value={formData.batchId}
                onChange={handleInputChange}
                labelCss={formData.batchId ? 'label-up' : 'label-down'}
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8'>
              <InputBox
                type='text'
                title='Purchase Order#*'
                name='purchaseOrder'
                value={formData.purchaseOrder}
                onChange={handleInputChange}
                labelCss={formData.purchaseOrder ? 'label-up' : 'label-down'}
              />
              <InputBox
                type='date'
                title='Expiry Date*'
                name='expiryDate'
                value={formData.expiryDate}
                onChange={handleInputChange}
                labelCss={formData.expiryDate ? 'label-up' : 'label-down'}
              />
              <InputBox
                type='number'
                title='Quantity(Units)*'
                name='quantity'
                value={formData.quantity}
                onChange={handleInputChange}
                labelCss={formData.quantity ? 'label-up' : 'label-down'}
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8'>
              <InputBox
                type='number'
                title='Price($)*'
                name='price'
                value={formData.price}
                onChange={handleInputChange}
                labelCss={formData.price ? 'label-up' : 'label-down'}
              />
            </div>
          </div>
          <div className='flex flex-row justify-end'>
            <Link to='/materials'>
              <Button
                btnTitle='Save'
                className=' pt-0 pb-0 text-sty'
                onClickfunction={handleSubmit}
                style={{
                  backgroundColor: isFormComplete ? '#2CAE66 ' : '#B3B3B3 ',
                  cursor: isFormComplete ? 'pointer' : 'not-allowed'
                }}
                disabled={!isFormComplete}
              />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
