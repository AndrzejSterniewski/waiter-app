import { API_URL } from '../config';

// selectors
export const getAllStatuses = state => state.status;

// actions
const createActionName = actionName => `app/status/${actionName}`;
const UPDATE_STATUSES = createActionName('UPDATE_STATUSES');

// action creators
export const updateStatuses = payload => ({ type: UPDATE_STATUSES, payload });

export const fetchStatuses = () => {
    return (dispatch) => {
        // fetch('http://localhost:3131/api/status')
        fetch(API_URL + '/status')
            .then(res => res.json())
            .then(statuses => dispatch(updateStatuses(statuses)));
    }
};

const statusesReducer = (statePart = [], action) => {
    switch (action.type) {
        case UPDATE_STATUSES:
        return [...action.payload]
        default:
            return statePart;
    };
};

export default statusesReducer;