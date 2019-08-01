import { createAction } from 'redux-actions';

export const createActionAsync = ([pending, success, failed]: string[], fn: Function) => (...args: any[]) => async (dispatch: any) => {
    dispatch(createAction(pending)());
    try {
        const data = await fn.apply(null, args);
        dispatch(createAction(success)(data))
        return { data: data };
    } catch (error) {
        dispatch(createAction(failed)(error))
        return { error: error };
    }
}