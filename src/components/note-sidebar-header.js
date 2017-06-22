import React from "react";

import NoteAddIcon from "../static/svg/note-add-icon";
import NoteSearchbar from "./note-searchbar";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  header: {
    display: 'inline-flex',
    boxSizing: 'border-box',
    height: '10vh',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderBottom: 'solid 1px #95989A',
    flex: 1
  },
  icon: {
    transition: 'fill 0.1s ease',
    marginRight: '4.2%',
    height: '22px'
  },
  iconDark: {
    fill: '#F26522',
    ':hover': {
      fill: '#fff',
      cursor: 'pointer'

    }
  },
  iconLight: {
    fill: '#3383C4',
    ':hover': {
      fill: '#000',
      cursor: 'pointer'
    }
  }
});

const NoteSidebarHeader = ({
  onAddClicked,
  searchbarState,
  onSearchbarChanged,
  theme
}) => {
  return (
    <header className={css(styles.header)}>
      <NoteAddIcon
        onClick={onAddClicked}
        className={css(styles.icon,
          theme === 'dark' ? styles.iconDark : styles.iconLight)}
      />
      <NoteSearchbar
        theme={theme}
        value={searchbarState}
        onChange={onSearchbarChanged}
      />
    </header>
  );
};

export default NoteSidebarHeader;
