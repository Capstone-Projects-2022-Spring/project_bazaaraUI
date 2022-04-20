import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import './styles.css';
import Navbar from '../../NavBar/Navbar'

import AddProductDialog from "./AddProductDialog";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import ProductSearchBar from "./ProductSearchBar";

export function ProductSearch(props) {
  const [searchText, setSearchText] = useState(null)
  const [message, setMessage] = React.useState("")
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState({ column: undefined, value: undefined })
  const [sort, setSort] = useState({ column: undefined, order: undefined })
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(10)

  // a state to store the location 
  const [location, setLocation] = useState()

  useEffect(() => {
    makeRequestForNewData()
  }, [])
  useEffect(() => {

    if (!location) {
      if (!navigator.geolocation) {
        alert('Your browser does not support gelocation')
      }
      else {

        navigator.geolocation.getCurrentPosition(
          (pos) => { alert("Successfully Retrieved Your Location"); console.log(pos) },
          (err) => { alert('Cannot Find Nearby Stores Without Location Access') })
      }
    }

  }, [location])

  useEffect(() => {
    console.log('Current Filter: column=' + filter.column + ' value=' + filter.value)
    console.log('Current Sort: column=' + sort.column + ' order=' + sort.order)
    console.log('Current Page: number=' + pageNumber + ' size=' + pageSize)
    console.log('Search text: ' + searchText)
    makeRequestForNewData()
  }, [pageNumber, pageSize, filter, sort, searchText])

  const columns = [
    {
      renderCell: (params) => {
        return (
          <img src={params.row.img} alt={params.row.prod} />
        )
      }
    },
    { field: 'prod', headerName: 'Product', width: 150 },
    { field: 'price', headerName: 'Price ($)', width: 150 },
    { field: 'store', headerName: 'Store', width: 150 },
    { field: 'weight', headerName: 'Weight (oz.)', width: 150 }
  ]

  function makeRequestForNewData() {
    // send request to API endpoint
    generateSampleData()
  }

  function generateSampleData() {
    let input = [
      { id: 1, prod: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 2, prod: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 3, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 4, prod: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 5, prod: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 6, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 7, prod: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 8, prod: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 9, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 10, prod: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 11, prod: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 12, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 13, prod: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 14, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 15, prod: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 16, prod: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 17, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 18, prod: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 19, prod: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 20, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
    ]
    input.map((entry) => entry.img = require('./product_placeholder.png'))
    if (searchText)
      input = input.filter(item => item.prod.toLowerCase().includes(searchText))

    setRowCount(input.length)
    input = input.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
    setRows(input)
  }

  

  function handleFilterModelChange(model) {
    setFilter({ column: model.items[0].columnField, value: model.items[0].value })
  }

  function handleSortModelChange(model) {
    //setShowLocation(true)
    setSort({ column: model[0]?.field, order: model[0]?.sort })
  }

  function handlePageChange(page) {
    setPageNumber(page)
  }

  function handlePageSizeChange(pageSize) {
    setPageSize(pageSize)
  }

  function productClicked(param, event) {
    //alert(JSON.stringify(param.row.prod));
    props.addProduct(param.row.prod, param.row.weight, param.row.price, param.row.store);
    setMessage(param.row.prod + " added to " + props.lists[props.listIndex].name + "!");
    //alert(JSON.stringify(props.lists[props.listIndex].name));
    setTimeout(() => setMessage(""), 3000);
  }
  
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  return (
    <>
      <Navbar />
      <section className='min-h-screen-2xl mb-[200px]'>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: '100vh', width: '75%' }}>
            <ProductSearchBar handleSearchTextChange={handleSearchTextChange} value={searchText} />
            <div className="userOptions">
              <AddProductDialog lists={props.lists} selectedList={props.lists[props.listIndex]} changeList={props.changeList} />
              <Link to={`/lists`} className='px-1 py-1 text-sm rounded-full text-white bg-purple-600'><ArrowBackIcon />Back to Shopping Lists</Link>
            </div>
            {message}

            <br />
            <DataGrid
              rows={rows}
              columns={columns}
              page={pageNumber}
              pageSize={pageSize}
              rowCount={rowCount}
              filterMode='server'
              sortingMode='sever'
              paginationMode='server'
              onFilterModelChange={handleFilterModelChange}
              onSortModelChange={handleSortModelChange}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onRowClick={productClicked}
            />
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}
