//selectors
export const getAllTables = (state => state.tables);
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators
export const updateTable = payload => ({ type: UPDATE_TABLE, payload });

export const fetchTables = () => {
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
            .then(res => res.json())
            .then(tables => dispatch(updateTable(tables)));
    }
};

export const updateTableRequest = (updatedTable) => {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTable),
        };
        fetch('http://localhost:3131/tables', options)
            .then(() => dispatch(updateTable(updatedTable)))
    }
}

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case UPDATE_TABLE:
            return [...action.payload]
        default:
            return statePart;
    };
};
export default tablesReducer;