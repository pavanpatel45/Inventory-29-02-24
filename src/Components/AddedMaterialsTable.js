import React from "react";
import { useTable } from "react-table";
import edit from "../Icons/edit.png";

function AddedMaterialsTable({ data = [] }) {
  const handleImageClick1 = () => {
    console.log("edit icon was clicked");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <div className="flex items-center">
            <p>Material Code</p>
          </div>
        ),
        accessor: "materialCode",
        width: "212px",
        height: "40px",
        Cell: ({ cell }) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              style={{ height: "20px", width: "20px" }}
            />
            {cell.value}
          </div>
        ),
      },
      {
        Header: <span>Materials Name</span>,
        accessor: "materialName",
        width: "260px",
        height: "22px",
      },
      {
        Header: (
          <select style={{ backgroundColor: "#E9E9E9" }}>
            <option default className="hidden">
              Category
            </option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        ),
        accessor: "category",
        width: "200px",
        height: "40px",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        width: "200px",
        height: "40px",
      },
      {
        Header: "Unit",
        accessor: "unit",
        width: "200px",
        height: "40px",
      },
      {
        Header: "Action",
        accessor: "action",
        width: "200px",
        height: "40px",
        Cell: ({ cell }) => (
          <div className="flex flex-row justify-center">
            <img
              src={edit}
              alt="icon"
              className="mr-3"
              onClick={handleImageClick1}
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
    <div className="w-full h-full flex justify-center items-center pt-8 pl-3 pr-3">
      <table className="table-auto border-collapse w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-dotted px-4 py-2"
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
                    className="border px-4 py-2 h-4"
                    style={{
                      color: "#343434",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "22px",
                      fontFamily: "Roboto",
                      width: cell.column.width,
                      height: cell.column.height,
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
  );
}

export default AddedMaterialsTable;
