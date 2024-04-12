import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import DataModal from './ModalComponent';

function DataTable() {
  const { file_id } = useParams();
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    if (file_id) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/data/${file_id}`)
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    }
  }, [file_id]);

  const addRow = () => {
    const newRow = {
      id: null,
      file_id: file_id,
      region: '',
      country: '',
      item_type: '',
      fiscal_year: '',
      sales_channel: '',
      order_priority: '',
      order_date: '',
      order_id: '',
      ship_date: '',
      units_sold: '',
      unit_price: '',
      unit_cost: '',
      total_revenue: '',
      total_cost: '',
      total_profit: '',
      email: ''
    };
    setCurrentData(newRow);
    setModalShow(true);
  };
  

  const handleEdit = (dataRow) => {
    setCurrentData({ ...dataRow });
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const apiURL = currentData.id
      ? `${process.env.REACT_APP_API_URL}/api/update-data`
      : `${process.env.REACT_APP_API_URL}/api/create-data`;

    axios.post(apiURL, currentData)
      .then(response => {
        if (currentData.id) {
          setData(data.map(item => item.id === currentData.id ? currentData : item));
        } else {
          setData([...data, response.data]);
        }
        handleClose();
      })
      .catch(error => console.error("Error saving data:", error));
  };

  
  const deleteRow = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-data/${id}`)
        .then(() => setData(currentData => currentData.filter(row => row.id !== id)))
        .catch(error => console.error("Error deleting data:", error));
    }
  };

  const headerMapping = {
    region: 'Region',
    country: 'Country',
    item_type: 'Item Type',
    fiscal_year: 'Fiscal Year',
    sales_channel: 'Sales Channel',
    order_priority: 'Order Priority',
    order_date: 'Order Date',
    order_id: 'Order ID',
    ship_date: 'Ship Date',
    units_sold: 'Units Sold',
    unit_price: 'Unit Price',
    unit_cost: 'Unit Cost',
    total_revenue: 'Total Revenue',
    total_cost: 'Total Cost',
    total_profit: 'Total Profit',
    email: 'Email'
  };
  
  const columns = useMemo(() => {
    const cols = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'file_id').map(key => ({
      Header: headerMapping[key] || key,
      accessor: key,
    })) : [];

    cols.push({
      id: 'actions',
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <button className="btn btn-primary" onClick={() => handleEdit(row.original)}>Edit</button>
          <button className="btn btn-danger" onClick={() => deleteRow(row.original.id)}>Delete</button>
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
    <>
      <button className="btn btn-success" onClick={() => addRow({})}>Add New</button>
      <table {...getTableProps()} className="table">
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
      <DataModal
        show={modalShow}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        data={currentData}
      />
    </>
  );
}

export default DataTable;
