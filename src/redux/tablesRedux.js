import { API_URL } from '../config';

//selectors
export const getAllTables = (state => state.tables);
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const updateTable = payload => ({ type: UPDATE_TABLE, payload });

export const fetchTables = () => {
    return (dispatch) => {
        // fetch('http://localhost:3131/api/tables')
        fetch(API_URL + '/tables')
            .then(res => res.json())
            .then(tables => dispatch(updateTables(tables)));
    }
};

export const updateTableRequest = (updatedTable) => {
    return (dispatch) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTable),
        };
        // fetch(`http://localhost:3131/tables/${updatedTable.id}`, options)
        fetch(API_URL + '/tables/' + updatedTable.id, options)
            .then(() => dispatch(updateTable(updatedTable)))
    }
};
const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case UPDATE_TABLES:
            return [...action.payload]
        case UPDATE_TABLE:
            return statePart.map((table) => table.id === action.payload.id ? {...table, ...action.payload} : table);
        default:
            return statePart;
    };
};
export default tablesReducer;