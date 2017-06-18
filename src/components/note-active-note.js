import 'babel-polyfill';
import 'draft-js/dist/Draft.css';

import React from 'react';
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'

import { observer } from 'mobx-react';

class NoteActiveNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editor: EditorState.createEmpty()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeNote !== this.props.activeNote) {
            const blocksFromHTML = convertFromHTML(nextProps.notes[nextProps.activeNote].description);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap);

            this.setState({
                editor: EditorState.push(this.state.editor, state)
            });
        }
    }

    internalOnChange = editorState => {
        const { onChange } = this.props;

        onChange(stateToHTML(this.state.editor.getCurrentContent()));
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
                    onChange={this.internalOnChange} />
            </div>
        );
    }
}

export default observer(NoteActiveNote);