import * as React from 'react';
import TextItemProps from '../../interfaces/components/questionItems/TextItemProps';
import { FormApi, Form, TextArea, Text } from 'informed';
import * as Models from '@art-forms/models';
import useObservableModel from '../../HOCs/useObservableModel';


export class TextItem extends React.Component<TextItemProps> {
    formApi!: FormApi<Omit<Models.ITextItem, 'type'>>;

    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }

    getFormApi(formApi: FormApi<Omit<Models.ITextItem, 'type'>>) {
        this.formApi = formApi;
    }

    handleSubmit(values: Partial<Omit<Models.ITextItem, 'type'>>) {
        const { item } = this.props;
        item.updateItem({ ...item, ...values });
    }

    componentDidUpdate() {
        const { item } = this.props;
        this.formApi.setValues(item as Models.TextItem);
    }

    render() {
        const { item } = this.props;
        return <Form getApi={this.getFormApi.bind(this)} key={item.id} initialValues={item} onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group mb-0">
                <label htmlFor={`${item.id}-initial`}>Default answer</label>
                <TextArea className="form-control" field="initialValue" id={`${item.id}-initial`} placeholder="Patient default answer" onBlur={this.submitForm.bind(this)} />
            </div>
        </Form>
    }
}

export default useObservableModel<TextItemProps>(TextItem);