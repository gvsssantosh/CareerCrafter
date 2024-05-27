import "./userNavBar.css";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function UserNavigationBar() {
    const navigate = useNavigate();
    function logoutBtnClick(event) {
        alert("Logged out successfully");

        sessionStorage.clear();

        navigate('/');
    }
    return (
        <>
            
            <Navbar className="custom-navbar">
                <Container>
                    {/* <Navbar.Brand href="/">Career Crafter</Navbar.Brand> */}
                    <Nav className="me-auto custom-nav">
                        <Nav.Link href="/userHome/searchJobs">Search Jobs</Nav.Link>
                        <Nav.Link href="/userHome/myApplications">My Applications</Nav.Link>
                        <Nav.Link href="/userHome/resume">Resume</Nav.Link>
                        <Nav.Link href="/userHome/profile">Profile</Nav.Link>
                        <Nav.Link href="#"  onClick={(event) => logoutBtnClick(event)}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}
export default UserNavigationBar;