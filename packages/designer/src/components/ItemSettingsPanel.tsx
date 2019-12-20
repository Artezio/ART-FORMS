import * as React from 'react';
import * as Models from '@artezio/models';
import ItemSettingsPanelProps from '../interfaces/components/ItemSettingsPanelProps';
import { HumanReadableGuid } from '../helpers/humanReadableId';
import { questionTypes } from '../constants/questionTypes';
import EnableSettings from './enableWhen/EnableSettings';
import { useObservableModel } from '@artezio/observable-react';
import { Form, Checkbox, FormApi } from 'informed';


interface ItemSettingsPanelState {
    openEnableSettings: boolean;
}

export class ItemSettingsPanel extends React.Component<ItemSettingsPanelProps, ItemSettingsPanelState> {
    static defaultProps: Partial<ItemSettingsPanelProps> = {
        className: ''
    }

    state = {
        openEnableSettings: false,
    }

    formApi?: FormApi<Omit<Models.IItem, 'type'>>;
    humanReadableGuid = HumanReadableGuid.getHumanReadableGuid();

    getFormApi(formApi) {
        this.formApi = formApi;
    }

    submitForm() {
        if (!this.formApi) return;
        this.formApi.submitForm();
    }

    handleSubmit(values) {
        const { item } = this.props;
        item.updateItem({ ...item, ...values });
    }

    componentDidUpdate() {
        const { item } = this.props;
        this.formApi && this.formApi.setValues(item);
    }

    getItemTypeTitle(): string {
        const { item } = this.props;
        if (item.type === Models.GROUP) {
            return 'Group';
        } else if (item.type === Models.DISPLAY) {
            return 'Display Item';
        }
        const questionType = questionTypes.find(questionType => questionType.value === item.type);
        if (questionType) {
            return questionType.title;
        }
        return 'Question';
    }

    getLabel() {
        const { item } = this.props;
        const type = item.type;
        if (type === Models.GROUP) {
            return <label htmlFor="" className="settings-panel__group-label">Group Title</label>
        }
        if (type === Models.DISPLAY) {
            return <label htmlFor="" className="settings-panel__display-label">Text</label>
        }
        return <label htmlFor="" className="settings-panel__question-label">Question</label>
    }

    toggleEnableSettingsDisplay() {
        this.setState({
            openEnableSettings: !this.state.openEnableSettings
        })
    }

    renderEnableSettings() {
        const { item, questionnaire } = this.props;
        const { openEnableSettings } = this.state;
        return <section className="settings-panel__enable-settings">
            <div className="card-header card-footer form-group p-0">
                <button className="btn btn-block text-dark d-flex justify-content-between align-items-center" onClick={this.toggleEnableSettingsDisplay.bind(this)}>
                    <span>Enable settings</span>
                    <i className={`fas fa-${openEnableSettings ? 'caret-up' : 'caret-down'}`}></i>
                </button>
            </div>
            {openEnableSettings && <div className="card-body">
                <EnableSettings key={item.id} questionnaire={questionnaire} item={item} />
            </div>}
        </section>
    }

    onChange(e) {
        const { item } = this.props;
        if (e.target.checked && !item.required) {
            item.required = true;
        } else {
            item.required = false;
        }
    }

    render() {
        const { item } = this.props;
        const correctEnableWhens = item.enableWhen.filter(enableWhen => enableWhen.questionId !== undefined && enableWhen.operator !== undefined && enableWhen.answer !== undefined);
        return <div className="settings-panel card h-100">
            <header className="card-header d-flex justify-content-between align-items-center">
                <span>#{this.humanReadableGuid.getHumanReadableId(item.id)}</span>
                <span>{this.getItemTypeTitle()}</span>
            </header>
            <div className="card-body">
                <div className="form-group">
                    {this.getLabel()}
                    <input type="text" className="form-control" value={item.text} disabled={true} />
                </div>
                <div className="d-flex item-info">
                    {item.type !== Models.GROUP && item.type !== Models.DISPLAY &&
                        <Form getApi={this.getFormApi.bind(this)} initialValues={(item as Models.QuestionItem<any>)} onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-check">
                                <Checkbox key={item.required + ''}
                                    field="required"
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`${item.id}-required-settings-panel`}
                                    onChange={this.submitForm.bind(this)}
                                />
                                <label className="mb-0" htmlFor={`${item.id}-required-settings-panel`}>Required</label>
                            </div>
                        </Form>}
                    <div>
                        {`Dependent: ${correctEnableWhens.length ? 'On' : 'Off'}`}
                    </div>
                </div>
            </div>
            {this.renderEnableSettings()}
        </div>
    }

}

export default useObservableModel<ItemSettingsPanelProps>(ItemSettingsPanel);