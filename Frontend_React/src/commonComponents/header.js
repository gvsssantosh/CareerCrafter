import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container className="container-header">
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/images/careercrafter_logo.svg"
                            width="45"
                            height="40"
                            className="d-inline-block align-top"
                        />{' '}
                        Career Crafter
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/aboutUs">About Us</Nav.Link>
                        <Nav.Link href="/contactUs">Contact Us</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <NavDropdown title="Login" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/userLogin">User Login</NavDropdown.Item>
                            <NavDropdown.Item href="/admin-login">Admin Login</NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown title="Register" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/userRegister">User Register</NavDropdown.Item>
                            <NavDropdown.Item href="/admin-register">Admin Register</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );

}
export default Header;