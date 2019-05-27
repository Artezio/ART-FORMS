import * as React from 'react';
import { BooleanItemProps } from '../../interfaces/components/questionItems/BooleanItemProps';
import { FormApi, Form, RadioGroup, Radio } from 'informed';
import * as Models from '@art-forms/models';
import { useObservableModel } from '@art-forms/observable';
import QuestionItem from './QuestionItem';


export class BooleanItem extends QuestionItem<BooleanItemProps> {

    reset() {
        const { item } = this.props;
        item.updateItem({ ...item, initialAnswers: [] });
    }

    render() {
        const { item } = this.props;
        const initialValue = item.initialAnswers[0] && item.initialAnswers[0].value;
        return <Form getApi={this.getFormApi.bind(this)} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
            <label>Default answer</label>
            <RadioGroup initialValue={initialValue} field="value">
                <div>
                    <button type="button" className="btn btn-link text-secondary" onClick={this.reset.bind(this)}>
                        Reset <i className="fas fa-undo"></i>
                    </button>
                    <div className="form-check">
                        <Radio className="form-check-input" id={`${item.id}-true`} value={true} onChange={this.submitForm.bind(this)} />
                        <label className="form-check-label" htmlFor={`${item.id}-true`}>Yes</label>
                    </div>
                    <div className="form-check">
                        <Radio className="form-check-input" id={`${item.id}-false`} value={false} onChange={this.submitForm.bind(this)} />
                        <label className="form-check-label" htmlFor={`${item.id}-false`}>No</label>
                    </div>
                </div>
            </RadioGroup>
        </Form>
    }
}

export default useObservableModel<BooleanItemProps>(BooleanItem);