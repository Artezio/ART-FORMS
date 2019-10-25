import * as Models from '@art-forms/models';
import { IQuestionnaireContext } from '../helpers/IQuestionnaireContext';


export interface ItemWrapperProps extends IQuestionnaireContext {
    item: Models.Item;
    className?: string;
    nestingLevel: string;
    subscribe?: () => void;
}

export default ItemWrapperProps;