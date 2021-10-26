import React from 'react';
import ReactDOM from 'react-dom';
import './StyleSheets/index.scss'
import App from './Main/App';
import reportWebVitals from './Main/reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Redux/reducer'
const store = createStore(reducer)
const theme = createTheme({
    palette:
    {
        primary:
        {
            main: '#5512B3'
        },
        secondary:
        {
            main: '#FF2C95'
        },
        error:
        {
            main: '#ff6085'
        },
        text:
        {
            primary: '#5512B3'
        },
        success:
        {
            main: '#9ad92f'
        },
        warning:
        {
            main: '#E0A510'
        },
    },
    typography:
    {
        fontFamily: ['"Montserrat"'].join(','),
    }
})

ReactDOM.render(<Provider store={ store }>
  <React.StrictMode>
      <ThemeProvider theme={ theme }>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>
</Provider>,
  document.getElementById('root')
)

reportWebVitals()
