import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { Skeleton, List, Avatar, Icon } from 'antd';

class ItemList extends PureComponent {
  static propTypes = {
    loading: propTypes.bool,
    items: propTypes.arrayOf(propTypes.object)
  }

  getDummyItems = () => {
    return [...Array(6).keys()].map(() => ({}));
  }

  render() {
    const { items, loading } = this.props;

    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={loading ? this.getDummyItems() : items}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <Skeleton loading={loading} active avatar />

            </List.Item>
          )}
        />
      </div>
    );
  }

}

export default ItemList;
