import 'babel-polyfill';
import React from 'react';

import { observer } from 'mobx-react';
import { Editor } from 'draft-js'

class NoteEditor extends React.Component {
    render() {
        const {
            onDescriptionChange,
            descriptionState,
            onTitleChange,
            titleState } = this.props;
        return (
            <div className="Notes_content_text">
                <input
                    placeholder="Untitled..."
                    value={titleState}
                    onChange={onTitleChange}
                    type="text"
                    className="Notes_content_text_header" />
                <Editor
                    editorState={descriptionState}
                    onChange={onDescriptionChange} />
            </div>
        );
    }
}

export default observer(NoteEditor);