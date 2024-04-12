import React, { useEffect, useCallback, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';

function DataTable() {
  const { filename } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (filename) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/data/${filename}`)
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    }
  }, [filename]);

  const updateMyData = (rowIndex, data) => {
    // Send the update request
    axios.post(`${process.env.REACT_APP_API_URL}/api/update-data`, data)
      .then(response => {
        console.log("Data updated:", response);
      })
      .catch(error => console.error("Error updating data:", error));
  };

  const deleteRow = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-data/${id}`)
        .then(response => {
          setData(currentData => currentData.filter(row => row.id !== id));
          console.log("Record deleted");
        })
        .catch(error => console.error("Error deleting data:", error));
    }
  };

  const columns = useMemo(() => {
    const cols = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'file_id').map(key => ({
      Header: key,
      accessor: key,
    })) : [];

    cols.push({
      id: 'actions',
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <button onClick={() => updateMyData(row.index, row.original)}>Save</button>
          <button onClick={() => deleteRow(row.original.id)}>Delete</button>
        </div>
      )
    });

    return cols;
  }, [data]);

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


export default DataTable;
