import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store';

// Testing Service Worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.addEventListener('controllerchange', function() {
//     window.location.reload();
//   });
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
