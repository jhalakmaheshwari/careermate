/**
 * Created by Jhalak on 8/26/2017.
 */
import { FETCH_JOB } from '../actions';
import _ from 'lodash'

export default  function (state = {}, action) {
    switch (action.type){
        case FETCH_JOB:
            console.log("IN REDUCER JOBS")
            console.log(action.payload.data)
            return _.mapKeys(action.payload.data, 'id');
        // return _.mapKeys(action.payload.data, 'id');
        default:
            return state;

    }
}