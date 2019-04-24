import { observable, QuestionItem } from "../..";
import { IItemCollection } from "../../interfaces/IItemCollection";
import { IDateItem } from "../../interfaces/questionItems/IDateItem";
import { DATE } from "../..";

@observable
export class DateItem extends QuestionItem<string> implements IDateItem {
    type: DATE = DATE;
    regexp: RegExp = /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/;
    repeats: false = false;

    constructor(item: Partial<Omit<IDateItem, 'type'>> | undefined, parent?: IItemCollection<IDateItem>) {
        super(item, parent);
    }

    updateItem(item: IDateItem) {
        super.updateItem(item);
        // if (item.initialValue !== undefined && this.regexp.test(item.initialValue)) {
            this.initialValue = item.initialValue;
        // }
    }
}

export default DateItem;