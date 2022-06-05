import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import HomePageContainer from './pages/HomePage/HomePageContainer';
import LoginPageContainer from './pages/LoginPage/LoginPageContainer';
import RegisterPageContainer from './pages/RegisterPage/RegisterPageContainer';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {}, [isAuth]);

  function toggle() {
    setIsAuth((value) => !value);
  }

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
            path="signup"
            element={
              isAuth ? <Navigate to="/" replace /> : <RegisterPageContainer />
            }
          />
          <Route
            path="home"
            element={
              !isAuth ? <Navigate to="/" replace /> : <HomePageContainer />
            }
          />
        </Routes>
        <button type="button" onClick={toggle}>
          Toggle Auth
        </button>
      </ThemeProvider>
    </div>
  );
}

export default App;
