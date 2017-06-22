import React from "react";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
    editorContainer: {
        display: 'block',
        height: '90vh',
        flex: 9
    },
    editorContainerLight: {
        backgroundColor: '#fff',
        color: '#24272B'
    },
    editorContainerDark: {
        backgroundColor: '#2B2E32',
        color: '#D5D7D9'
    }
});

const NoteNoActiveNote = ({ theme }) => (
    <div className={css(styles.editorContainer,
        theme === 'dark' ? styles.editorContainerDark : styles.editorContainerLight)}>
    </div>
)

export default NoteNoActiveNote;