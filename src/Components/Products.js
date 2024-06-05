import * as React from 'react';
import { Link } from 'react-router-dom';
// import { useState } from "react";
import { useTable } from 'react-table';
import { useEffect } from 'react';
import axios from 'axios';
import InStock from './InStock';
import OutOfStock from './OutOfStock';
import FewLeft from './FewLeft';
import hover from '../Icons/Group 35195.svg';
import edit from '../Icons/edit.png';
import bag from '../Icons/shopping-bag.png';
import * as Icon from 'react-icons/fi';
import Checkbox from 'react-custom-checkbox';
import { CgOverflow } from 'react-icons/cg';
import { api_url } from '../Data/Constants';
import { useState } from 'react';

import '../CSS/OrderDropdown.css';
import TableDropdown from './TableDropdown';
function Products({
  selected,
  setSelected,
  productsTableData,
  data,
  category,
  setCategory,
  expiryDate,
  setExpirtyDate,
  availability,
  setAvailability
}) {
  const [option1, setOption1] = React.useState([]);
  const [option2, setOption2] = React.useState([]);
  const [option3, setOption3] = React.useState([]);
  const [options, setOptions] = React.useState([
    {
      value: 'In Stock',
      id: '1'
    },
    {
      value: 'Out of Stock',
      id: '3'
    },
    {
      value: 'Few Left',
      id: '2'
    }
  ]);
  const [images, setImages] = React.useState({});

  console.log('Hii this is data', data);
  const handleImageClick1 = () => {
    console.log('edit icon was clicked');
  };
  const handleImageClick2 = (row) => {
    console.log('shopping-bag icon was clicked', row);
  };

  const getImage = async (imageId) => {
    const apiUrl = `${api_url}/images/${imageId}`;
    try {
      if (imageId) {
        const response = await axios.get(apiUrl, { responseType: 'blob' });
        if (response?.status === 200) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImages((prevImages) => ({
              ...prevImages,
              [imageId]: reader.result
            }));
          };
          reader.readAsDataURL(response.data);
        }
      }
    } catch (error) {
      console.error('Get image error:', error);
      return null;
    }
  };

  React.useEffect(() => {
    data.forEach((item) => {
      if (item.imageId) {
        getImage(item.imageId);
      }
    });
  }, [data]);

  const getCategory = async () => {
    const url = `${api_url}/materialCategory/getAllMaterialCategory`;
    try {
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      console.log('at api-data Category DAta: ', response);

      if (response?.status === 200) {
        console.log('API Data: Category DAta', response?.data);
        const option = response?.data;
        setOption1([]);
        option.map((ele) => {
          setOption1((prev) => {
            return [
              ...prev,
              {
                value: ele.value,
                label: ele.value
              }
            ];
          });
        });
      } else {
        console.error('Received unexpected response:', response);
      }
    } catch (error) {
      return null;
    }
  };
  const getExpiryDate = async () => {
    const url = `${api_url}/getExpiryDates`;
    try {
      const response = await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': '69420' }
      });
      // console.log("at api-data Category DAta: ", response);

      if (response?.status === 200) {
        console.log('API Data: Category DAta', response?.data);
        const option = response?.data;
        console.log('Expiry Date values:', option);
        setOption2([]);
        option.map((ele) => {
          setOption2((prev) => {
            return [
              ...prev,
              {
                value: ele.value,
                label: ele.value
              }
            ];
          });
        });
      } else {
        console.error('Received unexpected response:', response);
      }
    } catch (error) {
      return null;
    }
  };
  React.useEffect(() => {
    getCategory();
    getExpiryDate();

    setOption3([]);
    options.map((ele) => {
      console.log('ele at setOption3 : ', ele);
      setOption3((prev) => {
        return [
          ...prev,
          {
            value: ele.value,
            label: ele.value
          }
        ];
      });
    });
    console.log('all data at starting :', option1, option2, option3);
  }, []);
  const handleCheck = (id) => {
    console.log('at handleCheck :', id);
    if (selected.includes(id)) {
      console.log('return true');
      return true;
    } else {
      console.log('return false');
      return false;
    }
  };
  React.useEffect(() => {
    console.log('category Data :', option1);
  }, [option1]);
  const columns = React.useMemo(
    () => [
      {
        Header: (
          <div className='flex items-center gap-2'>
            <Checkbox
              icon={
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: '#2CAE66',
                    alignSelf: 'stretch'
                  }}
                >
                  <Icon.FiCheck color='white' size={20} />
                </div>
              }
              name='my-input'
              checked={false}
              style={{
                cursor: 'pointer',
                height: '20px',
                width: '20px',
                border: '1px solid #2CAE66',
                overflow: 'hidden'
              }}
            />
            <p>Product</p>
          </div>
        ),
        accessor: 'productName',
        width: '240px',
        height: '52px',
        Cell: ({ cell, row }) => (
          <div
            className='relative flex items-center gap-2'
            onMouseEnter={() => {
              const img = document.getElementById(`image-${row.original.id}`);
              if (img) {
                img.style.display = 'none';
              }
            }}
            onMouseLeave={() => {
              const img = document.getElementById(`image-${row.original.id}`);
              if (img) {
                img.style.display = 'none';
              }
            }}
          >
            <div
              id={`image-${row.original.id}`}
              className='hover-image'
              style={{
                display: 'none', // Initially hidden
                position: 'absolute',
                marginLeft: '20px',
                top: '50%' // Center vertically
                //transform: "translateY(-50%)", // Center vertically
              }}
            >
              <img
                src={hover}
                alt='Hover Image'
                style={{
                  width: '148px', // Adjust size as needed
                  height: '44px'
                }}
              />
            </div>

            <Checkbox
              icon={
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: '#2CAE66',
                    alignSelf: 'stretch'
                  }}
                >
                  <Icon.FiCheck color='white' size={20} />
                </div>
              }
              name='my-input'
              //checked={handleCheck(row.original.id)}
              onChange={(value, event) => {
                console.log('Selected checkbox has id :', row.original);
                if (value == true) {
                  console.log('true');
                  setSelected((prevSelected) => {
                    if (!prevSelected.includes(row.original.id)) {
                      return [...prevSelected, row.original.id];
                    } else {
                      return prevSelected;
                    }
                  });
                } else if (value == false) {
                  return setSelected((prevSelected) =>
                    prevSelected.filter((item) => item !== row.original.id)
                  );
                }
              }}
              style={{
                cursor: 'pointer',
                height: '20px',
                width: '20px',
                border: '1px solid #2CAE66',
                overflow: 'hidden'
              }}
              checked={handleCheck(row.original.id)}
              // labelStyle={{ marginLeft: 5, userSelect: "none" }}
              // label="Have you started using it?"
            />
            {images[row.original.imageId] && (
              <img
                src={images[row.original.imageId]}
                alt='Product'
                style={{ width: '26px', height: '26px' }}
              />
            )}
            <a
              href='https://www.google.com' //href={`#/${value}`}
              className='hover:underline'
              style={{
                color: '#103BD5',
                fontFamily: 'Roboto',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '22px',
                textDecoration: 'underline'
              }}
            >
              <p className='truncate max-w-24'>{cell.value} </p>
            </a>
          </div>
        )
      },
      {
        Header: 'Code',
        accessor: 'code',
        width: '120px',
        height: '52px'
      },
      {
        Header: 'Batch ID',
        accessor: 'batchId',
        width: '122px',
        height: '52px'
      },

      {
        Header: (
          <>
            <TableDropdown
              title='Category'
              options={option1}
              selectedOption={category}
              setSelectedOption={setCategory}
              className='z-50'
            />
          </>
        ),
        accessor: 'category',
        className: 'truncate max-w-24',
        width: '120px',
        height: '40px'
      },

      {
        Header: (
          <>
            <TableDropdown
              title='Expiry Date'
              options={option2}
              selectedOption={expiryDate}
              setSelectedOption={setExpirtyDate}
            />
          </>
        ),
        accessor: 'expiryDate',
        width: '131px',
        height: '52px'
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        width: '90px',
        height: '40px'
      },
      {
        Header: 'Price($)',
        accessor: 'price',
        width: '90px',
        height: '52px'
      },
      {
        Header: (
          <div className='z-50'>
            <TableDropdown
              title='Availability'
              options={option3}
              selectedOption={availability}
              setSelectedOption={setAvailability}
            />
          </div>
        ),
        accessor: 'availability',
        Cell: ({ value }) => {
          if (value === 'In Stock') {
            return <InStock />;
          } else if (value === 'Out of Stock') {
            return <OutOfStock />;
          } else if (value === 'Few Left') {
            return <FewLeft />;
          }
        },
        width: '154px',
        height: '52px',
        justifyContent: 'center',
        alignItems: 'center'
      },
      {
        Header: 'Committed',
        accessor: 'committed',
        width: '102px',
        height: '40px'
      },
      {
        Header: 'Action',
        accessor: 'action',
        width: '102px',
        height: '40px',
        Cell: ({ cell, row }) => {
          // console.log("row data :",row);
          // const data = {
          //     id:row.
          // }
          return (
            <div className='flex flex-row justify-center'>
              <div>
                <img
                  src={bag}
                  alt='icon'
                  className='mr-3'
                  onClick={handleImageClick1}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <Link to='/products/UpdateProduct' state={row.original}>
                  <img
                    src={edit}
                    alt='icon'
                    onClick={handleImageClick2}
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
              </div>
            </div>
          );
        }
      }
    ],
    [selected, option1, option2, option3, images]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className='  ml-4 pt-3 '>
        <table {...getTableProps()} className='table-auto  '>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className='px-4 py-2'
                    style={{
                      backgroundColor: '#E9E9E9',
                      borderColor: '#BDBDBD',
                      // width: column.width,
                      whiteSpace: 'nowrap',
                      height: column.height,
                      width: column.width,
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Roboto',
                      lineHeight: '22px',
                      borderTopLeftRadius:
                        column.id === 'productName' ? '28px' : '0',
                      borderTopRightRadius:
                        column.id === 'action' ? '28px' : '0',
                      position: 'relative'
                    }}
                  >
                    {column.render('Header')}
                    {/* <div
                       className="absolute top-0 left-0 w-full h-full"
                       style={{
                         borderRight: "1px solid #BDBDBD", 
                         borderBottom: "1px solid #BDBDBD", 
                         borderTop: "1px solid #BDBDBD", 
                         borderLeft: "1px solid #BDBDBD", 
                         borderTopRightRadius: column.id === "action" ? "28px" : "0",
                        borderTopLeftRadius: column.id === "materialName" ? "28px" : "0",
                       
                       }}
                     /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={'even-row'}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className='border  px-4 py-2 h-4 '
                      style={{
                        color: '#343434',
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '22px',
                        fontFamily: 'Roboto',
                        width: cell.column.width
                        //height: cell.column.height
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Products;
