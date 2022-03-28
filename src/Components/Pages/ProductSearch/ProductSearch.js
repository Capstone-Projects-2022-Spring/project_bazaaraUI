import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import './styles.css';
// import SearchAppBar from '../../Search/Search';
import Navbar from '../../NavBar/Navbar'

import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const rows = [
  // { id: 1, col1: 'Hello', col2: 'World' },
  // { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  // { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'prod', headerName: 'Product', width: 150 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'store', headerName: 'Store', width: 150 },
];

export const ProductSearch = () => {
  const [searchText, setSearchText] = useState(null);
  const [rows, setRows] = useState( [] );
  const [filter, setFilter] = useState({ column: undefined, value: undefined })
  const [sort, setSort] = useState({ column: undefined, order: undefined })
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(10)

  useEffect(() => {
    makeRequestForNewData()
  }, [])

  useEffect(() => {
    console.log('Current Filter: column=' + filter.column + ' value=' + filter.value)
    console.log('Current Sort: column=' + sort.column + ' order=' + sort.order)
    console.log('Current Page: number=' + pageNumber + ' size=' + pageSize)
    console.log('Search text: ' + searchText)
    makeRequestForNewData()
  }, [pageNumber, pageSize, filter, sort, searchText])

  function makeRequestForNewData() {
    // send request to API endpoint
    generateSampleData()
  }

  function generateSampleData() {
    let input = []
    input.push( { id: 1, prod: 'Apple', price: '$3.00', store: 'Walmart' } )
    input.push( { id: 2, prod: 'Orange', price: '$5.00', store: 'Target' } )
    input.push( { id: 3, prod: 'Cereal', price: '$2.00', store: 'Fresh Grocer' } )
    if (searchText)
      input = input.filter(item => item.prod.toLowerCase().includes(searchText.toLowerCase()))
    setRows(input)
  }

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    console.log('searchtext: ' + searchText);
  };

  function handleFilterModelChange(model) {
    setFilter({ column: model.items[0].columnField, value: model.items[0].value })
  }

  function handleSortModelChange(model) {
    setSort({ column: model[0]?.field, order: model[0]?.sort })
  }

  function handlePageChange(page) {
    setPageNumber(page)
  }

  function handlePageSizeChange(pageSize) {
    setPageSize(pageSize)
  }

  return (
    <>
      <Navbar />
      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            autoFocus
            onChange={handleSearchTextChange}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: 300, width: '75%' }}>
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
            />
          </div>
        </div>
      </div >
    </>
  );
}
