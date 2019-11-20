import * as React from 'react';
import { useObservableModel } from '@art-forms/observable-react';
import MultiChoiceItemProps from '../../interfaces/components/questionItems/MultiChoiceItemProps';
import MultiChoiceItemOption from '../MultiChoiceItemOption';
import { Scope, withFormApi, FormState } from 'informed';


export class MultiChoiceItem extends React.PureComponent<MultiChoiceItemProps> {
    render() {
        const { item, questionnaireResponseItem, formApi, validationStatus } = this.props;
        return <div className="form-group">
            <Scope scope={item.id}>
                {item.options && item.options.map(option => <MultiChoiceItemOption
                    key={option.id}
                    item={item}
                    formApi={formApi}
                    option={option}
                    questionnaireResponseItem={questionnaireResponseItem}
                    validationStatus={validationStatus}
                />
                )}
            </Scope>
        </div>
    }
}

export default withFormApi<MultiChoiceItemProps, FormState>(useObservableModel(MultiChoiceItem));