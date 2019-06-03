import * as React from 'react';
import GroupItemProps from '../interfaces/components/GroupItemProps';
import { useObservableModel } from '@art-forms/observable';
import ItemWrapper from './ItemWrapper';


export class GroupItem extends React.Component<GroupItemProps> {
    render() {
        const { item, questionnaireResponseItem } = this.props;
        return <div className="response-item-list">
            {item.items.map(item => {
                const responseItem = questionnaireResponseItem.items.find(responseItem => responseItem.id === item.id);
                return responseItem && <ItemWrapper key={item.id} item={item} questionnaireResponseItem={responseItem} />
            })}
        </div>
    }
}

export default useObservableModel<GroupItemProps>(GroupItem);