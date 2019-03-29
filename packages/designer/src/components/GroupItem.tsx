import * as React from 'react';
import GroupItemProps from '../interfaces/components/GroupItem';
import DropdownMenu from './DropdownMenu';
import ItemProvider from './ItemProvider';
import useObservableModel from '../HOCs/useObservableModel';

export class GroupItem extends React.Component<GroupItemProps> {
    render() {
        const { item } = this.props;
        return <div className="border border-primary my-1 p-3">
            <div className="d-flex justify-content-end m-1">
                <DropdownMenu title="Context menu" items={[    //// Optimize
                    { title: 'Remove item', action: item.remove.bind(item) },
                    { title: 'Add Item', action: item.addItem.bind(item) },
                    { title: 'Add TextItem', action: item.addTextItem.bind(item) }
                ]} />
            </div>
            <div className="item-list my-3">
                {item.items.map(item =>
                    <div key={item.id}>
                        {ItemProvider({ item })}
                    </div>
                )}
            </div>
        </div>
    }
}

export default useObservableModel(GroupItem);