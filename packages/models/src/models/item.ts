import { IItem, ITEM_TYPE, DISPLAY } from "..";
import { observable } from "../decorators/temporaryObservable";
import uuid from "uuid/v1";
import { IItemCollection } from "../interfaces/IItemCollection";

@observable
export class Item implements IItem {
    id!: string;
    text?: string;
    type: ITEM_TYPE = DISPLAY;
    parent?: IItemCollection<IItem>;

    constructor(item: Partial<Omit<IItem, 'type'>> | undefined, parent?: IItemCollection<IItem>) {
        Object.assign(this, { id: uuid() }, item);
        this.parent = parent;
    }

    updateItem(item: IItem) {
        this.id = item.id;
        this.text = item.text;
    }

    remove() {
        this.parent && this.parent.removeItem(this);
    }

    replace(newItem: Item) {
        this.parent && this.parent.replaceItem(this, newItem);
    }
}

export default Item;