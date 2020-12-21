import './App.css';
import { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux'
// import {createStore} from 'redux';
// import { Reducer, initialState } from './redux/reducer'

// const store = createStore(
//   Reducer, // reducer
//   initialState, // our initialState
// );

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();


class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
