import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductMaterial } from '../features/Product/productSlice';
import InputBox from './InputBox';
import Navbar from './NavbarForm';
import Button from './Button';
import { Link } from 'react-router-dom';
import AddedMaterialsTable from './AddedMaterialsTable';
import axios from 'axios';
import '../CSS/NavbarMaterials.css';
import smallPlus from '../Icons/small-plus.svg';
import { toast } from 'react-toastify';
import { api_url } from '../Data/Constants';
import 'react-toastify/dist/ReactToastify.css';
import AddThisMaterial from './AddThisMaterial';

export default function CreateProductMaterials() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    materials: {
      materialName: '',
      materialRequiredQuantity: '',
      materialUnit: ''
    }
  });
  const [Data, setData] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showAddThisProduct, setShowAddThisProduct] = useState(false);
  const [productsMaterialTableData, setProductMaterialTableData] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      materials: {
        ...prevData.materials,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form Data at createProductMaterials:', formData);
    dispatch(addProductMaterial(formData));
    toast.success('New Product Successfully Added');
    addData();
    navigate('/products/CreateBatchProduct');
  };

  const getProductMaterialsTableData = async () => {
    const url = `${api_url}/material`;
    try {
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      if (response?.status === 200) {
        setProductMaterialTableData(response?.data);
      } else {
        console.error('Received unexpected response', response);
      }
    } catch (error) {
      console.log('error fetching data', error);
    }
  };

  useEffect(() => {
    getProductMaterialsTableData();
  }, []);

  useEffect(() => {
    if (!formData.materials || !formData.materials.materialName) {
      return;
    }

    let materialFound = false;
    for (const d of productsMaterialTableData) {
      if (d.materialName.trim() === formData.materials.materialName.trim()) {
        materialFound = true;
        break;
      }
    }

    setShowAddThisProduct(!materialFound);
  }, [formData.materials.materialName, productsMaterialTableData]);

  const checkFormCompletion = () => {
    const formEntries = Object.entries(formData.materials);
    const allFieldsFilled = formEntries.every(([name, value]) => {
      const isValidData =
        (typeof value === 'string' || typeof value === 'number') &&
        String(value).trim() !== '';
      return isValidData;
    });
    setIsFormComplete(allFieldsFilled);
  };

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  const addData = () => {
    setData((prevData) => [
      ...prevData,
      {
        materialName: formData.materials.materialName,
        materialCode: '',
        quantity: formData.materials.materialRequiredQuantity,
        unit: formData.materials.materialUnit,
        category: ''
      }
    ]);
    setFormData({
      materials: {
        materialName: '',
        materialRequiredQuantity: '',
        materialUnit: ''
      }
    });
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    console.log('at handleAddMaterial:', formData);
    addData();
    console.log('Table data at handleAddMaterial:', Data);
  };

  return (
    <div className='bg-white'>
      <form>
        <div className='p-8'>
          <Navbar
            title='Create Product'
            className='NavbarForm'
            btnStyle={{
              backgroundColor: isFormComplete ? '#2CAE66' : '#B3B3B3',
              cursor: isFormComplete ? 'pointer' : 'not-allowed'
            }}
            disabled={!isFormComplete}
            btnTitle='Save'
            handleClick={handleSubmit}
            backLink='/products/createProduct/'
          />
          <div className='flex flex-row mt-7'>
            <div className='flex flex-col items-center'>
              <div
                className='h-5 w-5 rounded-full flex items-center justify-center  text-green-500'
                style={{ border: '1px solid', borderColor: '#2CAE66' }}
              >
                1
              </div>
              <div
                style={{
                  color: 'black',
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '14.06px'
                }}
              >
                Add Product
              </div>
            </div>
            <div
              className='border border-1 border-black border-dashed h-0 w-64'
              style={{ position: 'relative', left: '-23px', top: '8px' }}
            ></div>
            <div
              className='flex flex-col items-center'
              style={{ position: 'relative', left: '-36px' }}
            >
              <div
                className='h-5 w-5 rounded-full flex items-center justify-center text-xs text-white'
                style={{ border: '1px', backgroundColor: '#2CAE66' }}
              >
                2
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '14.06px',
                  color: '#2CAE66'
                }}
              >
                Materials
              </div>
            </div>
          </div>
          <div className='grid gap-y-4 pt-8'>
            <div className='flex flex-row justify-between pb-3'>
              <div
                style={{
                  color: '#2D2D2D',
                  fontWeight: '500',
                  lineHeight: '19px',
                  fontSize: '16px'
                }}
              >
                Materials
              </div>
              <Link to='/materials/AddMaterial'>
                <div className='flex flex-row cursor-pointer'>
                  <img src={smallPlus} alt='icon' className='pr-2' />
                  <a
                    style={{
                      fontSize: '14px',
                      color: '#2DA060',
                      fontWeight: '500'
                    }}
                  >
                    Add New Material
                  </a>
                </div>
              </Link>
            </div>
            <div className='grid gap-2'>
              <div className='grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8'>
                <div>
                  <InputBox
                    type='text'
                    title='Material Name/Code*'
                    name='materialName'
                    value={formData.materials.materialName}
                    onChange={handleInputChange}
                    labelCss={
                      formData.materials.materialName.length > 0
                        ? 'label-up'
                        : 'label-down'
                    }
                  />
                  {showAddThisProduct && (
                    <AddThisMaterial
                      title='material'
                      link='/materials/AddMaterial'
                    />
                  )}
                </div>
                <InputBox
                  type='number'
                  title='Required Quantity*'
                  name='materialRequiredQuantity'
                  value={formData.materials.materialRequiredQuantity}
                  onChange={handleInputChange}
                  labelCss={
                    formData.materials.materialRequiredQuantity.length > 0
                      ? 'label-up'
                      : 'label-down'
                  }
                />

                <InputBox
                  type='text'
                  title='Unit*'
                  name='materialUnit'
                  value={formData.materials.materialUnit}
                  onChange={handleInputChange}
                  labelCss={
                    formData.materials.materialUnit.length > 0
                      ? 'label-up'
                      : 'label-down'
                  }
                />
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-end mt-4'>
              <Button
                btnTitle='Add +'
                className='pt-0 pb-0 text-sty'
                style={{
                  backgroundColor:
                    isFormComplete && !showAddThisProduct
                      ? '#2CAE66 '
                      : '#B3B3B3 ',
                  cursor:
                    isFormComplete && !showAddThisProduct
                      ? 'pointer'
                      : 'not-allowed'
                }}
                disabled={!isFormComplete || showAddThisProduct}
                onClickfunction={handleAddMaterial}
              />
            </div>
          </div>
        </div>
      </form>
      {Data && <AddedMaterialsTable data={Data} />}
    </div>
  );
}
