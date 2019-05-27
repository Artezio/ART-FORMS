import * as React from 'react';
import { Form, Text } from 'informed';
import { useObservableModel } from '@art-forms/observable';
import TimeItemProps from '../../interfaces/components/questionItems/TimeItemProps';
import QuestionItem from './QuestionItem';


export class TimeItem extends QuestionItem<TimeItemProps> {
    render() {
        const { item } = this.props;
        const initialValue = item.initialAnswers[0] && item.initialAnswers[0].value;
        return <Form getApi={this.getFormApi.bind(this)} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
                <Text autoComplete="off" id={item.id} type="time" className="form-control" field="value" initialValue={initialValue} onBlur={this.submitForm.bind(this)} />
            </div>
        </Form>
    }
}

export default useObservableModel<TimeItemProps>(TimeItem);