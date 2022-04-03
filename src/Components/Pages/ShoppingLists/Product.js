import * as React from 'react';
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
              {props.store}
            </Typography>
          </CardContent>
          <CardActions >
            <div className={props.hideButton? 'hideRemoveButton' : undefined}><button onClick={(e) => props.removeProduct(props.clicked, e)}>Remove from list</button></div>
          </CardActions>
        </Card>
      );
}
//this.setState({listIndex: newIndex})

//handleRemoveProduct={this.handleRemoveProduct} productIndex={this.state.productIndex}