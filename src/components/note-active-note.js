import React from "react";
import _ from "lodash";

import { Editor, Raw, Plain } from "slate";
import { observer } from "mobx-react";

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

    return (
      <div className="Notes_content_text">
        <Editor
          state={editor}
          onChange={this.onChange}
          onDocumentChange={this.onDocumentChange}
        />
      </div>
    );
  }
}

export default observer(NoteActiveNote);
