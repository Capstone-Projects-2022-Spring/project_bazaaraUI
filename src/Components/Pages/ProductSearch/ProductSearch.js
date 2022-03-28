import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import './styles.css';
import Navbar from '../../NavBar/Navbar'

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddProductDialog from "./AddProductDialog";

const input = [
  { id: 1, prod: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1},
  { id: 2, prod: 'Orange', price: 5.99, store: 'Target', weight:  6.7},
  { id: 3, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight:  14},
  { id: 4, prod: 'Apple', price: 3.99, store: 'Walmart', weight:  5.1},
  { id: 5, prod: 'Orange', price: 5.99, store: 'Target', weight:  6.7},
  { id: 6, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight:  14},
  { id: 7, prod: 'Apple', price: 3.99, store: 'Walmart', weight:  5.1},
  { id: 8, prod: 'Orange', price: 5.99, store: 'Target', weight:  6.7},
  { id: 9, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight:  14},
  { id: 10, prod: 'Apple', price: 3.99, store: 'Walmart', weight:  5.1},
  { id: 11, prod: 'Orange', price: 5.99, store: 'Target', weight:  6.7},
  { id: 12, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight:  14},
  { id: 13, prod: 'Orange', price: 5.99, store: 'Target', weight:  6.7},
  { id: 14, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight:  14},
  { id: 15, prod: 'Apple', price: 3.99, store: 'Walmart', weight:  5.1},
  { id: 16, prod: 'Orange', price: 5.99, store: 'Target', weight:  6.7},
  { id: 17, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight:  14},
  { id: 18, prod: 'Apple', price: 3.99, store: 'Walmart', weight:  5.1},
  { id: 19, prod: 'Orange', price: 5.99, store: 'Target', weight:  6.7},
  { id: 20, prod: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight:  14},
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
  { field: 'price', headerName: 'Price ($)', width: 150 },
  { field: 'store', headerName: 'Store', width: 150 },
  { field: 'weight', headerName: 'Weight (oz.)', width: 150 }
];

export function ProductSearch(props) {
  const [rows, setRows] = React.useState(input);
  const [message, setMessage] = React.useState("");

  const handleSearchTextChange = (event) => {
    const searchText = event.target.value.toLowerCase()
    setRows(input.filter(item => item.prod.toLowerCase().includes(searchText)))
    console.log('searchtext: ' + searchText)
  };

  function productClicked(param, event) {
    //alert(JSON.stringify(param.row.prod));
    props.addProduct(param.row.prod, param.row.weight, param.row.price, param.row.store);
    setMessage(param.row.prod + " added to " + props.lists[props.listIndex].name + "!");
    //alert(JSON.stringify(props.lists[props.listIndex].name));
    setTimeout(() => setMessage(""), 3000);
    
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
          <AddProductDialog lists={props.lists} selectedList={props.lists[props.listIndex]} changeList={props.changeList}/>
          {message}
          <br />
          <DataGrid rows={rows} columns={columns} onRowClick={productClicked} autoPageSize />
        </div>
      </div>
    </>
  );
}
