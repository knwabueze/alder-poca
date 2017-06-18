import React from 'react'

import InfoIcon from '../static/svg/info-icon';
import TrashIcon from '../static/svg/trash-icon';
import ShareIcon from '../static/svg/share-icon';

const NoteContentHeader = ({ onTrashClicked }) => {
    return <header className="Notes_header Notes_header--content">
        <InfoIcon className="Notes_icon Notes_icon--hoverable" />
        <TrashIcon
            onClick={onTrashClicked}
            className="Notes_icon Notes_icon--hoverable" />
        <ShareIcon className="Notes_icon Notes_icon--hoverable" />
    </header>
}

export default NoteContentHeader;