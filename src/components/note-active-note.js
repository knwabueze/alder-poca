import 'babel-polyfill';
import 'draft-js/dist/Draft.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

import React from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import _ from 'lodash'

import { EditorState } from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert'
import { observer } from 'mobx-react';

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const plugins = [sideToolbarPlugin, emojiPlugin];

class NoteActiveNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editor: createEditorStateWithText('')
        }
    }

    componentWillMount() {
        const { props } = this;

        if (!_.isNil(props.activeNote)) {
            const state = convertFromHTML(props.notes[props.activeNote].description);

            this.setState({
                editor: EditorState.push(this.state.editor, state)
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeNote !== this.props.activeNote) {
            const state = convertFromHTML(nextProps.notes[nextProps.activeNote].description);

            this.setState({
                editor: EditorState.push(this.state.editor, state)
            });
        }
    }

    internalOnChange = editorState => {
        const { persistToDatabase, activeNote } = this.props;

        persistToDatabase(activeNote, convertToHTML(editorState.getCurrentContent()));
        this.setState({ editor: editorState });
    }

    render() {
        const {
            editor
         } = this.state;

        return (
            <div className="Notes_content_text">
                <Editor
                    placeholder="You can type any type of text here."
                    editorState={editor}
                    plugins={plugins}
                    onChange={this.internalOnChange} />
                <SideToolbar />
                <EmojiSuggestions />
            </div>
        );
    }
}

export default observer(NoteActiveNote);