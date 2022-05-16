import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import categoriesReducer from './store/reducers/categories'
import productsReducer from './store/reducers/products'
import authReducer from './store/reducers/auth'


const rootReducer = combineReducers({
  categories: categoriesReducer,
  products:productsReducer,
  auth:authReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

