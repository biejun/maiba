import React from 'react';
import { connect } from 'dva';
import css from './search-bar.less';

import { searchMusic, getMusic } from '../services/music';

class SearchBar extends React.Component{

  constructor(props) {

    super(props);

    const {search} = this.props;

    this.state = {
      searchText: search.searchText,
      type: search.type,
      types: [
        {
          name: 'QQ音乐',
          code: 'tencent'
        },
        {
          name: '网易云',
          code: ''
        },
        {
          name: '虾米',
          code: ''
        },
        {
          name: '酷狗',
          code: ''
        }
      ]
    };
  }

  handleSearchInput(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleKeyPress(event) {
    if (event.which !== 13) return;

    //const { dispatch } = this.props;

    // searchMusic(event.target.value).then(res=> {
    //   dispatch({
    //     type: 'music/setData',
    //     payload: res
    //   });
    // });

    getMusic()
  }

  render() {

    return (
      <div className={css.search}>
        <div className={css['search-bar']}>
          <input type="text"
                 value={this.state.searchText}
                 placeholder="来了老弟，想听点啥..."
                 className={css['search-input']}
                 onChange={this.handleSearchInput.bind(this)}
                 onKeyPress={this.handleKeyPress.bind(this)}
          />
        </div>
        <div className={css['search-types']}>
          {
            this.state.types.map((item, index)=>
              <div key={index} className={css['search-type-tag']}>{item.name}</div>
            )
          }
        </div>
      </div>
    );
  }
}

export default connect((state) => (state))(SearchBar);
