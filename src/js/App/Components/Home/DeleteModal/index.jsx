import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';

const DeleteModal = ({
  title,
  toggleModal,
  activeModal,
  activeIndex,
  handleDeleteTodo,
}) => (
  <Modal isOpen={activeModal === 'delete'} toggle={() => toggleModal('')}>
    <ModalHeader toggle={() => toggleModal('')}>Delete Todo</ModalHeader>

    <ModalBody>
      Do you want to delete {title}?
    </ModalBody>

    <ModalFooter>
      <Button color="primary" onClick={() => handleDeleteTodo(activeIndex)}>Yes</Button>
    </ModalFooter>
  </Modal>
);

DeleteModal.propTypes = {
  title: PropTypes.string,
  activeIndex: PropTypes.number,
  toggleModal: PropTypes.func,
  activeModal: PropTypes.string,
  handleDeleteTodo: PropTypes.func,
};

export default DeleteModal;
