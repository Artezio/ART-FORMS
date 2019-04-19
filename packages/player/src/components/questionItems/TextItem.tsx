import * as React from 'react';
import { Form, TextArea, FormApi } from 'informed';
import * as Models from '@art-forms/models';
import useObservableModel from '../../HOCs/useObservableModel';
import QuestionItemProps from '../../interfaces/components/QuestionItemProps';


export class TextItem extends React.Component<QuestionItemProps<string>> {
    formApi!: FormApi<Models.IQuestionnaireResponseItem>;

    constructor(props: QuestionItemProps<string>) {
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
        // const answer = new Models.Answer({value: values.})
        questionnaireResponseItem && questionnaireResponseItem.updateQuestionnaireResponseItem({ ...questionnaireResponseItem, ...values })
    }

    render() {
        const { item } = this.props;
        return <Form getApi={this.getFormApi.bind(this)} key={item.id} onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
                <TextArea autoComplete="off" id={item.id} className="form-control" field="value" initialValue={item.initialValue} onBlur={this.submitForm.bind(this)} />
            </div>
        </Form>
    }
}

export default useObservableModel<QuestionItemProps<string>>(TextItem);