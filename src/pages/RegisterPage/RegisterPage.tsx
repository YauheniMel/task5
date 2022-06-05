import React, { FC } from 'react';
import { Button, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './RegisterPage.module.scss';

const RegisterPage: FC<any> = function () {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Welcome!</h2>
      </div>
      <form
        action=""
        className={styles.form}
        autoComplete="none"
        encType="multipart/form-data"
      >
        <fieldset className={styles.fieldset}>
          <legend>Please sign up!</legend>
          <TextField
            required
            label="Name"
            name="firstName"
            autoFocus
            fullWidth
            size="small"
          />
          <TextField
            required
            label="Surname"
            name="lastName"
            fullWidth
            size="small"
          />
          <TextField
            required
            type="email"
            label="Email"
            name="email"
            fullWidth
            size="small"
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            size="small"
            fullWidth
          />
          <div className={styles.action}>
            <div className={styles.buttons}>
              <Button type="reset" variant="contained">
                Reset
              </Button>
              <Button type="submit" variant="contained">
                Register
              </Button>
            </div>
            <NavLink className="link" to="/login">
              Login
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
