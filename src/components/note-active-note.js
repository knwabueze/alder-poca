import React from "react";
import _ from "lodash";

import { Editor, Raw, Plain } from "slate";
import { observer } from "mobx-react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  editorContainerDark: {
    backgroundColor: '#2B2E32',
    color: '#D5D7D9'
  },
  editorContainerLight: {
    backgroundColor: '#fff',
    color: '#24272B'
  },
  editorContainer: {
    display: 'block',
    height: '90vh',
    flex: 9,
    overflow: 'auto',
    maxHeight: '90vh'
  },
  editor: {
    marginTop: '3em',
    marginLeft: '3em',
    marginBottom: '3em',
    fontSize: 16,
    maxHeight: '72vh',
    maxWidth: '72vw'
  },
  editorPlaceholder: {
    ':focus': {
      opacity: '1'
    },
    opacity: 0.333
  }
});


class NoteActiveNote extends React.Component {
  state = {
    editor: Plain.deserialize("")
  };

  componentWillMount() {
    if (!_.isNil(this.props.selectedNote)) {
      const { selectedNote } = this.props;
      const json = JSON.parse(selectedNote.content);
      const content = Raw.deserialize(json, { terse: true });
      this.setState({ editor: content });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedNote.key !== nextProps.selectedNote.key) {
      const { selectedNote } = nextProps;
      const json = JSON.parse(selectedNote.content);
      const content = Raw.deserialize(json, { terse: true });
      this.setState({ editor: content });
    }
  }

  onChange = state => {
    this.setState({ editor: state });
  };

  onDocumentChange = (document, state) => {
    const { updateContent } = this.props;
    const content = JSON.stringify(Raw.serialize(state));
    updateContent(content);
  };

  render() {
    const { editor } = this.state;
    const { theme } = this.props;

    return (
      <div className={css(styles.editorContainer,
        theme === 'dark' ? styles.editorContainerDark : styles.editorContainerLight
      )} onClick={() => this.editor.focus()}>
        <Editor
          className={css(styles.editor)}
          placeholder="You can type text here..."
          placeholderClassName={css(styles.editorPlaceholder)}
          state={editor}
          onChange={this.onChange}
          onDocumentChange={this.onDocumentChange}
          ref={el => this.editor = el}
        />
      </div>
    );
  }
}

export default observer(NoteActiveNote);
