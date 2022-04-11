import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import './styles.css';
import CardMedia from '@mui/material/CardMedia';


export default function ProductCard(props) {

    
    return (
      <div class="card my-2 shadow-2xl bg-white">
        <Card>
          <div class="card__content" >
            <CardContent >
              <Typography variant="h8" component="div">
                <Checkbox />
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
              <CardMedia
                component="img"
                sx={{ width: 125 }}
                image={require('./product_placeholder.png')}
                alt="Product image"
              />    
            </CardContent>      
          </div>
          <CardActions class="card__actions">
            <button></button> 
            <div className={props.hideButton? 'hideRemoveButton' : undefined}><button onClick={(e) => props.removeProduct(props.clicked, e)}>Remove from list&nbsp;&nbsp;&nbsp;</button></div>
          </CardActions>
        </Card>
        </div>
      );
}

/*                {props.weight} oz.
                <br />
                ${props.price}
                <br />
                {props.store}
                 */