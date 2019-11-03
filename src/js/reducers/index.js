const initialState = {
  todoList: [],
  bucketList: [],
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TODO_LIST':
      return Object.assign({}, state, {
        todoList: action.payload,
      });
    case 'UPDATE_BUCKET_LIST':
      return Object.assign({}, state, {
        bucketList: action.payload,
      });
    default:
      return state;
  }
};

export default asyncReducer;
