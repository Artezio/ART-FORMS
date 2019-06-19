import * as React from 'react';
import { Text, withFormApi, FormState } from 'informed';
import TimeItemProps from '../../interfaces/components/questionItems/TimeItemProps';
import ERROR_MESSAGES from '../../constants/errorMessages';


export class TimeItem extends React.PureComponent<TimeItemProps> {

    onBlur() {
        const { formApi, item, questionnaireResponseItem } = this.props;
        questionnaireResponseItem.reply(formApi.getValue(item.id) + ':00'); //seconds required by FHIR regexp but missing in input type "time" 
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
            <Text autoComplete="off" id={item.id} type="time" className="form-control" field={item.id} onBlur={this.onBlur.bind(this)} validateOnChange={true} validate={this.validate.bind(this)} />
        </div>
    }
}

export default withFormApi<TimeItemProps, FormState>(TimeItem);