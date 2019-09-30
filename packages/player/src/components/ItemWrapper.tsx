import * as React from 'react';
import * as Models from '@art-forms/models';
import ItemWrapperProps from '../interfaces/components/ItemWrapperProps';
import { useObservableModel } from '../observableConnector/useObservableModel';
import ItemProvider from './ItemProvider';
import { FormState, withFormApi } from 'informed';

export class ItemWrapper extends React.Component<ItemWrapperProps> {

    static defaultProps: Partial<ItemWrapperProps> = {
        className: ''
    }

    renderErrorMessage() {
        const { formApi, item, questionnaireResponseItem } = this.props;
        const errorMessage = questionnaireResponseItem.errorMessages[0];
        if (formApi.getTouched(item.id) && errorMessage !== undefined) {
            return <span className="d-block mt-n2 text-danger">{errorMessage}</span>
        }
    }

    renderQuestionText() {
        const { item } = this.props;
        if (item.type === Models.GROUP) {
            return <h4>{item.text}</h4>
        }
        if (item.type !== Models.DISPLAY) {
            return <label htmlFor={item.id} className="font-weight-bold">
                {item.text}
                {item.required && <span className="text-danger">*</span>}
            </label>
        }
    }

    render() {
        const { className, item, questionnaireResponseItem, formApi } = this.props;
        const validationStatus = formApi.getTouched(item.id)
            ? questionnaireResponseItem.isValid
                ? 'is-valid'
                : 'is-invalid'
            : '';
        return questionnaireResponseItem.isEnable && <div className={className}>
            {this.renderQuestionText()}
            {this.renderErrorMessage()}
            <ItemProvider item={item} questionnaireResponseItem={questionnaireResponseItem} validationStatus={validationStatus} />
        </div>
    }
}

export default withFormApi<Omit<ItemWrapperProps, 'formApi'>, FormState>(useObservableModel(ItemWrapper));