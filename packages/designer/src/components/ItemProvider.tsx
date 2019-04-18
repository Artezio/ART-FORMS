import * as React from 'react';
import * as Models from '@art-forms/models';
import { Item } from './Item';
import { GroupItem } from '../components/GroupItem';
import { TextItem } from './questionItems/TextItem';
import { StringItem } from './questionItems/StringItem';
import { DecimalItem } from './questionItems/DecimalItem';
import { BooleanItem } from './questionItems/BooleanItem';
import { TimeItem } from './questionItems/TimeItem';
import { DateItem } from './questionItems/DateItem';
import { DateTimeItem } from './questionItems/DateTimeItem';
import { AttachmentItem } from './questionItems/AttachmentItem';
import { ChoiceItem } from './questionItems/ChoiceItem';
import { OpenChoiceItem } from './questionItems/OpenChoiceItem';


export const ItemProvider = (props: any) => {
    const { item } = props;
    switch ((item as Models.IItem).type) {
        case Models.DISPLAY: {
            return <Item {...props} />
        }
        case Models.GROUP: {
            return <GroupItem {...props} />
        }
        case Models.TEXT: {
            return <TextItem {...props} />
        }
        case Models.STRING: {
            return <StringItem {...props} />
        }
        case Models.DECIMAL: {
            return <DecimalItem {...props} />
        }
        case Models.BOOLEAN: {
            return <BooleanItem {...props} />
        }
        case Models.TIME: {
            return <TimeItem {...props} />
        }
        case Models.DATE: {
            return <DateItem {...props} />
        }
        case Models.DATE_TIME: {
            return <DateTimeItem {...props} />
        }
        case Models.ATTACHMENT: {
            return <AttachmentItem {...props} />
        }
        case Models.CHOICE: {
            return <ChoiceItem {...props} />
        }
        case Models.OPEN_CHOICE: {
            return <OpenChoiceItem {...props} />
        }
        default: {
            return null;
        }
    }
}

export default ItemProvider;