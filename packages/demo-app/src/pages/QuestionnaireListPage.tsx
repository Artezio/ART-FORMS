import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { questionnaireListPageActions } from '../redux/actions/questionnaireListPageActions';
import { QuestionnaireList } from '../components/questionnaireListPage/QuestionnaireList';
import { STATUS_LOADING, STATUS_DELETING } from '../constants/questionnaireListPage';
import { Spinner } from '../components/Spinner';
import { QuestionnaireListPageProps } from '../interface/questionnaireListPage/QuestionnaireListPageProps';
import LoadQuestionnaireListError from '../components/questionnaireListPage/LoadQuestionnaireListError';

export class QuestionnaireListPage extends React.Component<QuestionnaireListPageProps> {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(questionnaireListPageActions.loadQuestionnaireList());
    }

    renderSpinner() {
        const { status } = this.props;
        if (status.loadingQuestionnaireList === STATUS_LOADING.fetching || status.deletingQuestionnaire === STATUS_DELETING.deleting) {
            return <Spinner />
        }
    }

    renderQuestionnaireList() {
        const { status, questionnaireList } = this.props;
        switch (status.loadingQuestionnaireList) {
            case STATUS_LOADING.loaded: {
                return questionnaireList && <QuestionnaireList questionnaireList={questionnaireList} />
            }
            case STATUS_LOADING.error: {
                return <LoadQuestionnaireListError />
            }
            default: return null;
        }
    }

    render() {
        return <div className="container">
            {this.renderSpinner()}
            <header className="d-flex justify-content-between align-items-center">
                <h1>Questionnaire List</h1>
                <Link to="/questionnaire" className="btn btn-outline-secondary">Create new Questionnaire</Link>
            </header>
            <div>
                {this.renderQuestionnaireList()}
            </div>
        </div>
    }
}

const mapStateToProps = (state: any) => {
    return { ...state.questionnaireListPage };
}

// const QuestionnaireListPage = connect(mapStateToProps)(QuestionnaireListPageClass);
// export { QuestionnaireListPage };
export default connect(mapStateToProps)(QuestionnaireListPage);