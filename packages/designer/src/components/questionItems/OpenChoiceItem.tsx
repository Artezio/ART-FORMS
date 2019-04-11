import * as React from 'react';
import { OpenChoiceItemProps } from '../../interfaces/components/questionItems/OpenChoiceItemProps';
import { FormApi, Form, Text } from 'informed';
import * as Models from '@art-forms/models';
import useObservableModel from '../../HOCs/useObservableModel';
import ChoiceOption from '../ChoiceOption';


export class OpenChoiceItem extends React.Component<OpenChoiceItemProps> {
    formApi!: FormApi<Omit<Models.IOpenChoiceItem, 'type'>>;

    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }

    getFormApi(formApi: FormApi<Omit<Models.IOpenChoiceItem, 'type'>>) {
        this.formApi = formApi;
    }

    handleSubmit(values: Partial<Omit<Models.IOpenChoiceItem, 'type'>>) {
        const { item } = this.props;
        item.updateItem({ ...item, ...values });
    }

    componentDidUpdate() {
        const { item } = this.props;
        this.formApi.setValues(item as Models.OpenChoiceItem);
    }

    renderChoiceOptions() {
        const { item } = this.props;
        return item && (<div className="choice-options my-1">
            {item.options.map(option => <ChoiceOption key={option.id} option={option} item={item} />)}
        </div>);
    }

    addOption() {
        const { item } = this.props;
        const option = Models.ChoiceOptionFactory.createChoiceOption();
        item && item.addOption(option);
    }

    render() {
        const { item } = this.props;
        return <Form getApi={this.getFormApi.bind(this)} key={item.id} initialValues={item} onSubmit={this.handleSubmit.bind(this)}>
            <div className="card-body p-2">
                <div className="form-group">
                    <label htmlFor={`${item.id}-text`}>Question</label>
                    <Text className="form-control" id={`${item.id}-text`} field="text" placeholder="My Question" onBlur={this.submitForm.bind(this)} />
                </div>
                {this.renderChoiceOptions()}
                <div className="form-group">
                    <button className="btn btn-outline-secondary form-control mt-1" onClick={this.addOption.bind(this)}>Add option</button>
                </div>
            </div>
        </Form>
    }
}

export default useObservableModel<OpenChoiceItemProps>(OpenChoiceItem);