import * as React from 'react';
import * as Models from '@art-forms/models';
import { AttachmentItemProps } from '../../interfaces/components/questionItems/AttachmentItemProps';
import { useObservableModel } from '@art-forms/observable';
import { Form, Checkbox } from 'informed';
import QuestionItem from './QuestionItem';


export class AttachmentItem extends QuestionItem<AttachmentItemProps> {
    formApi?: any;

    getFormApi(formApi: any) {
        this.formApi = formApi;
    }

    handleSubmit(values: Partial<Omit<Models.IAttachmentItem, 'type' | 'initialAnswers'>>) {
        const { item } = this.props;
        item.updateItem({ ...item, multipleFiles: !!values.multipleFiles });
    }

    componentDidUpdate() {
        const { item } = this.props;
        this.formApi && this.formApi.setValue('multipleFiles', item.multipleFiles);
    }

    render() {
        const { item } = this.props;
        return <Form getApi={this.getFormApi.bind(this)} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id={`${item.id}-initial`} disabled={true} />
                        <label className="custom-file-label" htmlFor={`${item.id}-initial`}>Choose file</label>
                    </div>
                </div>
            </div>
            <div>
                <div className="form-check">
                    <Checkbox className="form-check-input" initialValue={item.multipleFiles} field="multipleFiles" id={`${item.id}-multipleFiles`} onChange={this.submitForm.bind(this)} />
                    <label className="form-check-label" htmlFor={`${item.id}-multipleFiles`}>Allow multiple upload</label>
                </div>
            </div>
        </Form>
    }
}

export default useObservableModel<AttachmentItemProps>(AttachmentItem);