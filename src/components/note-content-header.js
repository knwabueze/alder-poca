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
    height: '10vh'
  },
  icon: {
    fill: '#F26522',
    height: '22px',
    marginRight: '1%',
    transition: 'fill 0.1s ease',
    ':hover': {
      fill: '#fff',
      cursor: 'pointer'
    }
  }
});

const NoteContentHeader = ({ onTrashClicked }) => {
  return (
    <header className={css(styles.header)}>
      <InfoIcon className={css(styles.icon)} />
      <TrashIcon
        onClick={onTrashClicked}
        className={css(styles.icon)}
      />
      <ShareIcon className={css(styles.icon)} />
    </header>
  );
};

export default NoteContentHeader;
