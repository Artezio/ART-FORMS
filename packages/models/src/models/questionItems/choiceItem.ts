import { QuestionItem } from "../..";
import { observable, observableProperty, getObservable } from '@art-forms/observable';
import { IItemCollection } from "../../interfaces/IItemCollection";
import { IChoiceItem } from "../../interfaces/questionItems/IChoiceItem";
import { CHOICE } from "../..";
import IChoiceOption from "../../interfaces/IChoiceOption";

@observable
export class ChoiceItem extends QuestionItem<any> implements IChoiceItem {
    type: CHOICE = CHOICE;
    @observableProperty
    options: IChoiceOption[];

    constructor(item: Partial<Omit<IChoiceItem, 'type'>> | undefined, parent?: IItemCollection<IChoiceItem>) {
        super(item, parent);
        this.options = item && item.options || [];
    }

    addOption(option: IChoiceOption) {
        if (this.options.every(anOption => anOption.id !== option.id)) {
            this.options.push(option);
        }
    }

    updateOption(option: IChoiceOption) {
        this.options = this.options.map(anOption => {
            if (anOption.id === option.id) {
                return option;
            }
            return anOption;
        })
    }

    removeOption(option: any) {
        this.options = this.options.filter(x => x !== option);
    }

    updateItem(item: IChoiceItem) {
        const obs = getObservable(item);
        obs && obs.mute();
        super.updateItem(item);
        this.initialValue = item.initialValue;
        this.options = item.options;
        obs && obs.unmute;
    }
}

export default ChoiceItem;