import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import './styles.css';


export default function ProductCard(props) {

    return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            
            <Typography variant="h8" component="div">
              <Checkbox />
              {props.name}
            </Typography>
            <Typography variant="body2">
              {props.weight} oz.
              <br />
              ${props.price}
              <br />
              {props.clicked}
            </Typography>
          </CardContent>
          <CardActions >
            <Button class='deleteproductbutton' size="small" onClick={(e) => props.removeProduct(props.clicked, e)}>Remove from list</Button>
          </CardActions>
        </Card>
      );
}
//this.setState({listIndex: newIndex})

//handleRemoveProduct={this.handleRemoveProduct} productIndex={this.state.productIndex}