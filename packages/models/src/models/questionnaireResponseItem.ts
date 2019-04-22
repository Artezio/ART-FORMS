import { observable } from "..";
import { IQuestionnaireResponseItem } from "../interfaces/IQuestionnaireResponseItem";
import uuid from 'uuid/v1';
import Answer from "./answer";

@observable
export class QuestionnaireResponseItem implements IQuestionnaireResponseItem {
    id!: string;
    text?: string;
    items!: QuestionnaireResponseItem[];
    answers!: Answer<any>[];

    constructor(item?: Partial<IQuestionnaireResponseItem>) {
        Object.assign(this, { id: uuid(), items: [], answers: [] }, item);
    }

    addQuestionnaireResponseItem(item: QuestionnaireResponseItem) {
        if (this.items.every(itm => itm.id !== item.id) && (!this.answers || this.answers.length === 0)) {
            this.items = [...this.items, item];
        }
    }

    updateQuestionnaireResponseItem(item: IQuestionnaireResponseItem) {
        Object.assign(this, item);
    }

    addAnswer(answer: Answer<any>, place?: number) {
        if (this.answers.every(ans => ans.id !== answer.id) && (!this.items || this.items.length === 0)) {
            if (typeof place === 'number') {
                this.answers.splice(place, 0, answer);
                this.answers = [...this.answers];
                return;
            }
            this.answers = [...this.answers, answer];
        }
    }

    removeAnswer(answer: Answer<any>) {
        this.answers = this.answers.filter(ans => ans.id !== answer.id);
    }
}