import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import './styles.css';
import Navbar from '../../NavBar/Navbar'

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const input = [
  { id: 1, prod: 'Apple', price: '$3.00', store: 'Walmart' },
  { id: 2, prod: 'Orange', price: '$5.00', store: 'Target' },
  { id: 3, prod: 'Cereal', price: '$2.00', store: 'Fresh Grocer' },
  { id: 4, prod: 'Apple', price: '$3.00', store: 'Walmart' },
  { id: 5, prod: 'Orange', price: '$5.00', store: 'Target' },
  { id: 6, prod: 'Cereal', price: '$2.00', store: 'Fresh Grocer' },
  { id: 7, prod: 'Apple', price: '$3.00', store: 'Walmart' },
  { id: 8, prod: 'Orange', price: '$5.00', store: 'Target' },
  { id: 9, prod: 'Cereal', price: '$2.00', store: 'Fresh Grocer' },
  { id: 10, prod: 'Apple', price: '$3.00', store: 'Walmart' },
  { id: 11, prod: 'Orange', price: '$5.00', store: 'Target' },
  { id: 12, prod: 'Cereal', price: '$2.00', store: 'Fresh Grocer' },
  { id: 13, prod: 'Orange', price: '$5.00', store: 'Target' },
  { id: 14, prod: 'Cereal', price: '$2.00', store: 'Fresh Grocer' },
  { id: 15, prod: 'Apple', price: '$3.00', store: 'Walmart' },
  { id: 16, prod: 'Orange', price: '$5.00', store: 'Target' },
  { id: 17, prod: 'Cereal', price: '$2.00', store: 'Fresh Grocer' },
  { id: 18, prod: 'Apple', price: '$3.00', store: 'Walmart' },
  { id: 18, prod: 'Orange', price: '$5.00', store: 'Target' },
  { id: 19, prod: 'Cereal', price: '$2.00', store: 'Fresh Grocer' },
]

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border:'0.5px solid rgba(0 0 0 / 0.25)',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  margin:'14px 0px',
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
  color: '#A020F0',
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

const columns = [
  { field: 'prod', headerName: 'Product', width: 150 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'store', headerName: 'Store', width: 150 },
];

export function ProductSearch() {
  const [rows, setRows] = React.useState(input);

  const handleSearchTextChange = (event) => {
    const searchText = event.target.value.toLowerCase()
    setRows(input.filter(item => item.prod.toLowerCase().includes(searchText)))
    console.log('searchtext: ' + searchText)
  };

  function productClicked(param, event) {
    alert(JSON.stringify(param.row));
}

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ height: '80vh', width: '75%' }}>
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
          <DataGrid rows={rows} columns={columns} onRowClick={productClicked} autoPageSize />
        </div>
      </div>
    </>
  );
}
