import React from "react";

import { observer } from "mobx-react";
import { StyleSheet, css } from "aphrodite";
import search from '../static/svg/ic_search_black_24px.svg'

const styles = StyleSheet.create({
  searchBar: {
    opacity: 0.666,
    transition: 'opacity 0.3s ease-in-out',
    background: `url(${search}) no-repeat center`,
    backgroundPositionX: '5%',
    height: '2.5em',
    width: '66.66%',
    borderRadius: '20px',
    padding: 0,
    border: 'none',
    color: '#C2C2C2',
    fontFamily: '"Roboto", sans-serif',
    paddingLeft: '15%',
    ':focus': {
      outline: 'none',
      opacity: 1
    }
  },
  searchBarDark: {
    backgroundColor: '#2B2E32',
    color: '#C2C2C2',
    borderBottomColor: '#95989A'
  },
  searchBarLight: {
    backgroundColor: '#E8E8E8',
    color: '#95989A'
  }
});

const NoteSearchbar = ({ onChange, value, theme }) =>
  <input
    onChange={onChange}
    value={value}
    className={css(styles.searchBar,
      theme === 'dark' ? styles.searchBarDark : styles.searchBarLight)}
    type="text"
    placeholder="Search Notes..."
  />;

export default observer(NoteSearchbar);
