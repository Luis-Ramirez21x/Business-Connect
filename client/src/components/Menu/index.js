// {Auth.loggedIn() ? (
//     <>
//       <Nav.Link as={Link} to='/saved'>
//         See Your Books
//       </Nav.Link>
//       <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
//     </>
//   ) : (
//     <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
//   )}

import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { TOGGLE_MENU } from '../../utils/actions';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';

const Menu = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  function toggleMenu() {
    dispatch({ type: TOGGLE_MENU });
  }

  if (!state.menuOpen) {
    return (
      <div className="cart-closed" onClick={toggleMenu}>
        MENU
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleMenu}>
        [close]
      </div>
      <h2>Menu</h2>
    </div>
  );
};

export default Menu;