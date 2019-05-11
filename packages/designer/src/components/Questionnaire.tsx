import * as React from 'react';
import * as Models from '@art-forms/models';
import { QuestionnaireProps } from '../interfaces/components/QuestionnaireProps';
import { Form, Text, TextArea, FormApi } from 'informed';
import { useObservableModel } from '../HOCs/useObservableModel';
import ItemCollectionMenu from './ItemCollectionMenu';
import QuestionnaireItemList from './QuestionnaireItemList';
import Sortable, { SortableEvent } from 'sortablejs';

export class Questionnaire extends React.Component<QuestionnaireProps> {
    formApi!: FormApi<Models.IQuestionnaire>;
    itemFactory: Models.ItemFactory;
    documentListener: EventListener;
    itemListener: EventListener;
    nestingLevel: string = '0';
    itemListsMap: Map<HTMLElement, Sortable> = new Map();

    constructor(props: QuestionnaireProps) {
        super(props);
        this.itemFactory = new Models.ItemFactory(this.props.questionnaire);
        this.documentListener = (e: Event) => {
            this.clearSelected();
        }
        this.itemListener = (e: Event) => {
            const target = (e.currentTarget as HTMLElement);
            if (!target.classList.contains('card-active')) {
                this.clearSelected();
                target && target.classList.add('card-active');
                target && target.classList.add('shadow');
            }
        }
        this.subscribeDocument();
    }

    handleSubmit(values: Partial<Models.IQuestionnaire>) {
        const { questionnaire } = this.props;
        questionnaire.updateQuestionnaire({ ...questionnaire, title: values.title, description: values.description });
    }
    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }
    getFormApi(formApi: FormApi<Models.IQuestionnaire>) {
        this.formApi = formApi;
    }

    componentDidMount() {
        this.makeItemsDraggable();
    }
    componentDidUpdate() {
        const { questionnaire } = this.props;
        this.formApi.setValues(questionnaire);
        this.highlightActiveItems();
        this.makeItemsDraggable();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.documentListener, true);
        this.clearSortables();
    }

    subscribeDocument() {
        document.addEventListener('click', this.documentListener, true);
    }

    clearSelected() {
        const selectedItems = document.querySelectorAll('.card-active');
        selectedItems.forEach(selectedItem => {
            selectedItem && selectedItem.classList.remove('card-active');
            selectedItem && selectedItem.classList.remove('shadow');
        })
    }

    highlightActiveItems() {
        document.querySelectorAll('.questionnaire-item').forEach(el => {
            el.removeEventListener('click', this.itemListener);
            el.addEventListener('click', this.itemListener);
        })
    }

    clearSortables() {
        this.itemListsMap.forEach(sortable => sortable.destroy());
    }

    makeItemsDraggable() {
        const itemLists = document.querySelectorAll('#drag-drop-nested .questionnaire-item-list') as NodeListOf<HTMLElement>;
        itemLists.forEach((itemList) => {
            if (this.itemListsMap.has(itemList)) return;
            this.itemListsMap.set(itemList, new Sortable(itemList, {
                group: 'nested',
                animation: 350,
                fallbackOnBody: true,
                swapThreshold: 0.35,
                handle: '.drag-handle',
                dragClass: "sortable-drag",
                onEnd: this.onDragEnd.bind(this),
                onStart: this.onDragStart.bind(this),
                scrollSensitivity: 200,
                scrollSpeed: 20
            }));
        })
    }

    onDragStart(e: SortableEvent) {
        // const temporaryElement = e.item.cloneNode(true) as HTMLElement;
        // function moveAt(e: any) {
        //     temporaryElement.style.left = e.pageX - shiftX + 'px';
        //     temporaryElement.style.top = e.pageY - shiftY + 'px';
        // }
        // function getCoords(elem: any) {
        //     var box = elem.getBoundingClientRect();
        //     return {
        //         top: box.top + window.pageYOffset,
        //         left: box.left + window.pageXOffset
        //     };
        // }
        // const coords = getCoords(temporaryElement);
        // const shiftX = - coords.left;
        // const shiftY = - coords.top;
        // temporaryElement.classList.add("isDragging");
        // temporaryElement.classList.remove("sortable-ghost");
        // // temporaryElement.style.height = '' + e.item.offsetHeight;
        // // temporaryElement.style.width = '' + e.item.offsetWidth;
        // // temporaryElement.style.zIndex = "1000";
        // temporaryElement.setAttribute("style", `height: ${ e.item.offsetHeight}; width: ${e.item.offsetWidth}; zIndex: 1000`);
        // document.onmousemove = function (e) {
        //     moveAt(e);
        // };

        // document.body.appendChild(temporaryElement);
        // return false;
    }

    onDragEnd(e: SortableEvent) {
        const oldItemList = this.findNestedItemList(e.from.dataset['nestingLevel']);
        const newItemList = this.findNestedItemList(e.to.dataset.nestingLevel);
        if (oldItemList && newItemList) {
            const item = oldItemList.items.find(x => x.id === e.item.dataset.id);
            if (!item) return;
            if (oldItemList !== newItemList) {
                e.from.appendChild(e.item);
            }
            item.remove();
            newItemList.addItem(item, e.newIndex);
        }
    }

    findNestedItemList(nesting?: string): Models.Questionnaire | Models.GroupItem | undefined {
        if (nesting === undefined) return;
        const nestingLevel = nesting.split(':');
        nestingLevel.shift();
        const { questionnaire } = this.props;
        let currentItemList: Models.Questionnaire | Models.GroupItem = questionnaire;
        if (nesting.length === 0) {
            return currentItemList;
        }
        nestingLevel.forEach(index => {
            if (Array.isArray(currentItemList.items)) {
                currentItemList = currentItemList.items[+index] as Models.GroupItem;
            }
        })
        return currentItemList;
    }

    renderItemList() {
        const { questionnaire } = this.props;
        return <div id="drag-drop-nested">
            <QuestionnaireItemList item={questionnaire} nestingLevel={this.nestingLevel} subscribe={this.makeItemsDraggable.bind(this)} />
        </div>
    }

    renderMenu() {
        const { questionnaire } = this.props;
        return <ItemCollectionMenu item={questionnaire} />
    }

    render() {
        const { questionnaire, className = '' } = this.props;
        return <div className={`questionnaire ${className}`}>
            <div className="card card-sm mb-3">
                <div className="card-header d-flex justify-content-end">
                    {this.renderMenu()}
                </div>
                <div className="card-body">
                    <Form getApi={this.getFormApi.bind(this)} key={questionnaire.id} initialValues={questionnaire} onSubmit={this.handleSubmit.bind(this)} >
                        <div className="form-group">
                            <label htmlFor={`${questionnaire.id}-title`}>Questionnaire Title</label>
                            <Text autoComplete="off" className="form-control" id={`${questionnaire.id}-title`} field="title" placeholder="My Questionnaire" autoFocus={true} onBlur={this.submitForm.bind(this)} />
                        </div>
                        <div>
                            <label htmlFor={`${questionnaire.id}-description`}>Questionnaire Description</label>
                            <TextArea autoComplete="off" className="form-control" id={`${questionnaire.id}-description`} field="description" placeholder="My description" onBlur={this.submitForm.bind(this)} />
                        </div>
                    </Form>
                </div>
            </div>
            {this.renderItemList()}
        </div>
    }
}

export default useObservableModel<QuestionnaireProps>(Questionnaire);