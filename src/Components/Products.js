import * as React from "react";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import InStock from "./InStock";
import OutOfStock from "./OutOfStock";
import FewLeft from "./FewLeft";
import edit from '../Icons/edit.png'
import bag from '../Icons/shopping-bag.png'
import * as Icon from "react-icons/fi";
import Checkbox from "react-custom-checkbox";
import { CgOverflow } from "react-icons/cg";
import { api_url } from "../Data/Constants";
import { useState } from "react";

import "../CSS/OrderDropdown.css";
import TableDropdown from "./TableDropdown";
function Products({selected,setSelected,productsTableData,data}) {
  const handleImageClick1 = () => {
    console.log("edit icon was clicked");
  };
  const handleImageClick2 = (row) => {
    console.log("shopping-bag icon was clicked",row);
  };
  const handleCheck = (id) =>{
    console.log("at handleCheck :",id);
    if(selected.includes(id)){
      console.log("return true");
      return true;
    }
    else{
      console.log("return false");
      return false;
    }
  }
  const options = [
    {
      value: "inStock",
      label: "In Stock",
     
    },
    {
      value: "fewLeft",
      label: "Few Left",
     
    },
    {
      value: "outOfStock",
      label: "Out of Stock",
     
    },
  ];

  const options1 = [
    {
      value: "fillersBinders",
      label: "Fillers and Binders",
     
    },
    {
      value: "solvents",
      label: "Solvents",
     
    },
    {
      value: "stabilizersLubricants",
      label: "Stabilizers and Lubricants",
     
    },
    {
      value: "preservatives",
      label: "Preservatives",
     
    },
    {
      value: "modifiersAdditives",
      label: "Modifiers and Additives",
     
    },
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <div className="flex items-center gap-2">
            <Checkbox
              icon={
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    backgroundColor: "#2CAE66",
                    alignSelf: "stretch",
                  }}
                >
                  <Icon.FiCheck color="white" size={20} />
                </div>
              }
              name="my-input"
              checked={false}
              // onChange={(value, event) => {
              //   let p = {
              //     isTrue: value,
              //   };
              //   console.log(event);
              //   return alert(value);
              // }}
              style={{ cursor: "pointer", height: "20px", width: "20px", border: "1px solid #2CAE66", overflow: "hidden" }}
            />
            <p>Product</p>
          </div>
        ),
        accessor: "productName",
        width: "228px",
        Cell: ({ cell, row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              icon={
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    backgroundColor: "#2CAE66",
                    alignSelf: "stretch",
                  }}
                >
                  <Icon.FiCheck color="white" size={20} />
                </div>
              }
              name="my-input"
              checked={handleCheck(row.original.id)}
              onChange={(value, event) => {
                console.log("Selected checkbox has id :", row.original.id);
                if (value == true) {
                  console.log("true");
                  setSelected((prevSelected) => {
                    if(!prevSelected.includes(row.original.id)){
                      return [...prevSelected, row.original.id]
                    }
                    else{

                      return prevSelected ;
                    }
                  })
                }
                else if (value == false) {
                  return setSelected(prevSelected => prevSelected.filter(item => item !== row.original.id));
                }
              }}
              style={{ cursor: "pointer", height: "20px", width: "20px", border: "1px solid #2CAE66", overflow: "hidden" }}

            // labelStyle={{ marginLeft: 5, userSelect: "none" }}
            // label="Have you started using it?"
            />
            <a
              href="https://www.google.com" //href={`#/${value}`}
              className="hover:underline"
              style={{
                color: "#103BD5",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "22px",
                textDecoration: "underline",
              }}
            >
              <p
                className="truncate max-w-24"
              >
                {cell.value}{" "}
              </p>
            </a>
          </div>

        ),
      },
      {
        Header: "Code",
        accessor: "upc",
        // width: "102px",
      },
      {
        Header: "Batch ID",
        accessor: "batchId",
        // width: "122px",
        // height: "40px",
      },
      {
        Header: (
          <>
            <TableDropdown title="Category" options={options1}/>
          </>
        ),
        accessor: "category",
        className: "truncate max-w-24"
        // width: "144px",
        // height: "40px",
      },
      {
        Header: (
          <>
            <select style={{ backgroundColor: "#E9E9E9" }}>
              <option default className="hidden">
                Expiry Date
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </>
        ),
        accessor: "expiryDate",
        // width: "122px",
        // height: "40px",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        // width: "102px",
        // height: "40px",
      },
      {
        Header: "Price($)",
        accessor: "price",
        // width: "102px",
        // height: "40px",
      },
      {
        Header: (
          <>
            <TableDropdown title="Availability" options={options}/>
          </>
        ),
        accessor: "availability",
        Cell: ({ row }) => {
          if (row.original.availability === "In Stock") {
            return <InStock />;
          } else if (row.original.availability === "Out of Stock") {
            return <OutOfStock />;
          } else if (row.original.availability === "Few Left") {
            return <FewLeft />;
          }
        },
        // width: "154px",
        // height: "40px",
      },
      {
        Header: "Committed",
        accessor: "committed",
        // width: "102px",
        // height: "40px",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ cell,row }) => (
          <div className="flex flex-row justify-center">
            <img
              src={bag}
              alt="icon"
              className="mr-3"
              onClick={handleImageClick1}
              style={{ cursor: "pointer" }}
            />
           {/* <Link to="/products/UpdateProduct" state={row}> */}
            <img
              src={edit}
              alt="icon"
              onClick={() => handleImageClick2(row)}
              style={{ cursor: "pointer" }}
              
            />
            {/* </Link> */}
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className=" overflow-auto ml-4 pt-3 border-solid border-red-500 ">
        <table className="table-auto border-collapse ">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="border border-1  px-4 py-2"
                    style={{
                      backgroundColor: "#E9E9E9",
                      borderColor: "#BDBDBD",
                      // width: column.width,
                      whiteSpace: "nowrap",
                      height: column.height,
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Roboto",
                      lineHeight: "22px",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className={"even-row"}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="border  px-4 py-2 h-4 "
                      style={{
                        color: "#343434",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "22px",
                        fontFamily: "Roboto",
                      }}
                    >
                      {cell.render("Cell")}
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
