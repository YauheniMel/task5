import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './LoginPage.module.scss';

const LoginPage: React.FC<any> = function ({ login, name, createName }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.dialog}>
        <DialogTitle>You must enter your name to log in.</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={createName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => login(name)}>Enter</Button>
        </DialogActions>
      </div>
    </div>
  );
};

export default LoginPage;
