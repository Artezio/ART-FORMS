import * as React from 'react';
import GroupItemProps from '../interfaces/components/GroupItemProps';
import { useObservableModel } from '@art-forms/observable-react';
import QuestionnaireItemList from './QuestionnaireItemList';
import ItemCollectionMenu from './ItemCollectionMenu';


export class GroupItem extends React.Component<GroupItemProps> {
    render() {
        const { item, nestingLevel, subscribe } = this.props;
        return <div>
            {item.items.length === 0 && <div className="w-100 d-flex justify-content-center align-items-center">
                <ItemCollectionMenu item={item} />
            </div>}
            <QuestionnaireItemList itemList={item.items} nestingLevel={nestingLevel} subscribe={subscribe} />
        </div>
    }
}

export default useObservableModel<GroupItemProps>(GroupItem);