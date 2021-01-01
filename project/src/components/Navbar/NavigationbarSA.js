import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import styled from 'styled-components';
import { auth } from '../../firebase';

const Styles = styled.div`
  .navbar { background-color: #2B3856; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #95B9C7;
    &:hover { color: white; }
  }
  .navbar-brand, .navbar-brand:hover {
    font-size: 1.4em;
    color: #98AFC7;
    cursor: default;
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

const NaviBar = () => {
    return(
        <Styles>
        <Navbar>
            <Navbar.Brand>My Appointment</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link onClick={() => auth.signOut()}>Logout</Nav.Link></Nav.Item>
              </Nav>
        </Navbar>
        </Styles>
    )
}

export default NaviBar;