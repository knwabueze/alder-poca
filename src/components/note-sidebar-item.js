import React from "react";

import { truncate } from "lodash";
import { observer } from "mobx-react";
import { Plain, Raw } from "slate";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  sidebarItemContainer: {
    borderTop: 'solid 1px silver',
    borderBottom: 'solid 1px silver',
    borderRight: '#36393E'
  },
  sidebarItemContainerLight: {
    color: '#2B2E32'
  },
  sidebarItemContainerDark: {
    color: '#C2C2C2'
  },
  sidebarItemContainerActiveDark: {
    color: '#F26522',
    backgroundColor: '#2B2E32'
  },
  sidebarItemContainerActiveLight: {
    color: '#3383C4'
  },
  title: {
    fontWeight: 600,
    marginBottom: '1%',
    marginLeft: '4.7%'
  },
  faded: {
    opacity: 0.666
  },
  content: {
    marginTop: 0,
    marginLeft: '4.7%',
    fontWeight: 400
  }
});

const NoteSidebarItem = ({ theme, content, onClick, isActive }) => {
  const json = JSON.parse(content);
  let str = Plain.serialize(Raw.deserialize(json, { terse: true }));

  const splitContent = str.split("\n");

  const title = splitContent[0];
  const lastLine = splitContent.length !== 1 ? splitContent[1] : "";

  return (
    <div
      onClick={onClick}
      className={css(styles.sidebarItemContainer,
        theme === 'dark' ?
          styles.sidebarItemContainerDark :
          styles.sidebarItemContainerLight,
        isActive && (theme === 'dark' ?
          styles.sidebarItemContainerActiveDark :
          styles.sidebarItemContainerActiveLight))}
    >
      <h3
        className={css(styles.title, str === "" && styles.faded)}
      >
        {title !== ""
          ? truncate(title, {
            length: 32
          })
          : "Untitled Page"}
      </h3>
      <h5 className={css(styles.content)}>
        {truncate(lastLine, {
          length: 42
        })}
      </h5>
    </div>
  );
};

export default observer(NoteSidebarItem);
