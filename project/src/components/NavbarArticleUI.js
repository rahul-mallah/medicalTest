import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import { auth } from '../firebase';

const NavBarArticle = () => {
    return(
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Nav.Link href="/new-article">New Article</Nav.Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
    </Navbar.Collapse>
    </Navbar>
    </div>
    )
}

export default NavBarArticle;