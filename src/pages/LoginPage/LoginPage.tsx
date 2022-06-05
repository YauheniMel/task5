import React, { FC } from 'react';
import { Button, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const LoginPage: FC<any> = function () {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Welcome!</h2>
      </div>
      <form action="" className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>Login form</legend>
          <TextField
            required
            label="Login"
            name="login"
            size="small"
            fullWidth
            autoFocus
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            fullWidth
            size="small"
            autoComplete="current-password"
          />
          <div className={styles.action}>
            <Button type="submit" variant="contained">
              Authorization
            </Button>
            <NavLink className="link" to="/signup">
              SignUp
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
