import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';

const ITEM_HEIGHT = 48;
//<button className="smallButton" onClick={props.handleRemoveList}>delete</button>
export default function ListManagementDropdown(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        
        <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >

        <MenuItem onClick={handleClose}>
            <RemoveCircleOutlineIcon />
            &nbsp;&nbsp;Remove Items
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Edit />
            &nbsp;&nbsp;Rename List
        </MenuItem>        
        <MenuItem onClick={props.handleRemoveList}>
            <DeleteIcon />
            &nbsp;&nbsp;Delete List
        </MenuItem>

        </Menu>
      </div>
      );
}