import 'babel-polyfill';
import 'draft-js/dist/Draft.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

import React from 'react';
import Editor from 'draft-js-plugins-editor';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin'

import { observer } from 'mobx-react';

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [sideToolbarPlugin];

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
                    placeholder="You can type any type of text here."
                    editorState={descriptionState}
                    plugins={plugins}
                    onChange={onDescriptionChange}
                    ref={ref => this.editor = ref} />
                <SideToolbar />
            </div>
        );
    }
}

export default observer(NoteEditor);