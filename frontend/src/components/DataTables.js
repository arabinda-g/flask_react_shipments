import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};


function DataTable() {
  const { filename: file_id } = useParams();
  const [data, setData] = useState([]);
  const [originalData] = useState([]);

  useEffect(() => {
    if (file_id) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/data/${file_id}`)
        .then(response => {
          setData(response.data);
          originalData.current = response.data;
        })
        .catch(error => console.log(error));
    }
  }, [file_id]);

  const updateMyData = (rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const addRow = () => {
    const newRow = { region: '', country: '', item_type: '', fiscal_year: '', sales_channel: '', order_priority: '', order_date: '', order_id: '', ship_date: '', units_sold: '', unit_price: '', unit_cost: '', total_revenue: '', total_cost: '', total_profit: '', email: '' };
    setData([...data, newRow]);
  };
  

  const columns = useMemo(() => data.length > 0 ? Object.keys(data[0]).map(key => {
    return {
      Header: key,
      accessor: key,
      Cell: EditableCell
    };
  }) : [], [data]);

  const tableInstance = useTable({
    columns,
    data,
    updateMyData,
    defaultColumn: { Cell: EditableCell },
  }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <button onClick={addRow}>Add Row</button>
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
    </>
  );
  
}


export default DataTable;
