import './App.css';

import React, { Component } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import qs from 'query-string';

import ItemList from './ItemList';
import config from './config';

import logo from './logo.svg';

const api = axios.create({
  baseURL: config.API_HOST
});

const { Search } = Input;

class App extends Component {
  constructor(props) {
    super(props);

    this.searchRef = React.createRef();

    const {q} = qs.parse(window.location.search);
    this.state = {
      query: q,
      loading: Boolean(q),
      items: null
    };
  }

  componentDidMount() {
    this.setQuery();
  }

  setQuery = () => {
    let {q} = qs.parse(window.location.search);

    if (q) {
      this.setState({ query: q, loading: true }, () => {
        this.searchRef.current.input.blur(); // only work with delay
      });

      api.get('/search', {
        params: {
          q
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

    } else {
      this.searchRef.current.focus();
    }
  }

  onSearch = val => {
    val = val.trim();
    if (!val) {
      return;
    }

    window.history.pushState({}, null, '?' + qs.stringify({ q: val }));
    this.setQuery();
  }

  onItemClick = (index, item) => {
    const { query, items } = this.state;

    api.post('/click', {
      query,
      idx: index,
      total: items.length,
      url: item.url,
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
          {
            query ?
              (<a href={window.location.pathname}>
                <img src={logo} className="App-logo" alt="logo" />
              </a>) :
              <img src={logo} className="App-logo" alt="logo" />
          }
          <div className="App-search">
            <Search
              placeholder="input search text"
              size="large"
              onSearch={this.onSearch}
              defaultValue={query}
              ref={this.searchRef}
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
