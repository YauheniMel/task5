import React, { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { connect } from 'react-redux';
import HomePageContainer from './pages/HomePage/HomePageContainer';
import LoginPageContainer from './pages/LoginPage/LoginPageContainer';

const App: FC<any> = function ({ isAuth }) {
  useEffect(() => {}, [isAuth]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4d1d88',
        light: '#62727b',
      },
      secondary: {
        main: '#f8bbd0',
        light: '#efebe9',
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="home" /> : <Navigate to="login" />}
          />
          <Route
            path="login"
            element={
              isAuth ? <Navigate to="/" replace /> : <LoginPageContainer />
            }
          />
          <Route
            path="home"
            element={
              !isAuth ? <Navigate to="/" replace /> : <HomePageContainer />
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(App);
