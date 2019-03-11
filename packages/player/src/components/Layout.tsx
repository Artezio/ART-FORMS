import * as React from 'react';
import Questionnaire from './Questionnaire';
import LayoutProps, { LayoutState } from '../interfaces/componentProps/Layout';
import { connect } from 'react-redux';
import { Store } from '../interfaces/Store';
import * as Models from '@art-forms/models';


const mapStateToProps = (store: Store): LayoutState => {
    return { questionnaire: store.questionnaire as Models.Questionnaire }
}

export class Layout extends React.Component<LayoutProps> {
    render() {
        const { questionnaire } = this.props;
        return <div className="container-fluid">
            <div className="menu d-flex row py-2 bg-dark text-light ">
                <h1 className="col-5 font-weight-bold">Questionnaire</h1>
                <div className="d-flex justify-content-around col-7">
                </div>
            </div>
            <div className="main-area row justify-content-center my-5">
                {questionnaire && <Questionnaire questionnaire={questionnaire} />}
            </div>
        </div>
    }
}

export default connect(mapStateToProps)(Layout);