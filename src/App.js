import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Input } from 'antd';

import ItemList from './ItemList';

const { Search } = Input;

class App extends Component {
  state = {
    query: ''
  }

  onSearch = val => {
    val = val.trim();
    if (val != '') {
      this.setState({ query: val });
    }
  }

  render() {
    const { query } = this.state;

    let headerCls = 'App-header';
    if (query) {
      headerCls += ' App-header__squeezed';
    }

    return (
      <div className="App">
        <header className={headerCls}>
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-search">
            <Search
              placeholder="input search text"
              size="large"
              onSearch={this.onSearch}
            />
          </div>
        </header>
          {
            query && (
              <div className="App-content">
                <ItemList loading />
              </div>
            )
          }
      </div>
    );
  }
}

export default App;
