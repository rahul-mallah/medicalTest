import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBar = () => {
    return(
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">MyAppointment</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
            <Nav.Link href="">Back</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">Change Password</Nav.Link>
            <Nav.Link href="">Logout</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    </div>
    )
}

export default NavBar;