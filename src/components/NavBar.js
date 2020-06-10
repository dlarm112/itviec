import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";






export default function NavBar(props) {
    return (
<div>

    <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container">
            <Link to={`/`}>
            <Navbar.Brand><img width="110px" src="/images/itviec.png"></img></Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Sign In</Nav.Link>
            </Nav>

        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
        </Form>
        </Navbar.Collapse>
        <Form inline onSubmit = { (e) => props.searchByKeyword(e) }>
            <FormControl onChange={ (e) => props.setKeyword(e.target.value) } type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success" type="submit">Search</Button>
        </Form>
        </div>
    </Navbar>
</div>
    )
}
