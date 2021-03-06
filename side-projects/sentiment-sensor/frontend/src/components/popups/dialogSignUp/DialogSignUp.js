import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

export default function DialogSignUp(props) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetch('http://localhost:8000/users/', {
      method: 'POST',
      body: JSON.stringify({'user_id': userId, 'password': password}),
      headers: {
        'Content-Type': 'text/plain',
      },
    }).then(response => response.json())
      .then(jsonObj => {
        if (jsonObj['user_id'] === '') {
          alert('User Id has been used, choose another one');
        } else {
          document.cookie = "user_id=" + jsonObj['user_id'];
          window.location.reload(false);
        }
      });

    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="Sign-in">
      <DialogTitle id="form-dialog-title" onClose={props.onClose}>
        Sign Up
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          To sign-up, please enter your user id and password here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="User Id"
          type="text"
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClose}>
          Cancel
        </Button>

        <Button color="secondary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
}