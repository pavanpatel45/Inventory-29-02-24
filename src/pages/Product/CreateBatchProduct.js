import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProductBatch } from '../../features/Product/productSlice';
import InputBox from '../../Components/InputBox';
import DropDown from '../../Components/Dropdown';
import { api_url } from '../../Data/Constants';

import Navbar from '../../Components/NavbarCreateBatchProduct';
import Button from '../../Components/Button';
import '../../CSS/CreateBatch.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddThisMaterial from '../../Components/AddThisMaterial';

import { Link } from 'react-router-dom';

export default function CreateBatch() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    batchProductName: '',
    storageLocation: '',
    batchId: '',
    makeOrder: '',
    expiryDate: '',
    quantity: '',
    price: ''
  });
  const [showAddThisProduct, setShowAddThisProduct] = useState(false);
  const [productsTableData, setProductTableData] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [storageLocation, setStorageLocation] = useState([]);

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log('Input value changed:', name, ':', value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    // console.log('Hii I am rahul');
    e.preventDefault();
    console.log('form data at createbatchproduct :', formData);
    dispatch(addProductBatch(formData));
    toast.success('Batch Successfully Added');
    navigate('/products');
  };
  const getProductsTableData = async () => {
    const url = `${api_url}/product`;
    try {
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      if (response?.status === 200) {
        setProductTableData(response?.data);
      } else {
        console.error('Received unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
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
  const checkFormCompletion = () => {
    const formEntries = Object.entries(formData);

    console.log(formEntries);

    const allFieldsFilled = formEntries.every((formEntriesData) => {
      const [name, value] = formEntriesData;

      if (typeof value === 'object' && value !== null) {
        // For objects, check each value inside the object
        const isValidData = Object.values(value).every(
          (val) =>
            (typeof val === 'string' || 'number') && String(val).trim() !== ''
        );
        if (!isValidData) {
          console.log(name);
        }
        return isValidData;
      } else {
        // For non-objects, directly check the value
        const isValidData =
          typeof (value === 'string' || 'number') &&
          String(value).trim() !== '';
        if (!isValidData) {
          console.log(name);
        }
        return isValidData;
      }
    });

    console.log(allFieldsFilled);
    console.log('filled forms', allFieldsFilled);
    setIsFormComplete(allFieldsFilled);
  };

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  useEffect(() => {
    getProductsTableData();
    getStorageLocation();
  }, []);

  useEffect(() => {
    console.log('on formData.batchProductName change');
    for (const d of productsTableData) {
      console.log(
        'Inside material table Data',
        d.productName.trim(),
        formData.batchProductName.trim()
      );
      if (d.productName.trim() !== formData.batchProductName.trim()) {
        console.log('add this');
        setShowAddThisProduct(true);
      } else {
        console.log('material present');
        setShowAddThisProduct(false);
        break; // Break out of the loop
      }
    }
  }, [formData.batchProductName]);
  const isSaveButtonEnabled = isFormComplete && !showAddThisProduct;

  return (
    <form>
      <div className='p-8 bg-white'>
        <Navbar
          title='Create Batch'
          btnTitle='Add Product'
          backLink='/products'
        />
        <div className='grid gap-y-4 pt-8'>
          <div className='grid gap-2'>
            <div className='grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8'>
              <div>
                <InputBox
                  type='text'
                  title='Product Name/Code*'
                  name='batchProductName'
                  onChange={handleInputChange}
                  labelCss={
                    formData.batchProductName.length > 0
                      ? 'label-up'
                      : 'label-down'
                  }
                />
                {showAddThisProduct && (
                  <AddThisMaterial
                    title='product'
                    link='/products/createProduct'
                  />
                )}
              </div>

              <DropDown
                title='Storage Location*'
                name='storageLocation'
                options={storageLocation}
                onChange={handleInputChange}
                labelCss={
                  formData.storageLocation.length > 0
                    ? 'label-up'
                    : 'label-down'
                }
              />

              <InputBox
                type='text'
                title='Batch ID*'
                name='batchId'
                onChange={handleInputChange}
                labelCss={
                  formData.batchId.length > 0 ? 'label-up' : 'label-down'
                }
              />
            </div>
          </div>

          <div className='grid gap-2'>
            <div className='grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8'>
              <InputBox
                type='text'
                title='Make Order#*'
                name='makeOrder'
                onChange={handleInputChange}
                labelCss={
                  formData.makeOrder.length > 0 ? 'label-up' : 'label-down'
                }
              />

              <InputBox
                type='date'
                title='Expiry Date*'
                name='expiryDate'
                onChange={handleInputChange}
                labelCss={
                  formData.expiryDate.length > 0 ? 'label-up' : 'label-down'
                }
              />
              <InputBox
                type='number'
                title='Quantity(Units)*'
                name='quantity'
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
                onChange={handleInputChange}
                labelCss={formData.price ? 'label-up' : 'label-down'}
              />
            </div>
          </div>
          <div className='flex flex-row justify-end'>
            <Link to='/products'>
              <Button
                btnTitle='Save'
                className=' pt-0 pb-0 text-sty'
                style={{
                  backgroundColor: isSaveButtonEnabled
                    ? '#2CAE66 '
                    : '#B3B3B3 ',
                  cursor: isSaveButtonEnabled ? 'pointer' : 'not-allowed'
                }}
                disabled={!isSaveButtonEnabled}
                type='submit'
                onClickfunction={handleSubmit}
              />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
