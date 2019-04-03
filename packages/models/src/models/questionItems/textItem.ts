import { ITextItem, observable } from "../..";
import { ICollection } from "../../interfaces/ICollection";
import { TEXT } from "../../constants/answerTypes";
import { QuestionItem } from "./questionItem";


@observable
export class TextItem extends QuestionItem<string> implements ITextItem {
    answerType: TEXT = TEXT;

    constructor(item: Partial<Omit<ITextItem, 'type' | 'answerType'>> | undefined, parent?: ICollection<ITextItem>) {
        super(item, parent);
    }
}

export default TextItem;