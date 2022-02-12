import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from '../SignupForm';
import LoginForm from '../LoginForm';
import './index.css';

import Auth from '../../utils/auth';

const Navv = () => {
  // set modal display state
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar className='nav-main' bg='' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand className='nav-brand-main' as={Link} to='/'>
          <div className='nav-logo'></div>
            <h3 className='nav-brand-title'> Business Connect</h3>
          </Navbar.Brand>
            <Nav className='ml-auto nav-menu'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <DropdownButton id="dropdown-basic-button" title="Menu">
                {Auth.loggedIn() ? (
                  <div>
                    <Dropdown.Item onClick={Auth.logout}>Logout</Dropdown.Item>
                    <Dropdown.Item as={Link} to='/mybusiness'>My Business</Dropdown.Item>
                    <Dropdown.Item as={Link} to='/connect' >Connect</Dropdown.Item>
                  </div>
                ) : (
                  <Dropdown.Item onClick={() => setShowModal(true)}>Login/Sign Up</Dropdown.Item>
                )}
              </DropdownButton>
            </Nav>
        </Container>
      </Navbar>
      {/* MODAL FOR LOGIN/SIGNUP */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default Navv