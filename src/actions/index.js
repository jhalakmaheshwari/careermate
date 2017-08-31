import uuid from 'node-uuid'
import axios from 'axios';
export const CREATE_USER = 'create_user';
export const CHECK_USER = 'check_user';
export const CREATE_JOB = 'createJobForUser';
export const FETCH_JOB = "fetch_job";
export const FETCH_JOB_DETAIL = "fetch_job_detail";
export const UPDATE_DATE = "update_date";



export function createJobForUser(values, callback) {
    var items = {
        "id": uuid.v1(),
        "userId": localStorage.userId,
        "company": values.company,
        "profile": values.profile,
        "interviewdate": values.interviewdate,
        "joblink":values.joblink
    };
    const request = axios.post("http://127.0.0.1:4000/createJob/",{
        values: items
    });
    return {
        type: CREATE_JOB,
        payload: request
    }
}

export function fetchJobs(){
    const request = axios.get("http://127.0.0.1:4000/detail/"+localStorage.userId);

    return {
        type: FETCH_JOB,
        payload: request
    }
}

export function fetchJobDetail(id) {
    const request = axios.get("http://127.0.0.1:4000/particulardetail/"+id);
    return {
        type: FETCH_JOB_DETAIL,
        payload: request
    }
}

export function updateDate(id, value) {
    const request = axios.get("http://127.0.0.1:4000/updateDate/"+id+':'+value);
    return {
        type: UPDATE_DATE,
        payload: request
    }
}

export function updateToDo(id, value) {
    const request = axios.post("http://127.0.0.1:4000/updatetodo/"+id,{
        toDoTasks: value
    });
    return {
        type: UPDATE_DATE,
        payload: request
    }
}