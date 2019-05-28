import * as React from 'react';
import * as Models from '@art-forms/models';
import { Form, RadioGroup, Radio } from 'informed';
import { useObservableModel } from '@art-forms/observable';
import OpenChoiceItemProps from '../../interfaces/components/questionItems/OpenChoiceItemProps';
import QuestionItem from './QuestionItem';


export class OpenChoiceItem extends QuestionItem<OpenChoiceItemProps> {
    otherAnswerInputRef: React.RefObject<HTMLInputElement> = React.createRef();
    otherAnswerRadioRef: React.RefObject<HTMLInputElement> = React.createRef();
    answerFactory: Models.AnswerFactory;

    constructor(props: OpenChoiceItemProps) {
        super(props);
        this.answerFactory = new Models.AnswerFactory(props.questionnaireResponseItem);
        props.questionnaireResponseItem.answers.length === 0 && props.questionnaireResponseItem.answers.push(this.answerFactory.createAnswer());
    }

    handleSubmit(values: Partial<Models.IAnswer<any>>) {
        const { questionnaireResponseItem, item } = this.props;
        const option = item.options.find(x => x.id === values.value);
        const value = option && option.value;
        const answer = questionnaireResponseItem.answers[0];
        answer.setValue(value)
    }

    componentDidMount() {
        const { item, questionnaireResponseItem } = this.props;
        const otherOption = item.options[item.options.length - 1];
        if (item.initialAnswers[0] && item.initialAnswers[0].value === otherOption.id) {
            if (this.otherAnswerRadioRef.current) {
                this.otherAnswerRadioRef.current.checked = true;
                if (this.otherAnswerInputRef.current) {
                    this.otherAnswerInputRef.current.disabled = false;
                    this.otherAnswerInputRef.current.value = otherOption.value;
                    const answer = questionnaireResponseItem.answers[0];
                    answer.setValue(otherOption.value);
                }
            }
        }
    }

    toggleToOptions() {
        this.submitForm();
        if (this.otherAnswerRadioRef.current && this.otherAnswerRadioRef.current.checked) {
            this.otherAnswerRadioRef.current.checked = false;
        }
        if (this.otherAnswerInputRef.current) {
            this.otherAnswerInputRef.current.disabled = true;
        }
    }

    toggleToOtherAnswer() {
        if (!this.otherAnswerRadioRef.current || !this.otherAnswerRadioRef.current.checked) {
            return;
        }
        if (this.otherAnswerInputRef.current) {
            this.otherAnswerInputRef.current.disabled = false;
            this.otherAnswerInputRef.current.focus();
            this.setOtherAnswer();
        }
    }

    setOtherAnswer() {
        const { questionnaireResponseItem, item } = this.props;
        const otherOption = item.options[item.options.length - 1];
        if (this.otherAnswerInputRef.current) {
            this.formApi.setValue('value', otherOption.id);
            const answer = questionnaireResponseItem.answers[0];
            answer.setValue(this.otherAnswerInputRef.current.value);
        }
    }

    render() {
        const { item, questionnaireResponseItem } = this.props;
        const initialValue = item.initialAnswers[0] && item.initialAnswers[0].value;
        const answer = questionnaireResponseItem.answers[0];
        const otherOption = item.options[item.options.length - 1];
        return <div className="form-group">
            <Form getApi={this.getFormApi.bind(this)} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
                <RadioGroup field="value" initialValue={initialValue}>
                    {item.options.map((option, i) => {
                        if (i !== item.options.length - 1) {
                            return <div className="form-check" key={`${option.id}-${answer.id}`}>
                                <Radio name="value" className="form-check-input" id={`${option.id}-${answer.id}`} value={option.id} onChange={this.toggleToOptions.bind(this)} />
                                <label className="form-check-label" htmlFor={`${option.id}-${answer.id}`}>{option.value}</label>
                            </div>
                        }
                    })}
                </RadioGroup>
                <div className="form-check">
                    <input type="radio" name="value" className="form-check-input" id={`${otherOption.id}-${answer.id}`} onChange={this.toggleToOtherAnswer.bind(this)} ref={this.otherAnswerRadioRef} />
                    <label className="form-check-label" htmlFor={`${otherOption.id}-${answer.id}`}>Other</label>
                </div>
                <input autoComplete="off" name="value" className="form-control" onBlur={this.setOtherAnswer.bind(this)} disabled={true} ref={this.otherAnswerInputRef} />
            </Form>
        </div>
    }
}

export default useObservableModel<OpenChoiceItemProps>(OpenChoiceItem);