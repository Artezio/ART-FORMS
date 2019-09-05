export enum ACTIONS {
    LOAD_QUESTIONNAIRE_FETCHING = 'LOAD_QUESTIONNAIRE_FETCHING_QEP',
    LOAD_QUESTIONNAIRE_LOADED = 'LOAD_QUESTIONNAIRE_LOADED_QEP',
    LOAD_QUESTIONNAIRE_ERROR = 'LOAD_QUESTIONNAIRE_ERROR_QEP',
    CREATE_NEW_QUESTIONNAIRE = 'CREATE_NEW_QUESTIONNAIRE_QEP',
    SAVE_NEW_QUESTIONNAIRE_SAVING = 'SAVE_NEW_QUESTIONNAIRE_SAVING_QEP',
    SAVE_NEW_QUESTIONNAIRE_SAVED = 'SAVE_NEW_QUESTIONNAIRE_SAVED_QEP',
    SAVE_NEW_QUESTIONNAIRE_ERROR = 'SAVE_NEW_QUESTIONNAIRE_ERROR_QEP',
    UPDATE_QUESTIONNAIRE_UPDATING = 'UPDATE_QUESTIONNAIRE_UPDATING_QEP',
    UPDATE_QUESTIONNAIRE_UPDATED = 'UPDATE_QUESTIONNAIRE_UPDATED_QEP',
    UPDATE_QUESTIONNAIRE_ERROR = 'UPDATE_QUESTIONNAIRE_ERROR_QEP',
    RESET_SAVING_STATUS = 'RESET_SAVING_STATUS_QEP',
    RESET_UPDATING_STATUS = 'RESET_UPDATING_STATUS_QEP'
}

export enum STATUS_LOADING {
    fetching = 'fetching',
    loaded = 'loaded',
    error = 'error'
}

export enum STATUS_SAVING {
    saving = 'saving',
    saved = 'saved',
    error = 'error'
}

export enum STATUS_UPDATING {
    updating = 'updating',
    updated = 'updated',
    error = 'error'
}

export enum MODE {
    creating = 'creating',
    updating = 'updating'
}