import React from 'react'

import NoteAddIcon from '../static/svg/note-add-icon'
import TrashIcon from '../static/svg/trash-icon';
import ShareIcon from '../static/svg/share-icon';
import InfoIcon from '../static/svg/info-icon'
import NoteSidebarList from '../components/note-sidebar-list';
import NoteSearchbar from '../components/note-searchbar'
import NoteEditor from '../components/note-editor';
import NoNotes from '../components/no-notes'
import Devtools from 'mobx-react-devtools'

import '../static/styles/notes.css';

import { inject, observer } from 'mobx-react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { draftjsToMd, mdToDraftjs } from 'draftjs-md-converter';
import { filter } from 'lodash';

class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            descriptionState: EditorState.createEmpty(),
            titleState: '',
            selectedNote: null,
            searchbarState: ''
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.selectedNote !== this.state.selectedNote && nextProps.notes.finishedSetup) {
            const { findNote } = nextProps.notes;
            const note = findNote(nextState.selectedNote);
            const desc = !!note ? note.description : '';
            const description = mdToDraftjs(desc);
            const descriptionState = EditorState.push(this.state.descriptionState, convertFromRaw(description));

            this.setState({ titleState: !!note ? note.title : '' });
            this.setState({ descriptionState });
        } else if (nextProps.notes.finishedSetup && this.state.selectedNote === null && nextProps.notes.notes.length > 0) {
            this.setState({ selectedNote: nextProps.notes.notes[0].key });
        }
    }

    componentWillUnmount() {
        this.props.notes.detatch();
    }

    editorOnDescriptionChange = descriptionState => {
        const { selectedNote } = this.state;
        const { updateNoteDescription } = this.props.notes;        
        this.setState({ descriptionState });
        const content = descriptionState.getCurrentContent();
        const description = draftjsToMd(convertToRaw(content));
        updateNoteDescription(selectedNote, description)
    }

    editorOnTitleChange = event => {
        if (event.target.value.length <= 200) {
            const { selectedNote } = this.state;
            const { updateNoteTitle } = this.props.notes;
            updateNoteTitle(selectedNote, event.target.value);
            this.setState({ titleState: event.target.value })
        }
    }

    onNoteSelect = key => {
        this.setState({ selectedNote: key })
    }

    onRemoveSelectedNote = () => {
        const { removeNote, isEmpty, indexOf, notes } = this.props.notes;
        const { selectedNote } = this.state;

        if (!isEmpty) {
            const idxCurrentSelected = indexOf(selectedNote);
            const idxNewSelected = idxCurrentSelected !== 0 ? idxCurrentSelected - 1 : idxCurrentSelected + 1;

            const newSelectedNote = !!notes[idxNewSelected] ? notes[idxNewSelected].key : null;

            this.setState({ selectedNote: newSelectedNote })
            removeNote(selectedNote);
        }
    }

    onSearchbarChanged = event => {
        this.setState({ searchbarState: event.target.value.toLowerCase() });
    }

    onAddIconClicked = () => {
        const { addNote, notes } = this.props.notes;
        addNote('', '');

        this.setState({ selectedNote: notes[notes.length - 1].key })
    }

    render() {
        const { notes } = this.props.notes;

        const {
            descriptionState,
            selectedNote,
            titleState,
            searchbarState } = this.state;

        const filteredNotes = searchbarState === '' ? notes : filter(notes, n => { 
            const cond = n.title.toLowerCase().includes(searchbarState);
            return cond;
        })

        return (
            <section className="Notes" data-page="notes" >
                <Devtools />
                <aside className="Notes_sidebar">
                    <header className="Notes_header Notes_header--aside">
                       <NoteAddIcon
                            onClick={this.onAddIconClicked}
                            className="Notes_icon--add-icon Notes_icon Notes_icon--hoverable" />
                        <NoteSearchbar
                            value={searchbarState}
                            onChange={this.onSearchbarChanged} />
                    </header>
                    <NoteSidebarList
                        notes={filteredNotes}
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
                    { !!selectedNote ?
                    <NoteEditor
                        titleState={!!titleState ? titleState : ''}
                        onTitleChange={this.editorOnTitleChange}
                        descriptionState={descriptionState}
                        onDescriptionChange={this.editorOnDescriptionChange} />
                    : <NoNotes />}
                </main>
            </section>
        );
    }
}

export default inject("notes")(observer(Notes));