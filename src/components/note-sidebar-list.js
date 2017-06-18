import React from 'react'
import NoteSidebarItem from './note-sidebar-item'

import { observer } from 'mobx-react'
import { map } from 'lodash'

const NoteSidebarList = ({ notes, changeActiveNote, active }) => {    
    return <div className="Notes_sidebar_content">        
            {map(notes, (note, key) => <NoteSidebarItem
                onClick={() => changeActiveNote(key)}
                key={key}
                description={note.description}
                isActive={key === active}/>)}
     </div>
};

export default observer(NoteSidebarList);