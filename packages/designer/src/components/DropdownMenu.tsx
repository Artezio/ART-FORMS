import React from 'react';
import { DropdownMenuComponentProps } from '../interfaces/DropdownMenuComponentProps';

export const DropdownMenuComponent = (props: DropdownMenuComponentProps) => {
    const { items, title } = props;
    return <div>
        <button className="btn btn-secondary dropdown-toggle" role="button" id="context-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {title}
        </button>
        <div className="dropdown-menu" aria-labelledby="context-menu-link">
            {items.map((item, i) => <button key={i} className="dropdown-item btn" onClick={item.action}>{item.title}</button>)}
        </div>
    </div>
}

export default DropdownMenuComponent