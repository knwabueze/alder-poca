import React from 'react'

import { truncate } from 'lodash'
import { observer } from 'mobx-react'

const NoteSidebarItem = ({ description, onClick, isActive }) => {

    let str = description;

    str = str.replace(/<br.*\/?>/gi, "\n");
    str = str.replace(/<(p)\b[^>]*>(.*?)<\/\1>/gi, "$2\n");
    str = str.replace(/<a.*href="(.*?)"\b[^>]*>(.*?)<\/a>/gi, "$2 (Link->$1)");
    str = str.replace(/<(h[1-6]{1})\b[^>]*>(.*?)<\/\1>/gi, '$2\n');
    str = str.replace(/<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>/gi, "$2");
    str = str.replace('&gt;', '>');   
    str = str.replace('&lt;', '<');
    str = str.replace('&#x27;', '\'');
    str = str.replace('&quot;', '"');

    const splitDescription = str.split('\n');


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