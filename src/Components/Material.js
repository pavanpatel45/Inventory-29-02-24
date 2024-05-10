import * as React from "react";
import axios from "axios";
import { useTable } from "react-table";
import InStock from "./InStock";
import OutOfStock from "./OutOfStock";
import FewLeft from "./FewLeft";
import edit from "../Icons/edit.png";
import bag from "../Icons/shopping-bag.png";
import hover from "../Icons/Group 35195.svg";
import * as Icon from "react-icons/fi";
import Checkbox from "react-custom-checkbox";
import "../CSS/OrderDropdown.css";
import { api_url } from "../Data/Constants";
import "../CSS/OrderDropdown.css";
import TableDropdown from "./TableDropdown";

function Material({ setSelected, selected, materialsTableData, data }) {
  const [option1, setOption1] = React.useState([]);
  const handleImageClick1 = () => {
    console.log("edit icon was clicked");
  };
  const handleImageClick2 = () => {
    console.log("shopping-bag icon was clicked");
  };
  const handleCheck = (id) => {
    // console.log("at handleCheck :",id);
    // console.log("selected at handlecheck:",selected);
    if (selected.includes(id)) {
      // console.log("return true");
      return true;
    } else {
      // console.log("return false");
      return false;
    }
  };
  React.useEffect(() => {
    console.log("selected array:", selected);
  }, [selected]);
  const getCategory = async () => {
    const url = `${api_url}/getAllMaterialCategory`;
    try {
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      // console.log("at api-data Category DAta: ", response);

      if (response?.status === 200) {
        console.log("API Data: Category DAta", response?.data);
        const option = response?.data;
        setOption1([]);
        option.map((ele) => {
          setOption1((prev) => {
            return [
              ...prev,
              {
                value: ele.value,
                label: ele.value,
              },
            ];
          });
        });
      } else {
        console.error("Received unexpected response:", response);
      }
    } catch (error) {
      return null;
    }
  };
  React.useEffect(() => {
    getCategory();
  }, []);

  // const data1 = React.useMemo(() => data, [selected]);
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

  // const options1 = [
  //   {
  //     value: "fillersBinders",
  //     label: "Fillers and Binders",

  //   },
  //   {
  //     value: "solvents",
  //     label: "Solvents",

  //   },
  //   {
  //     value: "stabilizersLubricants",
  //     label: "Stabilizers and Lubricants",

  //   },
  //   {
  //     value: "preservatives",
  //     label: "Preservatives",

  //   },
  //   {
  //     value: "modifiersAdditives",
  //     label: "Modifiers and Additives",

  //   },
  // ];

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
              style={{
                cursor: "pointer",
                height: "20px",
                width: "20px",
                border: "1px solid #2CAE66",
                overflow: "hidden",
              }}
            />
            <p>Material Name</p>
          </div>
        ),
        accessor: "materialName",
        //width: "200px",

        Cell: ({ cell, row }) => (
          <div
            className="relative flex items-center gap-2"
            onMouseEnter={() => {
              const img = document.getElementById(`image-${row.original.id}`);
              if (img) {
                img.style.display = "block";
              }
            }}
            onMouseLeave={() => {
              const img = document.getElementById(`image-${row.original.id}`);
              if (img) {
                img.style.display = "none";
              }
            }}
          >
             <div
      id={`image-${row.original.id}`}
      className="hover-image"
      style={{
        display: "none", // Initially hidden
        position: "absolute",
        marginLeft:"20px",
        top: "50%", // Center vertically
        //transform: "translateY(-50%)", // Center vertically
      }}
    >
            <img
              src={hover}
              alt="Hover Image"
              style={{
                width: "148px", // Adjust size as needed
                height: "44px",
              }}
            />
            </div>
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
              onChange={(value, event) => {
                console.log("Selected checkbox has id :", row.original);

                if (value == true) {
                  console.log("selected Array true:", selected);
                  setSelected((prevSelected) => {
                    if (!prevSelected.includes(row.original.id)) {
                      return [...prevSelected, row.original.id];
                    } else {
                      return prevSelected;
                    }
                  });
                } else if (value == false) {
                  console.log("selected Array false:", selected);
                  return setSelected((prevSelected) =>
                    prevSelected.filter((item) => item !== row.original.id)
                  );
                }
              }}
              style={{
                cursor: "pointer",
                height: "20px",
                width: "20px",
                border: "1px solid #2CAE66",
                overflow: "hidden",
              }}
              checked={handleCheck(row.original.id)}
            />
            <a
              href="https://www.google.com"
              className="hover:underline"
              style={{
                color: "#103BD5",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "22px",
                textDecoration: "underline",
              }}
            >
              <p className="truncate max-w-24">{cell.value} </p>
            </a>
          </div>
        ),
      },
      {
        Header: "Code",
        accessor: "upc",
        width: "102px",
      },
      {
        Header: "Batch ID",
        accessor: "batchId",
        width: "122px",
        // height: "40px",
      },
      {
        Header: (
          <>
            <TableDropdown title="Category" options={option1} />
          </>
        ),
        accessor: "category",
        className: "truncate max-w-24",
        width: "144px",
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
        width: "122px",
        // height: "40px",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        width: "102px",
        // height: "40px",
      },
      {
        Header: "Price($)",
        accessor: "price",
        width: "102px",
        // height: "40px",
      },
      {
        Header: (
          <div className="z-50">
            <TableDropdown title="Availability" options={options} />
          </div>
        ),
        accessor: "availability",
        Cell: ({ value }) => {
          if (value === "In Stock") {
            return <InStock />;
          } else if (value === "Out of Stock") {
            return <OutOfStock />;
          } else if (value === "Few Left") {
            return <FewLeft />;
          } else {
            return value; // Render the actual data value if it doesn't match any of the conditions
          }
        },
        width: "154px",
        justifyContent: "center",
        alignItems: "center",
      },

      {
        Header: "Committed",
        accessor: "committed",
        width: "102px",
        // height: "40px",
      },
      {
        Header: "Action",
        accessor: "action",
        width: "102px",
        Cell: ({ cell }) => (
          <div className="flex flex-row justify-center">
            <img
              src={bag}
              alt="icon"
              className="mr-3"
              onClick={handleImageClick1}
              style={{ cursor: "pointer" }}
            />
            <img
              src={edit}
              alt="icon"
              onClick={handleImageClick2}
              style={{ cursor: "pointer" }}
            />
          </div>
        ),
      },
    ],
    [option1, selected]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className=" overflow-auto ml-4 pt-3 border-solid border-red-500 ">
        <table {...getTableProps()} className="table-auto border-collapse ">
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
              // console.log("row===>>sdgd", row);
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
                        width: cell.column.width,
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
export default Material;
