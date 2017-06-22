import React from "react";

import InfoIcon from "../static/svg/info-icon";
import TrashIcon from "../static/svg/trash-icon";
import ShareIcon from "../static/svg/share-icon";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    height: '10vh',
    flex: 1
  },
  headerLight: {
    borderBottom: 'solid 1px hsla(214, 14%, 20%, 0.08)'
  },
  icon: {
    height: '22px',
    marginRight: '1%',
    transition: 'fill 0.1s ease',
  },
  iconLight: {
    fill: '#3383C4',
    ':hover': {
      fill: '#000',
      cursor: 'pointer'
    }
  },
  iconDark: {
    fill: '#F26522',
    ':hover': {
      fill: '#fff',
      cursor: 'pointer'
    }
  }
});

const NoteContentHeader = ({ onTrashClicked, theme, onToggleTheme }) => {
  return (
    <header className={css(styles.header, theme === 'light' && styles.headerLight)}>
      <InfoIcon
        onClick={onToggleTheme}
        className={css(styles.icon,
          theme === 'dark' ? styles.iconDark : styles.iconLight)} />
      <TrashIcon
        onClick={onTrashClicked}
        className={css(styles.icon,
          theme === 'dark' ? styles.iconDark : styles.iconLight)}
      />
      <ShareIcon className={css(styles.icon,
        theme === 'dark' ? styles.iconDark : styles.iconLight)} />
    </header>
  );
};

export default NoteContentHeader;
