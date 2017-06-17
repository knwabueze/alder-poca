import React from 'react'
import NoteAddIcon from '../static/svg/note-add-icon'
import TrashIcon from '../static/svg/trash-icon';
import ShareIcon from '../static/svg/share-icon';
import InfoIcon from '../static/svg/info-icon'
import NoteSidebarList from '../components/note-sidebar-list'
import '../static/styles/notes.css'

import { inject, observer } from 'mobx-react'

class Notes extends React.Component {
    render() {
        const { notes } = this.props.notes;
        return (
            <section className="Notes" data-page="notes" >
                <aside className="Notes_sidebar">
                    <header className="Notes_header Notes_header--aside">
                        <NoteAddIcon onClick={() => this.props.notes.addNote('Hello', 'world')} className="Notes_icon--add-icon Notes_icon Notes_icon--hoverable" />
                        <input className="Notes_search" type="text" placeholder="Search Notes..." />
                    </header>
                    <NoteSidebarList notes={notes} />
                </aside>
                <main className="Notes_content">
                    <header className="Notes_header Notes_header--content">
                        <TrashIcon className="Notes_icon Notes_icon--hoverable" />
                        <ShareIcon className="Notes_icon Notes_icon--hoverable" />
                        <InfoIcon className="Notes_icon Notes_icon--hoverable" />
                    </header>
                    <div className="Notes_content_text">

                    </div>
                </main>
            </section>
        );
    }
}

export default inject("notes")(observer(Notes));