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
        primary:
        {
            main: '#5512B3'
        },
        secondary:
        {
            main: '#1FCAFF'
        },
        error:
        {
            main: '#E01079'
        },
        text:
        {
            primary: '#5512B3'
            // default: '#17011C',
            // paper: '#17011C'
        }
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
