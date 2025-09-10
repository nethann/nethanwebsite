
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
import Modeling from './components/Projects-Components/3d-modeling/Modeling';
import Music from './components/Projects-Components/Music/Music';
import Photography from './components/Projects-Components/Photography/Photography';
import ScrollNavbar from './components/ScrollNavbar';
import DynamicIsland from './components/Global-Components/DynamicIsland';

import { useState } from 'react';

import "./CSS/Global/Nav.css"
import "./CSS/Global/LiquidGlass.css"
import "./CSS/Global/iOS26DesignSystem.css"


function App() {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <BrowserRouter>
      <div className="App">
        <DynamicIsland />
        <ScrollNavbar />
        <>
          <Navbar expanded={expanded} collapseOnSelect expand="lg" variant="dark">
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
                    <NavDropdown.Item id='dropdown-item'  onClick={() => setExpanded(false)} as={Link} to="/music">Music</NavDropdown.Item>
                    <NavDropdown.Item id='dropdown-item'  onClick={() => setExpanded(false)} as={Link} to="/photography">Photography</NavDropdown.Item>
                    <NavDropdown.Item id='dropdown-item'   onClick={() => setExpanded(false)} as={Link} to="/gameDevelopment">Game Dev</NavDropdown.Item>

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
            <Route path="/music" element={<Music />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/gameDevelopment" element={<Modeling />} /> 

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
