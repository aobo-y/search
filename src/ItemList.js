import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { Skeleton, List, Avatar } from 'antd';

import './ItemList.css';

class Item extends PureComponent {
  static propTypes = {
    item: propTypes.shape({
      url: propTypes.string,
      title: propTypes.string,
      subtitle: propTypes.string,
      desc: propTypes.string,
    }),
    onClickHandler: propTypes.func
  }

  render() {
    const { item, onClickHandler } = this.props;
    const url = new URL(item.url);

    return (
      <>
        <List.Item.Meta
          avatar={
            <Avatar
              size="small"
              shape="square"
              src={'https://www.google.com/s2/favicons?domain_url=' + url.host}>
                {item.title[0]}
            </Avatar>
          }
          title={
            <a
              className="title-anchor"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClickHandler}
            >
              {item.title}
            </a>
          }
          description={item.subtitle}
        />
        {item.desc}
      </>
    );
  }
}

class ItemList extends PureComponent {
  static propTypes = {
    loading: propTypes.bool,
    items: propTypes.arrayOf(propTypes.object),
    onItemClickHandler: propTypes.func
  }

  getDummyItems = () => {
    return [...Array(6).keys()].map(() => ({}));
  }

  render() {
    const { items, loading, onItemClickHandler } = this.props;

    return (
      <div>
        {loading || items.length + ' results'}
        <List
          className="search-list"
          itemLayout="vertical"
          size="large"
          dataSource={loading ? this.getDummyItems() : items}
          renderItem={(item, index) => (
            <List.Item key={index} >
              {loading ?
                <Skeleton loading={loading} active avatar /> :
                <Item item={item} onClickHandler={onItemClickHandler.bind(this, index, item)} />
              }
            </List.Item>
          )}
        />
      </div>
    );
  }

}

export default ItemList;
