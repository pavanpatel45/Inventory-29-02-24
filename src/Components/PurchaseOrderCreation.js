import * as React from "react";
import { useTable } from "react-table";
import dummy from "./dummy.json";
import NavbarMaterials from "./NavbarMaterials";
import edit from '../Icons/edit.png'

function PurchaseOrderCreation() {
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
            <img src="./Tick.png" alt="" className="mr-2" />
            <p>PO No.</p>
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
           
                {cell.value}{" "}
              
          </div>
        ),
      },
     
      
      {
        Header: "Est. Arrival Date",
        accessor: "expiry_date",
        width: "122px",
        height: "40px",
      },
      {
        Header: "Order By",
        accessor: "code",
        width: "102px",
      },
      {
        Header: "Batch ID",
        accessor: "price",
        width: "102px",
        height: "40px",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        width: "102px",
        height: "40px",
      },
      
      
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ cell }) => (
            <img
              src={edit}
              alt="icon"
              onClick={handleImageClick2}
              style={{ cursor: "pointer" }}
            />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
     
     <div>
      <div>
       <NavbarMaterials
        title="Purchase Order View"
        // buttonStyle={buttonStyle}
        btnTitle="Add +"
      />
      </div>

      <div className="w-full h-full flex justify-center items-center pl-3 pr-3 mt-8">
        <table className="table-auto border-collapse w-full">
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
                      width: column.width,
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
    </>
  );
}
export default PurchaseOrderCreation
