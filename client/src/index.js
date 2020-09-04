import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import store from './store'
import './Resources/css/styles.css'

const App = (props) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
  </Provider>  
)

ReactDOM.render(<App />, document.getElementById('root'))