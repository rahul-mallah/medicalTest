import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import { auth } from '../firebase';

const NavBar = () => {
    return(
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand><Link to="/">MyAppointment</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
            <Nav.Link href="">Back</Nav.Link>
            <Nav.Link eventKey={2} href="./resetPassword">Change Password llalala</Nav.Link>
            <Nav.Link onClick={() => auth.signOut()}>Logout</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    </div>
    )
}

export default NavBar;