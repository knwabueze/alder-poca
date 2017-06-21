import React from "react";

import { truncate } from "lodash";
import { observer } from "mobx-react";
import { Plain, Raw } from "slate";

const NoteSidebarItem = ({ content, onClick, isActive }) => {
  const json = JSON.parse(content);
  let str = Plain.serialize(Raw.deserialize(json, { terse: true }));

  const splitContent = str.split("\n");

  const title = splitContent[0];
  const lastLine = splitContent.length !== 1 ? splitContent[1] : "";

  return (
    <div
      onClick={onClick}
      className={`Notes_sidebar-item ${isActive
        ? "Notes_sidebar-item--active"
        : ""}`}
    >
      <h3
        className={`Notes_sidebar-item_title ${content === ""
          ? "Notes_sidebar-item_title--faded"
          : ""}`}
      >
        {title !== ""
          ? truncate(title, {
              length: 32
            })
          : "Untitled Page"}
      </h3>
      <h5 className="Notes_sidebar-item_descr">
        {truncate(lastLine, {
          length: 42
        })}
      </h5>
    </div>
  );
};

export default observer(NoteSidebarItem);
