import React from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
} from 'reactstrap';

import PropTypes from 'prop-types';

import styles from './index.module.scss';

const TopBar = ({toggleModal}) => (
  <div>
    <Navbar color="light" light fixed={'top'} expand="md">
      <NavbarBrand href="/">
        <img src="/media/logo-todo.png" height="75" />
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem
          className={styles.addTodo}
          onClick={() => toggleModal('add')}
        >
          Add
        </NavItem>
      </Nav>
    </Navbar>
  </div>
);

TopBar.propTypes = {
  toggleModal: PropTypes.func,
};

export default TopBar;
