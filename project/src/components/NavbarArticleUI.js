import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import { auth } from '../firebase';

const NavBarArticle = () => {
    return(
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand><Link to="/">MyAppointment</Link></Navbar.Brand>
    <Nav.Link href="/new-article">New Article</Nav.Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
            <Nav.Link href="/ViewHealthArticle">Back</Nav.Link>
            <Nav.Link eventKey={2} href="./resetPassword">Change Password</Nav.Link>
            <Nav.Link href="/login" onClick={() => auth.signOut()}>Logout</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    </div>
    )
}

export default NavBarArticle;