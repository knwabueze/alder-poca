import React from 'react'
import NoteSidebarItem from './note-sidebar-item'

import { observer } from 'mobx-react'
import { map } from 'lodash'
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        flex: '9'
    }
});

const NoteSidebarList = ({ theme, notes, changeActiveNote, active }) => {    
    return <div className={css(styles.content)}>        
            {map(notes, (note, key) => <NoteSidebarItem
                theme={theme}
                onClick={() => changeActiveNote(key)}
                key={key}
                content={note.content}
                isActive={key === active}/>)}
     </div>
};

export default observer(NoteSidebarList);