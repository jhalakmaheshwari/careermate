import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CheckReducer from './reducer_users';
import FetchJobReducer from './reducer_jobs';
import FetchJobDetail from './reducer_jobdetail'

const rootReducer = combineReducers({
    loginCheck: CheckReducer,
    jobs: FetchJobReducer,
    form: formReducer,
    fetchJobDetail: FetchJobDetail
});

export default rootReducer;
