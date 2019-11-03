
import store from '../store';
import todoList from '../../data/todo.json';
import bucketList from '../../data/bucket.json';

export const updateTodoList = (newTodoList) => (store.dispatch({
  type: 'UPDATE_TODO_LIST',
  payload: newTodoList ? newTodoList : todoList,
}));

export const updateBucketList = (newBucketList) => (store.dispatch({
  type: 'UPDATE_BUCKET_LIST',
  payload: newBucketList ? newBucketList : bucketList,
}));

