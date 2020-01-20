import './App.css';

import React, { Component } from 'react';
import axios from 'axios';
import { Input } from 'antd';

import ItemList from './ItemList';
import config from './config';

import logo from './logo.svg';

const api = axios.create({
  baseURL: config.API_HOST
});

const { Search } = Input;

class App extends Component {
  state = {
    query: '',
    loading: false,
    items: null
  }

  onSearch = val => {
    val = val.trim();
    if (!val) {
      return;
    }

    this.setState({
      query: val,
      loading: true
    });

    api.get('/search', {
      params: {
        q: val
      }
    }).then(resp => {
      if (resp.status !== 200) {
        throw Error(resp.data);
      }

      this.setState({
        items: resp.data,
        loading: false
      });
    });
  }

  onItemClick = (index, item) => {
    const { query, items } = this.state;

    api.post('/clicks', {
      clicks: [[query, item.url, index, items.length]],
      items: null,
      uid: null
    }).then(resp => {
      if (resp.status !== 200) {
        throw Error(resp.data);
      }
    });
  }

  render() {
    const { query, loading, items } = this.state;

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
                <ItemList
                  loading={loading}
                  items={items}
                  onItemClickHandler={this.onItemClick}
                />
              </div>
            )
          }
      </div>
    );
  }
}

export default App;
