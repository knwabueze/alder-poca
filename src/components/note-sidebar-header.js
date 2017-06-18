import React from 'react';

import NoteAddIcon from '../static/svg/note-add-icon';
import NoteSearchbar from './note-searchbar';

const NoteSidebarHeader = ({ onAddClicked, searchbarState, onSearchbarChanged }) => {
    return <header className="Notes_header Notes_header--aside">
        <NoteAddIcon
            onClick={onAddClicked}
            className="Notes_icon--add-icon Notes_icon Notes_icon--hoverable" />
        <NoteSearchbar
            value={searchbarState}
            onChange={onSearchbarChanged} />
    </header>
}

export default NoteSidebarHeader;