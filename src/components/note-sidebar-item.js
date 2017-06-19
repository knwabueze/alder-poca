import React from 'react'

import { truncate } from 'lodash'
import { observer } from 'mobx-react'

const NoteSidebarItem = ({ description, onClick, isActive }) => {

    let str = description;

    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");

    str = str.replace(/<br.*\/?>/gim, "\n");
    str = str.replace(/<(p)\b[^>]*>(.*?)<\/\1>/gim, "$2\n");
    str = str.replace(/<a.*href="(.*?)"\b[^>]*>(.*?)<\/a>/gim, "$2 (Link->$1)");
    str = str.replace(/<(h[1-6]{1})\b[^>]*>(.*?)<\/\1>/gim, '$2\n');
    str = str.replace(/<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>/gim, "$2");
    str = str.replace(/&gt;/gim, '>');
    str = str.replace(/&lt;/gim, '<');
    str = str.replace(/&#x27;/gim, '\'');
    str = str.replace(/&quot;/gim, '"');
    str = str.replace(/&amp;/gim, '&');
    str = str.replace(/^[ \t]+/, '');

    const splitDescription = doc.children;
    console.log(splitDescription);

    const title = splitDescription[0].textContent;
    const lastLine = splitDescription.length !== 1 ? splitDescription[1].textContent : '';

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