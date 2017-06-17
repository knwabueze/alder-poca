import React from 'react'

import NoteAddIcon from '../static/svg/note-add-icon'
import TrashIcon from '../static/svg/trash-icon';
import ShareIcon from '../static/svg/share-icon';
import InfoIcon from '../static/svg/info-icon'
import NoteSidebarList from '../components/note-sidebar-list';
import NoteEditor from '../components/note-editor';
import Devtools from 'mobx-react-devtools'

import '../static/styles/notes.css';

import { inject, observer } from 'mobx-react';
import { EditorState, convertFromRaw } from 'draft-js';

class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            descriptionState: EditorState.createEmpty(),
            titleState: '',
            selectedNote: null
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if ((nextState.selectedNote !== this.state.selectedNote) && nextProps.notes.finishedSetup) {
            const { findNote } = nextProps.notes;
            const note = findNote(nextState.selectedNote);
            this.setState({ titleState: note.title });
        }
    }

    componentWillUnmount() {
        console.log('hit');
        this.props.notes.detatch();
    }

    editorOnDescriptionChange = descriptionState => {
        this.setState({ descriptionState });
    }

    editorOnTitleChange = event => {
        if (event.target.value.length <= 200) {
            const { selectedNote } = this.state;
            const { updateNoteTitle } = this.props.notes;

            const value = event.target.value !== '' ? event.target.value : 'Untitled...';

            updateNoteTitle(selectedNote, value);
            this.setState({ titleState: value })
        }
    }

    onNoteSelect = key => {
        this.setState({ selectedNote: key })
    }

    onRemoveSelectedNote = () => {
        const { removeNote, isEmpty } = this.props.notes;
        const { selectedNote } = this.state;

        if (!isEmpty) {
            removeNote(selectedNote);
        }
    }

    render() {
        const {
            notes,
            addNote } = this.props.notes;

        const {
            descriptionState,
            selectedNote,
            titleState } = this.state;

        return (
            <section className="Notes" data-page="notes" >
                <Devtools />
                <aside className="Notes_sidebar">
                    <header className="Notes_header Notes_header--aside">
                        <NoteAddIcon
                            onClick={() => addNote('Hello', 'world')}
                            className="Notes_icon--add-icon Notes_icon Notes_icon--hoverable" />
                        <input className="Notes_search" type="text" placeholder="Search Notes..." />
                    </header>
                    <NoteSidebarList
                        notes={notes}
                        changeActiveNote={this.onNoteSelect}
                        active={selectedNote} />
                </aside>
                <main className="Notes_content">
                    <header className="Notes_header Notes_header--content">
                        <InfoIcon className="Notes_icon Notes_icon--hoverable" />
                        <TrashIcon
                            onClick={this.onRemoveSelectedNote}
                            className="Notes_icon Notes_icon--hoverable" />
                        <ShareIcon className="Notes_icon Notes_icon--hoverable" />
                    </header>
                    <NoteEditor
                        titleState={!!titleState ? titleState : ''}
                        onTitleChange={this.editorOnTitleChange}
                        descriptionState={descriptionState}
                        onDescriptionChange={this.editorOnDescriptionChange} />
                </main>
            </section>
        );
    }
}

export default inject("notes")(observer(Notes));