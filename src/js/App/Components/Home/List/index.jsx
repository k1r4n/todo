import React from 'react';
import {Table} from 'reactstrap';
import PropTypes from 'prop-types';

import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

const List = ({
  todoList,
  toggleModal,
}) => (
  <Table responsive dark className={styles.list}>
    <thead>
      <tr>
        <th className={styles.id}>#</th>
        <th className={styles.title}>Title</th>
        <th className={styles.bucket}>Bucket</th>
        <th className={styles.status}>Status</th>
        <th className={styles.actions}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        todoList.map((todo, index) => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td
              title={todo.title}
            >
              {todo.title}
            </td>
            <td
              title={todo.bucket}
            >
              {todo.bucket}
            </td>
            <td
              title={todo.isCompleted ? 'Completed' : 'Not Completed'}
            >
              {todo.isCompleted ? 'Completed' : 'Not Completed'}
            </td>
            <td className={styles.actionsBody}>
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.action}
                onClick={() => toggleModal('edit', index)}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                className={styles.action}
                onClick={() => toggleModal('delete', index)}
              />
            </td>
          </tr>
        ))
      }
    </tbody>
  </Table>
);

List.propTypes = {
  toggleModal: PropTypes.func,
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    bucket: PropTypes.string,
    isCompleted: PropTypes.bool,
  })),
};

export default List;
