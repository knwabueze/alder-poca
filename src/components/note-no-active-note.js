import React from "react";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
    editorContainer: {
        display: 'block',
        backgroundColor: '#2B2E32',
        color: '#D5D7D9',
        height: '90vh',
        flex: 9
    }
});

const NoteNoActiveNote = () => (
    <div className={css(styles.editorContainer)}>

    </div>
)

export default NoteNoActiveNote;