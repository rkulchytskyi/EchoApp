import 'core-js';
import 'raf/polyfill';
import './polyfills';
import React from 'react'
import ReactDOM from 'react-dom'
import './scss/style.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Modal from 'react-modal';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { PersistGate } from 'redux-persist/integration/react'
Modal.setAppElement('#root');
const {store, persistor} = configureStore();

ReactDOM.render(
    <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
