import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import './styles.css';
import Navbar from '../../NavBar/Navbar'
import { useSnackbar } from 'notistack';
import AddProductDialog from "./AddProductDialog";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import ProductSearchBar from "./ProductSearchBar";


export function ProductSearch(props) {
  const [searchText, setSearchText] = useState(null)
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState({ column: undefined, value: undefined })
  const [sort, setSort] = useState({ column: undefined, order: undefined })
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(10)
  const { enqueueSnackbar } = useSnackbar();

  const auth = props.auth

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
          (pos) => { 
          alert("Successfully Retrieved Your Location"); console.log(pos)
          postLocationToDB(pos.coords)
        },
          (err) => { alert('Cannot Find Nearby Stores Without Location Access') })
      }
    }

  }, [location])

  async function postLocationToDB(pos) {
    console.log('Latitude: ' + pos.latitude)
    console.log(typeof pos.latitude)
    console.log('Longitude: ' + pos.longitude)
    console.log(typeof pos.longitude)
    let currentJWT;
    const uid = auth.currentUser.uid
    try {
      currentJWT = await auth.currentUser.getIdToken(true);
    } catch (err) {
      console.log("Error retrieving id token")
      console.log(err.message);
    } finally {
      // send request to API endpoint
      try {
        await axios.post(`https://bazaara-342116.uk.r.appspot.com/user/${uid}/location`,
          {
            "latitude": pos.latitude,
            "longitude": pos.longitude
          }, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
            "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
            "Authorization": currentJWT,
          }
        }).then((response) => {
          console.log('Response from ProductSearch#postLocationToDB')
          console.log(response)
        });
      } catch (error) {
        console.log('Error in ProductSearch#postLocationToDB')
        console.log(error)
      }
    }
  }

  useEffect(() => {
    console.log('Current Filter: column=' + filter.column + ' value=' + filter.value)
    console.log('Current Sort: column=' + sort.column + ' order=' + sort.order)
    console.log('Current Page: number=' + pageNumber + ' size=' + pageSize)
    console.log('Search text: ' + searchText)
    makeRequestForNewData(formatSearchParams())
  }, [pageNumber, pageSize, filter, sort, searchText])

  function determineFilterParam() {
    if (searchText) return ("name=" + searchText)
    if (!filter.column) return ""
    if (!filter.value) return ""

    switch (filter.column) {
      case 'store': return ("store=" + filter.value)
      case 'price': return ("price=" + filter.value)
      case 'name': return ("name=" + filter.value)
      default: return ""
    }
  }

  function determineSortParam() {
    if (!sort.column) return [null, null]

    let order = null
    switch (sort.order) {
      case "asc":
        order = 0
        break;
      case "desc":
        order = 1
        break;
      default:
        order = null
    }

    if (sort.column === 'distance') return ["sort=location", "order=" + order]

    return ["sort=" + sort.column, "order=" + order]
  }

  function determinePageParam() {
    return ("page=" + (pageNumber+1)) // backend starts counting at page 1
  }

  function formatSearchParams() {
    let response = "uid=" + auth.currentUser.uid + "&"
    const filterParam = determineFilterParam()
    console.log('filterParam=' + filterParam)
    if (filterParam) {
      response += filterParam + "&"
    }

    const [sortParam, orderParam] = determineSortParam()
    console.log('sortParam=' + sortParam)
    console.log('orderParam=' + orderParam)
    if (sortParam) {
      response += sortParam + "&" + orderParam + "&"
    }

    const pageParam = determinePageParam()
    console.log('pageParam=' + pageParam)
    if (pageParam) {
      response += pageParam + "&"
    }

    response = response.slice(0, -1)

    return response
  }

  const columns = [
    {
      renderCell: (params) => {
        return (
          <img src={params.row.image_url} alt={params.row.name} />
        )
      }
    },
    { field: 'id', hide: true, flex: 1 },
    { field: 'name', headerName: 'Product', minWidth: 150, flex: 2, valueFormatter: (params) => {
      if (params.value.includes(' ')) {
        const arrOrig = params.value.split(' ')
        const arrFormatted = arrOrig.map((word) => {
          return (word.slice(0,1).toUpperCase() + word.slice(1))
        })
        return arrFormatted.join(' ')
      }

      return (params.value.slice(0,1).toUpperCase() + params.value.slice(1))
    } },
    { field: 'price', headerName: 'Price', minWidth: 100, flex: 1, valueFormatter: (params) => {
      if (!params.value.toString().includes('.')) {
        return `$${params.value}.00`
      }

      // $5|.5 <-- this part has a length of 2 and not 3
      if (params.value.toString().slice(params.value.toString().indexOf('.')).length === 2) {
        return `$${params.value}0`
      }

      return `$${params.value}`
    }},
    { field: 'productId', hide: true},
    { field: 'store', headerName: 'Store', minWidth: 100, flex: 1, valueFormatter: (params) => {return `${params.value.name}`} },
    { field: 'distance', headerName: 'Distance to Store', minWidth: 150, flex: 1, valueFormatter: (params) => {return `${params.value.toFixed(2)} miles`}},
    { field: 'upc_code', hide: true },
    { field: 'weight', headerName: 'Weight', minWidth: 150, flex: 1 },
  ]

  async function makeRequestForNewData(searchParams) {
    let currentJWT;
    try {
      currentJWT = await auth.currentUser.getIdToken(true);
    } catch (err) {
      console.log("Error retrieving id token")
      console.log(err.message);
    } finally {
      // send request to API endpoint
      try {
        await axios.get(`https://bazaara-342116.uk.r.appspot.com/products/search?${searchParams}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
            "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
            "Authorization": currentJWT,
          }
        }).then((response) => {
          console.log('Response from ProductSearch#makeRequestForNewData')
          console.log(response)
          const responseData = response.data.message.map((row) => {
            row.id = row._id
          })
          setRows(response.data.message)
          setRowCount(response.data.total)

        });
        // generateSampleData()
      } catch (error) {

        console.log('Error in ProductSearch#makeRequestForNewData')
        console.log(error)
      }
    }
  }

  function generateSampleData() {
    let input = [
      { id: 1, name: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 2, name: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 3, name: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 4, name: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 5, name: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 6, name: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 7, name: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 8, name: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 9, name: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 10, name: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 11, name: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 12, name: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 13, name: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 14, name: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 15, name: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 16, name: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 17, name: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
      { id: 18, name: 'Apple', price: 3.99, store: 'Walmart', weight: 5.1 },
      { id: 19, name: 'Orange', price: 5.99, store: 'Target', weight: 6.7 },
      { id: 20, name: 'Cereal', price: 2.99, store: 'Fresh Grocer', weight: 14 },
    ]
    input.map((entry) => entry.img = require('./product_placeholder.png'))
    if (searchText)
      input = input.filter(item => item.name.toLowerCase().includes(searchText))

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

  function productClicked(param) {
    let variant = 'success'
    //alert(JSON.stringify(param.row.id));
    props.addProduct(param.row.id);
    //alert(JSON.stringify(props.lists[props.listIndex].name));
    enqueueSnackbar(param.row.name + " added to " + props.lists[props.listIndex].label + "!", { variant });
  }
  
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
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
            <br />
            <DataGrid
              rows={rows}
              columns={columns}
              page={pageNumber}
              pageSize={pageSize}
              rowCount={rowCount}
              autoHeight
              filterMode='server'
              sortingMode='server'
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
