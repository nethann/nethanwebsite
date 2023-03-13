
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"

import { Link } from 'react-router-dom';

import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

import { useState } from 'react';

import "./CSS/Global/Nav.css"


function App() {
  const [expanded, setExpanded] = useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navbar expanded={expanded} collapseOnSelect expand="lg" bg="background" variant="dark">
            <Container>
              <Navbar.Brand as={Link} variant="light" to="/">Nethan Nagendran</Navbar.Brand>
              <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                  <Nav.Link id='nav-link' onClick={() => setExpanded(false)} as={Link} to="/">Home</Nav.Link>
                  <NavDropdown  title="Projects" id="basic-nav-dropdown">
                    <NavDropdown.Item id='dropdown-item'   onClick={() => setExpanded(false)} as={Link} to="/projects">Computer Science</NavDropdown.Item>
                    <NavDropdown.Item id='dropdown-item'   onClick={() => setExpanded(false)} as={Link} to="/3dmodeling">3-D modeling</NavDropdown.Item>
                    <NavDropdown.Item id='dropdown-item'  onClick={() => setExpanded(false)} as={Link} to="/music">Music</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link id='nav-link' onClick={() => setExpanded(false)} as={Link} to="/contact">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
