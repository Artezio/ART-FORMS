import * as React from 'react';
import { OpenChoiceItemProps } from '../../interfaces/components/questionItems/OpenChoiceItemProps';
import * as Models from '@art-forms/models';
import useObservableModel from '../../HOCs/useObservableModel';
import ChoiceOption from '../ChoiceOption';
import { Form, FormApi, RadioGroup } from 'informed';


export class OpenChoiceItem extends React.Component<OpenChoiceItemProps> {
    formApi!: FormApi<Models.IOpenChoiceItem>;

    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }

    getFormApi(formApi: FormApi<Models.IOpenChoiceItem>) {
        this.formApi = formApi;
    }

    handleSubmit(values: Partial<Models.IOpenChoiceItem>) {
        const { item } = this.props;
        item.updateItem({ ...item, initialValue: values.initialValue })
    }

    renderChoiceOptions() {
        const { item } = this.props;
        return item && (<div className="choice-options">
            <Form getApi={this.getFormApi.bind(this)} onSubmit={this.handleSubmit.bind(this)}>
                <RadioGroup field="initialValue" initialValue={item.initialValue}>
                    {item.options.map(option => <ChoiceOption key={option.id} option={option} item={item} submitForm={this.submitForm.bind(this)} reset={this.reset.bind(this)} />)}
                    <ChoiceOption item={item} option={Models.ChoiceOptionFactory.createChoiceOption({ value: "Other" })} disabled={true} submitForm={this.submitForm.bind(this)} reset={this.reset.bind(this)} />
                </RadioGroup>
            </Form>
        </div>);
    }

    reset() {
        this.formApi && this.formApi.setValue('initialValue', undefined);
    }

    addOption() {
        const { item } = this.props;
        const option = Models.ChoiceOptionFactory.createChoiceOption();
        item && item.addOption(option);
    }

    render() {
        return <div>
            <button className="btn btn-link text-secondary" onClick={this.reset.bind(this)}>
                Reset <i className="fas fa-undo"></i>
            </button>
            {this.renderChoiceOptions()}
            <div className="form-group">
                <button className="btn btn-outline-secondary form-control" onClick={this.addOption.bind(this)}>Add option</button>
            </div>
        </div>
    }
}

export default useObservableModel<OpenChoiceItemProps>(OpenChoiceItem);