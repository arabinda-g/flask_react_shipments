import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';

function DataTable() {
  const { filename } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (filename) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/data/${filename}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => console.log(error));
    }
  }, [filename]);

  const columns = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).map(key => ({
        Header: key,
        accessor: key
      }));
    }
    return [];
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
                <span>
                  {column.isSorted ? (column.isSortedDesc ? 'DESC' : 'ASC') : ''}
                </span>
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
