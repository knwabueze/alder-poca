import React from 'react'
import NoteSidebarItem from './note-sidebar-item'

import { observer } from 'mobx-react'
import { map } from 'lodash'

const NoteSidebarList = ({ notes }) => (
    <div className="Notes_sidebar_content">
        {map(notes, (note, idx) => <NoteSidebarItem key={idx} description={note.description} title={note.title} />)}
    </div>
);

export default observer(NoteSidebarList);