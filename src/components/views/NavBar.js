import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="mt-4 mb-4 rounded" >
            <Container>
                <Navbar.Brand as={Link} to="/">Waiter-app</Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;