//import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/sonner.jsx'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    <Toaster />
    </PersistGate>
    </Provider>
    </React.StrictMode>
)
