import IQuestionItem from "./IQuestionItem";
import { OPEN_CHOICE } from "../../constants/itemTypes";
import { IChoiceOption } from "../..";


export interface IOpenChoiceItem extends IQuestionItem<any> {
    type: OPEN_CHOICE;
    options: IChoiceOption[];
}

export default IOpenChoiceItem;