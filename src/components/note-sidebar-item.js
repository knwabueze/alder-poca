import React from 'react'
import { truncate } from 'lodash'

import { observer } from 'mobx-react'

const NoteSidebarItem = ({ description, onClick, isActive }) => {
    const splitDescription = description
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&nbsp;/g, ' ')
        .split(`\n`);

    const title = splitDescription[0];
    const lastLine = splitDescription.length !== 1 ? splitDescription[1] : '';

    return (
        <div
            onClick={onClick}
            className={`Notes_sidebar-item ${isActive ? 'Notes_sidebar-item--active' : ''}`}>
            <h3
                className={`Notes_sidebar-item_title ${description === '' ? 'Notes_sidebar-item_title--faded' : ''}`}>
                {title !== '' ? truncate(title, {
                    length: 32
                }) : 'Untitled Page'}
            </h3>
            <h5 className="Notes_sidebar-item_descr">{truncate(lastLine, {
                length: 42
            })}</h5>
        </div>
    );
}

export default observer(NoteSidebarItem);