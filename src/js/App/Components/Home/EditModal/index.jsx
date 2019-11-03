import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';
import {
  Col,
  Form,
  Label,
  Modal,
  Alert,
  Input,
  Button,
  ModalBody,
  FormGroup,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';

const EditModal = ({
  todo,
  errors,
  bucketList,
  activeModal,
  activeIndex,
  toggleModal,
  handleEditTodo,
  handleAddBucket,
  handleInputChange,
  handleStatusChange,
  handleBucketChange,
}) => (
  <Modal isOpen={activeModal === 'edit'} toggle={() => toggleModal('')}>
    <ModalHeader toggle={() => toggleModal('')}>Edit Todo</ModalHeader>

    <Form>
      <ModalBody>
        {
          errors.title &&
          <Alert color="danger">
            {errors.title}
          </Alert>
        }
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input
              type="text"
              name="title"
              id="title"
              onChange={handleInputChange}
              value={todo.title}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="bucket" sm={2}>Bucket</Label>
          <Col sm={10}>
            <Creatable
              id="bucket"
              value={{value: todo.bucket, label: todo.bucket}}
              options={bucketList}
              onChange={handleBucketChange}
              onCreateOption={handleAddBucket}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="status" sm={2}>Completed</Label>
          <Col sm={10}>
            <Select
              id="status"
              value={{value: todo.isCompleted, label: todo.isCompleted ? 'Completed' : 'Not Completed'}}
              options={[{
                value: true,
                label: 'Completed',
              }, {
                value: false,
                label: 'Not Completed',
              }]}
              onChange={handleStatusChange}
            />
          </Col>
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={() => handleEditTodo(activeIndex, todo)}>Submit</Button>
      </ModalFooter>
    </Form>
  </Modal>
);

EditModal.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    bucket: PropTypes.string,
    isCompleted: PropTypes.bool,
  }),
  bucketList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  errors: PropTypes.shape({
    title: PropTypes.string,
  }),
  toggleModal: PropTypes.func,
  activeModal: PropTypes.string,
  activeIndex: PropTypes.number,
  handleEditTodo: PropTypes.func,
  handleAddBucket: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleStatusChange: PropTypes.func,
  handleBucketChange: PropTypes.func,
};

export default EditModal;
