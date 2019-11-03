import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component, lazy, Suspense} from 'react';

import styles from './index.module.scss';

const List = lazy(() => import('./List'));
const TopBar = lazy(() => import('./TopBar'));
const AddModal = lazy(() => import('./AddModal'));
const EditModal = lazy(() => import('./EditModal'));
const Pagination = lazy(() => import('./Pagination'));
const DeleteModal = lazy(() => import('./DeleteModal'));

import {
  updateTodoList,
  updateBucketList,
} from '../../../actions/fetchAction';

const LIMIT = 15;

const validate = ({title, bucket}) => {
  const errors = {};
  if (title === '') {
    errors.title = 'Title cannot be empty';
  }
  if (bucket === '') {
    errors.bucket = 'Choose a bucket';
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

class Home extends Component {
  static defaultProps = {
    todoList: [],
    bucketList: [],
  }

  static propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      bucket: PropTypes.string,
      isCompleted: PropTypes.bool,
    })),
    bucketList: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })),
    updateTodoList: PropTypes.func,
    updateBucketList: PropTypes.func,
  }

  state = {
    activePage: 1,
    activeModal: '',
    actionIndex: -1,
    todo: {
      id: 0,
      title: '',
      bucket: '',
      isCompleted: false,
    },
    errors: {},
  }

  componentDidMount() {
    const {updateBucketList, updateTodoList} = this.props;
    updateTodoList();
    updateBucketList();
  }

  handleAddTodo = (newTodo) => {
    const {errors, isValid} = validate({title: newTodo.title, bucket: newTodo.bucket});
    if (!isValid) {
      this.setState({errors});
    } else {
      const {todoList, updateTodoList} = this.props;
      updateTodoList([
        ...todoList,
        {
          ...newTodo,
          id: todoList[todoList.length - 1].id + 1,
          isCompleted: false,
        },
      ]);
      this.setState({
        errors: {},
        activePage: parseInt(((todoList.length + 1) / LIMIT), 10) + (((todoList.length + 1) % LIMIT) > 0 ? 1 : 0),
      });
      this.toggleModal('');
    }
  }

  handleEditTodo = (index, editedTodo) => {
    const {errors, isValid} = validate({title: editedTodo.title, bucket: editedTodo.bucket});
    if (!isValid) {
      this.setState({errors});
    } else {
      const {todoList, updateTodoList} = this.props;
      const {activePage} = this.state;
      updateTodoList([
        ...todoList.slice(0, ((activePage - 1) * LIMIT) + index),
        editedTodo,
        ...todoList.slice(((activePage - 1) * LIMIT) + index + 1),
      ]);
      this.setState({errors: {}});
      this.toggleModal('');
    }
  }

  handleDeleteTodo = (index) => {
    const {todoList, updateTodoList} = this.props;
    const {activePage} = this.state;
    updateTodoList([
      ...todoList.slice(0, ((activePage - 1) * LIMIT) + index),
      ...todoList.slice(((activePage - 1) * LIMIT) + index + 1),
    ]);
    this.toggleModal('');
    if (todoList.length - 1 === ((activePage - 1) * LIMIT)) {
      this.setState({activePage: activePage - 1});
    }
  }

  handleAddBucket = (newBucket) => {
    const {bucketList, updateBucketList} = this.props;
    updateBucketList([
      ...bucketList,
      {
        value: newBucket,
        label: newBucket,
      },
    ]);
    this.handleBucketChange({
      value: newBucket,
      label: newBucket,
    });
  }

  toggleModal = (activeModal, actionIndex) => {
    const {todoList} = this.props;
    let todo = {
      id: 0,
      title: '',
      bucket: '',
      isCompleted: false,
    };
    const {activePage} = this.state;
    if (activeModal === 'edit' || activeModal === 'delete') {
      todo = todoList[((activePage - 1) * LIMIT) + actionIndex];
    }
    this.setState({
      activeModal: activeModal ? activeModal : '',
      todo,
      actionIndex: typeof actionIndex === 'number' ? actionIndex : -1,
    });
  }

  handleInputChange = (event) => {
    this.setState({todo: {
      ...this.state.todo,
      [event.target.name]: event.target.value,
    }});
  }

  handleBucketChange = (bucket) => {
    this.setState({todo: {
      ...this.state.todo,
      bucket: bucket.value,
    }});
  }

  handleStatusChange = (isCompleted) => {
    this.setState({todo: {
      ...this.state.todo,
      isCompleted: isCompleted.value,
    }});
  }

  handlePageChange = (activePage) => {
    this.setState({activePage});
  }

  render() {
    const {
      todoList,
      bucketList,
    } = this.props;
    const {
      todo,
      errors,
      activePage,
      activeModal,
      actionIndex,
    } = this.state;
    return (
      <div className={styles.home}>
        <div className={styles.header}>
          <span>
            <Suspense fallback={<div>Loading...</div>}>
              <TopBar
                toggleModal={this.toggleModal}
              />
            </Suspense>
          </span>
        </div>

        <div className={styles.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <List
              todoList={todoList.slice(((activePage - 1) * LIMIT), ((activePage - 1) * LIMIT) + LIMIT)}
              toggleModal={this.toggleModal}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Pagination
              activePage={activePage}
              pageCount={parseInt((todoList.length / LIMIT), 10) + (todoList.length % LIMIT > 0 ? 1 : 0)}
              handlePageChange={this.handlePageChange}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <AddModal
              todo={todo}
              errors={errors}
              bucketList={bucketList}
              activeModal={activeModal}
              toggleModal={this.toggleModal}
              handleAddTodo={this.handleAddTodo}
              handleAddBucket={this.handleAddBucket}
              handleInputChange={this.handleInputChange}
              handleBucketChange={this.handleBucketChange}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <EditModal
              todo={todo}
              errors={errors}
              bucketList={bucketList}
              activeIndex={actionIndex}
              activeModal={activeModal}
              toggleModal={this.toggleModal}
              handleEditTodo={this.handleEditTodo}
              handleAddBucket={this.handleAddBucket}
              handleInputChange={this.handleInputChange}
              handleStatusChange={this.handleStatusChange}
              handleBucketChange={this.handleBucketChange}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <DeleteModal
              title={todo.title}
              toggleModal={this.toggleModal}
              activeModal={activeModal}
              activeIndex={actionIndex}
              handleDeleteTodo={this.handleDeleteTodo}
            />
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todoList: state.todoList,
  bucketList: state.bucketList,
});

const mapDispatchToProps = () => ({
  updateTodoList,
  updateBucketList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
