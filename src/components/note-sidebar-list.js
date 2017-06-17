import React from 'react'
import NoteSidebarItem from './note-sidebar-item'

import { observer } from 'mobx-react'
import { map } from 'lodash'

const NoteSidebarList = ({ notes, changeActiveNote, active }) => (
    <div className="Notes_sidebar_content">
        {map(notes, (note, idx) => <NoteSidebarItem
            onClick={() => changeActiveNote(note.key)}
            key={note.key}
            description={note.description}
            isActive={note.key === active}
            title={note.title} />)}
    </div>
);

export default observer(NoteSidebarList);