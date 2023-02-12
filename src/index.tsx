import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { theme } from 'styles/theme';
import Form from 'routes/Form';
import Inputs from 'routes/Inputs';
import Checkboxes from 'routes/Checkboxes';
import Radios from 'routes/Radios';

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <React.StrictMode>
              <Routes>
                  <Route path="/" element={<App/>} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/inputs" element={<Inputs />} />
                  <Route path="/checkboxes" element={<Checkboxes />} />
                  <Route path="/radios" element={<Radios />} />
              </Routes>
          </React.StrictMode>
        </ThemeProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
