import React from 'react'
import NoteSidebarItem from './note-sidebar-item'

import { CSSTransitionGroup } from 'react-transition-group'
import { observer } from 'mobx-react'
import { map } from 'lodash'

const NoteSidebarList = ({ notes, changeActiveNote, active }) => (
    // <div className="Notes_sidebar_content">
        <CSSTransitionGroup
            component="div"
            className="Notes_sidebar_content"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionName={{
                enter: "animated",
                enterActive: "slideInRight",
                leave: "animated",
                leaveActive: "slideOutRight"
            }}>
            {map(notes, (note, idx) => <NoteSidebarItem
                onClick={() => changeActiveNote(note.key)}
                key={note.key}
                description={note.description}
                isActive={note.key === active}
                title={note.title} />)}
        </CSSTransitionGroup>
    // </div>
);

export default observer(NoteSidebarList);