// selectors
export const getAllStatuses = state => state.status;

const statusesReducer = (statePart = [], action) => {
    switch (action.type) {
        default:
            return statePart;
    };
};

export default statusesReducer;