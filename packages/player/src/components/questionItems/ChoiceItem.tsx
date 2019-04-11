import * as React from 'react';
import { Form, FormApi, RadioGroup, Radio } from 'informed';
import * as Models from '@art-forms/models';
import useObservableModel from '../../HOCs/useObservableModel';
import ChoiceItemProps from '../../interfaces/components/ChoiceItemProps';


export class ChoiceItem extends React.Component<ChoiceItemProps> {
    formApi!: FormApi<Models.IQuestionnaireResponseItem>;

    constructor(props: ChoiceItemProps) {
        super(props);
    }

    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }

    getFormApi(formApi: FormApi<Models.IQuestionnaireResponseItem>) {
        this.formApi = formApi;
    }

    handleSubmit(values: Partial<Models.IQuestionnaireResponseItem>) {
        const { questionnaireResponseItem } = this.props;
        questionnaireResponseItem && questionnaireResponseItem.updateQuestionnaireResponseItem({ ...questionnaireResponseItem, ...values })
    }

    renderChoiceOptions() {
        const { item } = this.props;
        return <Form getApi={this.getFormApi.bind(this)} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
            <RadioGroup field="value" initialValue={item.initialValue}>
                {item.options.map(item => {
                    return <div className="form-check" key={item.id}>
                        <Radio className="form-check-input" id={item.id} value={item.value} onChange={this.submitForm.bind(this)} />
                        <label className="form-check-label" htmlFor={item.id}>{item.value}</label>
                    </div>
                })}
            </RadioGroup>
        </Form>
    }

    render() {
        const { item, className = '' } = this.props;
        return <div className={`mb-3 ${className}`}>
            <div className="form-group">
                <label className="mb-1">{item.text}</label>
                {this.renderChoiceOptions()}
            </div>
        </div>
    }
}

export default useObservableModel<ChoiceItemProps>(ChoiceItem);