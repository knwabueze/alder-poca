import React from "react";

import { observer } from "mobx-react";
import { StyleSheet, css } from "aphrodite";
import search from '../static/svg/ic_search_black_24px.svg'

const styles = StyleSheet.create({
  searchBar: {
    opacity: 0.666,
    transition: 'opacity 0.3s ease-in-out',
    background: `var(--quartary-color) url(${search}) no-repeat center`,
    backgroundPositionX: '5%',
    ':focus': {
      outline: 'none',
      opacity: 1
    }
  }
});

const NoteSearchbar = ({ onChange, value }) =>
  <input
    onChange={onChange}
    value={value}
    className={`Notes_search ${css(styles.searchBar)}`}
    type="text"
    placeholder="Search Notes..."
  />;

export default observer(NoteSearchbar);
