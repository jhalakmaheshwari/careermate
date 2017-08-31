/**
 * Created by Jhalak on 8/26/2017.
 */
import { FETCH_JOB_DETAIL } from '../actions/index'

export default function (state = [], action) {
    switch (action.type){
        case FETCH_JOB_DETAIL:
            return action.payload
    }
    return state;
}