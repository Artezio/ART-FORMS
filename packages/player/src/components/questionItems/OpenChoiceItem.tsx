import * as React from 'react';
import { Form, FormApi, RadioGroup, Radio, Text } from 'informed';
import * as Models from '@art-forms/models';
import useObservableModel from '../../HOCs/useObservableModel';
import OpenChoiceItemProps from '../../interfaces/components/OpenChoiceItemProps';


export class OpenChoiceItem extends React.Component<OpenChoiceItemProps> {
    formApi!: FormApi<Models.IQuestionnaireResponseItem>;
    OtherAnswerInputRef: React.RefObject<HTMLInputElement> = React.createRef();
    OtherAnswerRadioRef: React.RefObject<HTMLInputElement> = React.createRef();
    OtherAnswerOption: Models.IChoiceOption = Models.ChoiceOptionFactory.createChoiceOption();

    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }

    getFormApi(formApi: FormApi<Models.IQuestionnaireResponseItem>) {
        this.formApi = formApi;
    }

    handleSubmit(values: Partial<Models.IQuestionnaireResponseItem>) {
        const { answer } = this.props;
        answer && answer.updateAnswer({ ...answer, ...values })
    }

    toggleToOptions() {
        this.submitForm();
        if (this.OtherAnswerRadioRef.current && this.OtherAnswerRadioRef.current.checked) {
            this.OtherAnswerRadioRef.current.checked = false;
        }
        if (this.OtherAnswerInputRef.current) {
            this.OtherAnswerInputRef.current.disabled = true;
        }
    }

    toggleToOtherAnswer() {
        if (!this.OtherAnswerRadioRef.current || !this.OtherAnswerRadioRef.current.checked) {
            return;
        }
        if (this.OtherAnswerInputRef.current) {
            this.OtherAnswerInputRef.current.disabled = false;
            this.OtherAnswerInputRef.current.focus();
            this.setOtherAnswer();
        }
    }

    setOtherAnswer() {
        const { answer, item } = this.props;
        const otherOption = item.options[item.options.length - 1];
        if (this.OtherAnswerInputRef.current) {
            this.OtherAnswerOption.value = this.OtherAnswerInputRef.current.value;
            this.formApi.setValue('value', this.OtherAnswerOption.id);
            item.updateOption({ ...otherOption, value: this.OtherAnswerInputRef.current.value });
            answer.updateAnswer({ ...answer, value: this.OtherAnswerOption.id });
        }
    }

    renderChoiceOptions() {
        const { item, answer } = this.props;
        const otherOption = item.options[item.options.length - 1];
        return <Form getApi={this.getFormApi.bind(this)} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
            <RadioGroup field="value" initialValue={item.initialValue}>
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
                <input type="radio" name="value" className="form-check-input" id={`${otherOption.id}-${answer.id}`} onChange={this.toggleToOtherAnswer.bind(this)} ref={this.OtherAnswerRadioRef} />
                <label className="form-check-label" htmlFor={`${otherOption.id}-${answer.id}`}>Other</label>
            </div>
            <input name="value" className="form-control" defaultValue={otherOption.value} onBlur={this.setOtherAnswer.bind(this)} disabled={true} ref={this.OtherAnswerInputRef} />
        </Form>
    }

    render() {
        return <div className="form-group">
            {this.renderChoiceOptions()}
        </div>
    }
}

export default useObservableModel<OpenChoiceItemProps>(OpenChoiceItem);