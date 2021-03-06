import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './styles.css';
import CardMedia from '@mui/material/CardMedia';

// props.addToSavings
export default function ProductCard(props) {



  function handleChecked() {
    props.addToSavings(props.product._id);

  }

  function Checkbox() {
    if (!props.purchased) { // unchecked
      return <input type="checkbox" onChange={handleChecked} />
    } else { // checked
      return <input type="checkbox" checked readOnly/>
    }

    
  }
    
    return (
      <div class="card my-2 shadow-2xl bg-white">
        <Card>
          <div class="card__content" >
            <CardContent >
              <Typography variant="h8" component="div">
                <Checkbox />&nbsp;&nbsp;
                {props.product.name}
                <br />
                ${props.product.price}
                <br />
                ID: {props.product.productId}
                <br />
                Available at {props.product.store.name}
                <br />
                Barcode: {props.product.upc_code}
              </Typography>
              <Typography variant="body2">

              </Typography>
            </CardContent>
            <CardContent>
              <img className="productImage" src={props.product.image_url} alt={props.product.name} max-width="100px"/>
            </CardContent>      
          </div>
          <CardActions class="card__actions">
            <button></button> 

            
            <div className={props.hideButton? 'hideRemoveButton' : undefined}><div className='bg-green-500 rounded-full w-28 h-4 text-xs' ><button onClick={(e) => props.removeProduct(props.clicked, e)}>&nbsp;&nbsp;&nbsp;Remove from list&nbsp;&nbsp;&nbsp;</button></div></div>

          </CardActions>
        </Card>
        </div>
      );
}

// image url: `${props.product.image}` 


/*<Checkbox checked={checked}
                          onChange={handleChecked}
                          inputProps={{ 'aria-label': 'controlled' }} />*/