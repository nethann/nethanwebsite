

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
import DynamicIsland from './components/Global-Components/DynamicIsland';
import IOS26Navbar from './components/Global-Components/iOS26Navbar';
import Footer from './components/Global-Components/Footer';
import SpotifyAuth from './components/SpotifyAuth';


import "./CSS/Global/Nav.css"
import "./CSS/Global/LiquidGlass.css"
import "./CSS/Global/iOS26DesignSystem.css"


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <DynamicIsland />
        <IOS26Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/music" element={<Music />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/gameDevelopment" element={<Modeling />} />
            <Route path="/spotify-auth" element={<SpotifyAuth />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
