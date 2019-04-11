import * as React from 'react';
import { Form, RadioGroup, Radio, FormApi } from 'informed';
import * as Models from '@art-forms/models';
import useObservableModel from '../../HOCs/useObservableModel';
import QuestionItemProps from '../../interfaces/components/QuestionItemProps';


export class BooleanItem extends React.Component<QuestionItemProps<boolean>> {
    formApi!: FormApi<Models.IQuestionnaireResponseItem>;

    constructor(props: QuestionItemProps<boolean>) {
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

    render() {
        const { item, className = '' } = this.props;
        return <div className={`mb-3 ${className}`}>
            <Form getApi={this.getFormApi.bind(this)} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
                <RadioGroup field="value">
                    <div className="form-group">
                        <label className="mb-1">{item.text}</label>
                        <div className="form-check">
                            <Radio className="form-check-input" id="boolean-answer-true" value={true} onChange={this.submitForm.bind(this)} />
                            <label className="form-check-label" htmlFor="boolean-answer-true">Yes</label>
                        </div>
                        <div className="form-check">
                            <Radio className="form-check-input" id="boolean-answer-false" value={false} onChange={this.submitForm.bind(this)} />
                            <label className="form-check-label" htmlFor="boolean-answer-false">No</label>
                        </div>
                    </div>
                </RadioGroup>
            </Form>
        </div>
    }
}

export default useObservableModel<QuestionItemProps<boolean>>(BooleanItem);