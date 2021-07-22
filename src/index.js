import React from 'react';
import ReactDOM from 'react-dom';
import './StyleSheets/index.scss'
import App from './Main/App';
import reportWebVitals from './Main/reportWebVitals';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Redux/reducer'
const store = createStore(reducer)
const theme = createTheme({
    palette:
    {
        type: 'dark',
        primary:
        {
            main: '#D366FC'
        },
        secondary:
        {
            main: '#5512B3'
        },
        text :
        {
            primary: '#FFFFFF',
        },
        background:
        {
            default: '#17011C',
            paper: '#17011C'
        }
    },
    shape:
    {
        borderRadius: 30
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
