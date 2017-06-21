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
    borderBottom: 'solid 1px #95989A'
  },
  icon: {
    transition: 'fill 0.1s ease',
    marginRight: '4.2%',
    height: '22px',
    fill: '#F26522',
    ':hover': {
      fill: '#fff',
      cursor: 'pointer'
    }
  }
});

const NoteSidebarHeader = ({
  onAddClicked,
  searchbarState,
  onSearchbarChanged
}) => {
  return (
    <header className={css(styles.header)}>
      <NoteAddIcon
        onClick={onAddClicked}
        className={css(styles.icon)}
      />
      <NoteSearchbar value={searchbarState} onChange={onSearchbarChanged} />
    </header>
  );
};

export default NoteSidebarHeader;
