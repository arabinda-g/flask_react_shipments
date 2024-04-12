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
    const updatedRows = data.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [columnId]: value };
      }
      return row;
    });
    setData(updatedRows);
  
    // Call api to update the data
    axios.post(`${process.env.REACT_APP_API_URL}/api/update-data`, updatedRows[rowIndex])
      .then(response => console.log("Data updated:", response))
      .catch(error => console.error("Error updating data:", error));
  };

  const addRow = () => {
    const newRow = { region: '', country: '', item_type: '', fiscal_year: '', sales_channel: '', order_priority: '', order_date: '', order_id: '', ship_date: '', units_sold: '', unit_price: '', unit_cost: '', total_revenue: '', total_cost: '', total_profit: '', email: '', file_id };
    setData([...data, newRow]);
  
    // Call api to create new data
    axios.post(`${process.env.REACT_APP_API_URL}/api/create-data`, newRow)
      .then(response => console.log("Data created:", response))
      .catch(error => console.error("Error creating data:", error));
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
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
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
