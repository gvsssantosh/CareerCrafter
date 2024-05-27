
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 

// import "./adminhome.css"
import "../../user/components/userNavBar.css"

function AdminNavigationBar() {


    const navigate = useNavigate();
    function logoutBtnClick(event) {
        alert("Logged out successfully");

        sessionStorage.clear();

        navigate('/');
    }
    return (
        <>
            {/* <nav className='nav'>
                <ul>
                    <li><button onClick={() => navigate('/AdminHome/Jobs')}>Jobs</button></li>
                    <li><button onClick={() => navigate('/AdminHome/Applications')}>Applications</button></li>
                    <li><button onClick={() => navigate('/AdminHome/JobForm')}>JobForm</button></li>
                    <li><button onClick={() => navigate('/AdminHome/AdminJobList')}>AdminJobList</button></li>
                    <li><button onClick={() => logoutBtnClick()}>Logout</button></li>
                </ul>
            </nav> */}
            <Navbar className="custom-navbar">
                <Container>
                    {/* <Navbar.Brand href="/">Career Crafter</Navbar.Brand> */}
                    <Nav className="me-auto custom-nav">
                        <Nav.Link href="/AdminHome/Jobs">Jobs</Nav.Link>
                        <Nav.Link href="/AdminHome/Applications">Applications</Nav.Link>
                        <Nav.Link href="/AdminHome/JobForm">JobForm</Nav.Link>
                        <Nav.Link href="/AdminHome/AdminJobList">AdminJobList</Nav.Link>
                        <Nav.Link href="#"  onClick={(event) => logoutBtnClick(event)}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
export default AdminNavigationBar;