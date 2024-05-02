import * as React from "react";
import { useTable } from "react-table";
import dummy from "./dummy.json";
import InStock from "./InStock";
import OutOfStock from "./OutOfStock";
import FewLeft from "./FewLeft";
import edit from '../Icons/edit.png'
import bag from '../Icons/shopping-bag.png'

function Material() {
  const handleImageClick1 = () => {
    console.log("edit icon was clicked");
  };
  const handleImageClick2 = () => {
    console.log("shopping-bag icon was clicked");
  };

 

  const data = React.useMemo(() => dummy, []);
  const columns = React.useMemo(
    () => [
      {
        Header: (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              style={{ height: "20px", width: "20px" }}
            />
            <p>Material Name</p>
          </div>
        ),
        accessor: "material_name",
        width: "228px",
        Cell: ({ cell }) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              style={{ height: "20px", width: "20px" }}
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
        accessor: "code",
        width: "102px",
      },
      {
        Header: "Batch ID",
        accessor: "batch_id",
        width: "122px",
        height: "40px",
      },
      {
        Header: (
          <>
            <select style={{ backgroundColor: "#E9E9E9" }}>
              <option default className="hidden">
                Category
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </>
        ),
        accessor: "category",
        width: "144px",
        height: "40px",
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
        accessor: "expiry_date",
        width: "122px",
        height: "40px",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        width: "102px",
        height: "40px",
      },
      {
        Header: "Price($)",
        accessor: "price",
        width: "102px",
        height: "40px",
      },
      {
        Header: (
          <>
            <select style={{ backgroundColor: "#E9E9E9" }}>
              <option default className="hidden">
                Availability
              </option>
              <option value="Option 1">In Stock</option>
              <option value="Option 2">Out of Stock</option>
              <option value="Option 3">Few Left</option>
            </select>
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
        width: "154px",
        height: "40px",
      },
      {
        Header: "Committed",
        accessor: "committed",
        width: "102px",
        height: "40px",
      },
      {
        Header: "Action",
        accessor: "action",
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
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>

      <div className=" overflow-auto ml-4 pt-3 pb-4" >
        <table className="table-auto border-collapse ">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="border border-1 border-dotted px-4 py-2"
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
            {rows.map((row,index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} 
                className={"even-row"}
                >
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
    </>
  );
}
export default Material;