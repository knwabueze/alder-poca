import React from 'react'

import { observer } from 'mobx-react'

const NoteSearchbar = ({ onChange, value }) => (
    <input
        onChange={onChange}
        value={value}
        className="Notes_search"
        type="text"
        placeholder="Search Notes..." />
);

export default observer(NoteSearchbar);