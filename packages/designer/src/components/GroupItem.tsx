import * as React from 'react';
import GroupItemProps from '../interfaces/components/GroupItemProps';
import { useObservableModel } from '@art-forms/observable-react';
import { FormApi, Form, Text } from 'informed';
import * as Models from '@art-forms/models';
import QuestionnaireItemList from './QuestionnaireItemList';
import ItemCollectionMenu from './ItemCollectionMenu';


export class GroupItem extends React.Component<GroupItemProps> {
    // formApi!: FormApi<Partial<Models.IGroupItem>>;
    // inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    // handleSubmit(values: Partial<Models.IGroupItem>) {
    //     const { item } = this.props;
    //     item.updateItem({ ...item, text: values.text });
    // }

    // submitForm() {
    //     if (!this.formApi) return;
    //     this.formApi.submitForm();
    // }

    // getFormApi(formApi: FormApi<Partial<Models.IGroupItem>>) {
    //     this.formApi = formApi;
    // }

    renderItemList() {
        const { item, nestingLevel, subscribe } = this.props;
        return <QuestionnaireItemList itemList={item.items} nestingLevel={nestingLevel} subscribe={subscribe} />
    }

    // componentDidUpdate() {
    //     const { item } = this.props;
    //     this.formApi.setValues(item);
    // }

    render() {
        const { item } = this.props;
        return <div>
            {/* <Form className="questionnaire-group-item__headline form-group" getApi={this.getFormApi.bind(this)} key={item.id} initialValues={item} onSubmit={this.handleSubmit.bind(this)}>
                <label htmlFor={item.id}>Group Title</label>
                <Text
                    // forwardedRef={this.inputRef}
                    autoFocus={true}
                    autoComplete="off"
                    className="form-control"
                    id={item.id}
                    field="text"
                    placeholder="Questions group"
                    onBlur={this.submitForm.bind(this)}
                />
            </Form> */}
            {item.items.length === 0 && <div className="w-100 d-flex justify-content-center align-items-center">
                <ItemCollectionMenu item={item} />
            </div>}
            {this.renderItemList()}
        </div>
    }
}

export default useObservableModel<GroupItemProps>(GroupItem);