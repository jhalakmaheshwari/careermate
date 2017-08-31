/**
 * Created by Jhalak on 8/25/2017.
 */
import { CHECK_USER } from '../actions';
import { FETCH_JOB } from '../actions';
import _ from 'lodash'

export default function (state = {}, action) {
    switch (action.type){
        case CHECK_USER:
            console.log(action.payload.data);
            return { ...state, [action.payload.data.userId]: action.payload.data };
        default:
            return state;
    }
}