import React from 'react'
import { truncate } from 'lodash'

import { observer } from 'mobx-react'

const NoteSidebarItem = ({ title, description, onClick, isActive }) => {
    return (
        <div
            onClick={onClick}
            className={`Notes_sidebar-item ${isActive ? 'Notes_sidebar-item--active' : ''}`}>
            <h3
                className={`Notes_sidebar-item_title ${title === '' ? 'Notes_sidebar-item_title--faded' : ''}`}>
                {title !== '' ? truncate(title, {
                    length: 32
                }) : 'Untitled Page'}
            </h3>
            <h5 className="Notes_sidebar-item_descr">{truncate(description, {
                length: 42
            })}</h5>
        </div>
    );
}

export default observer(NoteSidebarItem);