import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain='dev-yelxnn51nvc257kn.us.auth0.com' clientId='b5ZiHqVKaDzRZmunZJ7w0pbiKD3K8P0v' authorizationParams={{
      redirect_uri: window.location.origin
    }}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
