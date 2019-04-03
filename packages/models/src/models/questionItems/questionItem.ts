import IQuestionItem from "../../interfaces/questionItems/IQuestionItem";
import { Item } from "../..";
import { ANSWER_TYPE } from "../../constants/answerTypes";
import { QUESTION } from "../../constants/itemTypes";
import { ICollection } from "../../interfaces/ICollection";

export abstract class QuestionItem<T> extends Item implements IQuestionItem<T> {
    initialValue?: T;
    answerType!: ANSWER_TYPE;
    type: QUESTION = QUESTION;

    constructor(item: Omit<IQuestionItem<T>, 'id' | 'type' | 'answerType'> | undefined = {}, parent?: ICollection<IQuestionItem<T>>) {
        super(item, parent);
        this.initialValue = item.initialValue;
    }
}

export default QuestionItem;