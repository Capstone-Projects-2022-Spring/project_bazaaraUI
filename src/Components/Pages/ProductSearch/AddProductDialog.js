import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeCurrentList = (index) => {
      setOpen(false);
      props.changeList(index);
  }

  return (
    <div>
      <button onClick={handleClickOpen} className="px-2 py-1 text-sm rounded-full text-white bg-purple-600">
        Adding Products To: {props.selectedList.label}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select your current shopping list:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          To add products to your shopping list, select the list you would like to add products to.
          Once you have selected a list, clicking any product's row will add the product to your
          selected list.
          </DialogContentText>
        </DialogContent>

        <List sx={{ pt: 0 }}>
            {props.lists.map((list, index) => (
                <ListItem><button className="px-2 py-1 text-sm rounded-full text-white bg-purple-600" onClick={() => changeCurrentList(index)}>{list.label} </button></ListItem>

            ))}
        </List>
      </Dialog>
    </div>
  );
}