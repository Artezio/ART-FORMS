import * as React from 'react';
import { TextArea, withFormApi, FormState } from 'informed';
import TextItemProps from '../../interfaces/components/questionItems/TextItemProps';
import ERROR_MESSAGES from '../../constants/errorMessages';


export class TextItem extends React.PureComponent<TextItemProps> {

    onBlur() {
        const { formApi, item, questionnaireResponseItem } = this.props;
        questionnaireResponseItem.reply(formApi.getValue(item.id));
    }

    validate() {
        const { questionnaireResponseItem } = this.props;
        questionnaireResponseItem.validate();
        const errorMessages = questionnaireResponseItem.errorMessages.join(' ');
        return errorMessages === '' ? undefined : errorMessages;
    }

    render() {
        const { item } = this.props;
        return <div className="form-group">
            <TextArea autoComplete="off" id={item.id} className="form-control" field={item.id} onBlur={this.onBlur.bind(this)}  validateOnChange={true} validate={this.validate.bind(this)}/>
        </div>
    }
}

export default withFormApi<TextItemProps, FormState>(TextItem);