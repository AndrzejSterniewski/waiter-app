//selectors
export const getAllTables = (state => state.tables);
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });

export const fetchTables = () => {
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
            .then(res => res.json())
            .then(tables => dispatch(updateTables(tables)));
    }
};

export const updateTableRequest = (updatedTable) => {
    return (dispatch) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTable),
        };
        fetch(`http://localhost:3131/tables/${updatedTable.id}`, options)
            .then(() => dispatch(updateTables(updatedTable)))
    }
};

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case UPDATE_TABLES:
            return [...action.payload]
        default:
            return statePart;
    };
};
export default tablesReducer;