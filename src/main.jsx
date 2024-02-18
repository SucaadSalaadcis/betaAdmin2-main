import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient,  QueryClientProvider} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: '#9F0D7F',    
      dark:'#765827',
      light:"#E9F7EF"
    },    
    error:{
      main:"#EA1179",
      warning:"#E75E06",
      dark:'#765827',
    }
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
<QueryClientProvider client={queryClient} >
   <ThemeProvider theme={theme}>
    <BrowserRouter>
    
    <App />
   <ToastContainer/>
    </BrowserRouter>
    </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
