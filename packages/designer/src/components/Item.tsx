import * as React from 'react';
import DropdownMenu from './DropdownMenu';
import ItemProps from '../interfaces/components/ItemProps';
import { Form, TextArea, FormApi } from 'informed';
import * as Models from '@art-forms/models';


export class Item extends React.Component<ItemProps> {
    formApi!: FormApi<Models.IItem>;

    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }

    getFormApi(formApi: FormApi<Models.IItem>) {
        this.formApi = formApi;
    }

    handleSubmit(values: Partial<Models.IItem>) {
        const { actions, item } = this.props;
        actions.updateItem({ ...item, ...values });
    }

    render() {
        const { item, actions } = this.props;
        return <div className="item border border-success my-1 p-3">
            <div className="d-flex justify-content-end m-1">
                <DropdownMenu title="Context menu" items={[
                    { title: 'Remove item', action: actions.removeItem.bind(actions, item) }
                ]} />
            </div>
            <Form getApi={this.getFormApi.bind(this)} initialValues={item} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="item-text">Text</label>
                    <TextArea className="form-control" id="item-text" field="text" placeholder="My text" autoFocus={true} onBlur={this.submitForm.bind(this)} />
                </div>
            </Form>
        </div>
    }
}

export default Item;