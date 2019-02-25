import React from 'react';
import { connect } from 'react-redux';
import { TextItem, Questionnaire } from '@art-forms/models';
import { addTextItem } from "../actions/questionnaire";
import { Store } from '../interfaces/Store';
import TextItemComponent from './TextItem';
import DropdownMenuComponent from './DropdownMenu';
import { QuestionnaireComponentActions, QuestionnaireComponentState, QuestionnaireComponentProps } from '../interfaces/QuestionnaireComponentProps';


const mapStateToProps = (store: Store): QuestionnaireComponentState => {
    return { questionnaire: store.questionnaire as Questionnaire };
}

const mapDispatchToProps: QuestionnaireComponentActions = {
    addTextItem
}

const mergeProps = (stateProps: any, dispatchProps: QuestionnaireComponentActions, ownProps: any): QuestionnaireComponentProps =>
    Object.assign({}, ownProps, stateProps, { actions: { ...dispatchProps } });

export class QuestionnaireComponent extends React.Component<QuestionnaireComponentProps> {
    addTextItem = () => {
        const { addTextItem } = this.props.actions;
        addTextItem({ text: 'text', });
    }
    render() {
        const { questionnaire } = this.props;
        return <div className="questionnaire container border border-secondary">
            <div className="d-flex justify-content-end m-1">
                <DropdownMenuComponent title='Context menu' items={[
                    { title: 'Create text item', action: this.addTextItem }
                ]} />
            </div>
            <div className="container">
                <div className="from-group my-3">
                    <input className="form-control" type="text" name="title" placeholder="Title" style={{ height: '50px', fontSize: '30px' }} autoFocus={true}></input>
                </div>
                <div className="from-group my-3">
                    <textarea className="form-control" rows={3} name="description" placeholder="Description"></textarea>
                </div>
                <div className="item-list my-3">
                    {questionnaire.items && questionnaire.items.map(item => <TextItemComponent key={item.id} item={item as TextItem} />)}
                </div>
            </div>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(QuestionnaireComponent);