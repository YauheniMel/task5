import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './LoginPage.module.scss';

const LoginPage: React.FC<any> = function ({ login, name, createName }) {
  function handleSubmit(e: any) {
    e.preventDefault();

    login(name);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.dialog}>
        <DialogTitle>You must enter your name to log in.</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              label="Name"
              fullWidth
              variant="standard"
              value={name}
              required
              onChange={createName}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Enter</Button>
          </DialogActions>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
