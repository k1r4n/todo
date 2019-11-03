import React from 'react';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';
import {
  Col,
  Form,
  Label,
  Alert,
  Modal,
  Input,
  Button,
  ModalBody,
  FormGroup,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';

const AddModal = ({
  todo,
  errors,
  bucketList,
  activeModal,
  toggleModal,
  handleAddTodo,
  handleAddBucket,
  handleInputChange,
  handleBucketChange,
}) => (
  <Modal isOpen={activeModal === 'add'} toggle={() => toggleModal('')}>
    <ModalHeader toggle={() => toggleModal('')}>Add Todo</ModalHeader>

    <Form>
      <ModalBody>
        {
          Object.keys(errors).length > 0 &&
          <Alert color="danger">
            {errors.title && <div>{errors.title}</div>}
            {errors.bucket && <div>{errors.bucket}</div>}
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
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={() => handleAddTodo(todo)}>Submit</Button>
      </ModalFooter>
    </Form>
  </Modal>
);

AddModal.propTypes = {
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
    bucket: PropTypes.string,
  }),
  toggleModal: PropTypes.func,
  activeModal: PropTypes.string,
  handleAddTodo: PropTypes.func,
  handleAddBucket: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleBucketChange: PropTypes.func,
};

export default AddModal;
