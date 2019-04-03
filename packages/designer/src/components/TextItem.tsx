import * as React from 'react';
import TextItemProps from '../interfaces/components/TextItemProps';
import DropdownMenu from './DropdownMenu';
import { FormApi, Form, Text } from 'informed';
import * as Models from '@art-forms/models';
import useObservableModel from '../HOCs/useObservableModel';


export class TextItem extends React.Component<TextItemProps> {
    formApi!: FormApi<Omit<Models.ITextItem, 'answerType'>>;

    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }

    getFormApi(formApi: FormApi<Omit<Models.ITextItem, 'answerType'>>) {
        this.formApi = formApi;
    }

    handleSubmit(values: Partial<Omit<Models.ITextItem, 'answerType'>>) {
        const { item } = this.props;
        item.updateItem({ ...item, ...values });
    }

    render() {
        const { item } = this.props;
        return <div className="text-item card card-sm mb-3">
            <div className="card-header p-1 d-flex justify-content-end">
                <DropdownMenu title="Context menu" items={[
                    { title: 'Remove item', action: item.remove.bind(item) }
                ]} />
            </div>
            <div className="card-body p-2">
                <Form getApi={this.getFormApi.bind(this)} key={item.id} initialValues={item} onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group mb-2">
                        <label htmlFor="text-item-text" className="small mb-0">Question</label>
                        <Text className="form-control form-control-sm" id="text-item-text" field="text" placeholder="My Question" autoFocus={true} onBlur={this.submitForm.bind(this)} />
                    </div>
                    <div className="form-group mb-0">
                        <label htmlFor="text-item-initial-value" className="small mb-0">Default answer</label>
                        <Text className="form-control form-control-sm" field="initialValue" id="text-item-initial-value" placeholder="Patient default answer" onBlur={this.submitForm.bind(this)} />
                    </div>
                </Form>
            </div>
        </div>
    }
}

export default useObservableModel<TextItemProps>(TextItem);