import React from "react";

import NoteSidebarList from "../components/note-sidebar-list";
import NoteSidebarHeader from "../components/note-sidebar-header";
import NoteContentHeader from "../components/note-content-header";
import NoteNoActiveNote from "../components/note-no-active-note";
import NoteActiveNote from "../components/note-active-note";
import MobxReactDevtools from "mobx-react-devtools";

import "../static/styles/notes.css";

import { inject, observer } from "mobx-react";
import { debounce, filter } from "lodash";
import { Plain, Raw } from "slate";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNote: null,
      searchbarState: ""
    };

    this.onAddIconClicked = debounce(this.onAddIconClicked, 100);
    this.onRemoveSelectedNote = debounce(this.onRemoveSelectedNote, 100);
  }

  componentWillUnmount() {
    this.props.notes.detatch();
  }

  onNoteSelect = key => {
    this.setState({ selectedNote: key });
  };

  onRemoveSelectedNote = () => {
    const { removeNote, notes } = this.props.notes;
    const { selectedNote } = this.state;

    const keys = notes.keys();
    const oldIndex = keys.indexOf(selectedNote);

    if (oldIndex === 0) {
      this.setState({ selectedNote: keys[oldIndex + 1] });
    } else if (keys.length > 0) {
      this.setState({ selectedNote: keys[oldIndex - 1] });
    } else {
      this.setState({ selectedNote: null });
    }

    removeNote(selectedNote);
  };

  onSearchbarChanged = event => {
    this.setState({
      searchbarState: event.target.value.toLowerCase()
    });
  };

  onAddIconClicked = () => {
    const { addNote } = this.props.notes;
    addNote(JSON.stringify(Raw.serialize(Plain.deserialize(""))));
  };

  render() {
    const { json, updateNote, findNote } = this.props.notes;

    const { selectedNote, searchbarState } = this.state;

    let filteredJson = searchbarState !== ""
      ? filter(json, o => {
          const json = JSON.parse(o.content);
          const content = Plain.serialize(
            Raw.deserialize(json, { terse: true })
          );
          return content.toLowerCase().includes(searchbarState);
        })
      : json;

    return (
      <section className="Notes" data-page="notes">
        <MobxReactDevtools />
        <aside className="Notes_sidebar">
          <NoteSidebarHeader
            onAddClicked={this.onAddIconClicked}
            onSearchbarChanged={this.onSearchbarChanged}
            searchbarState={searchbarState}
          />
          <NoteSidebarList
            notes={filteredJson}
            changeActiveNote={this.onNoteSelect}
            active={selectedNote}
          />
        </aside>
        <main className="Notes_content">
          <NoteContentHeader onTrashClicked={this.onRemoveSelectedNote} />
          {!!selectedNote
            ? <NoteActiveNote
                selectedNote={findNote(selectedNote)}
                updateContent={updateNote.bind(this.props.notes, selectedNote)}
              />
            : <NoteNoActiveNote />}
        </main>
      </section>
    );
  }
}

export default inject("notes")(observer(Notes));
