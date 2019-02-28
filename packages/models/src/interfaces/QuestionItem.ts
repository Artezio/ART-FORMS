import { QUESTIONNAIRE_ITEM_TYPES } from '../enums';
import { Item } from './Item';


export interface QuestionItem<T> extends Item {
    type: QUESTIONNAIRE_ITEM_TYPES.QUESTION;
    initialValue: T;
    value: T;
}


export default QuestionItem;