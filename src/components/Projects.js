import React, { useEffect, useState, useRef } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Tilt from 'react-parallax-tilt';

import "../CSS/Global/Global.css"
import "../CSS/Projects/Technologies.css"
import "../CSS/Projects/GithubRep.css"
import "../CSS/Projects/GitCard.css"
import "../CSS/Projects/CompletedProjects.css"
import "../CSS/Projects/Techcard.css"

import Aos from 'aos';
import "aos/dist/aos.css"

// ICONS IMPORT
import c from "./Projects-Components/Icons/c.png"
import css3 from "./Projects-Components/Icons/css3.png"
import git from "./Projects-Components/Icons/git.png"
import github from "./Projects-Components/Icons/github.png"
import html5 from "./Projects-Components/Icons/html5.png"
import node from "./Projects-Components/Icons/node.png"
import python from "./Projects-Components/Icons/python.png"
import r from "./Projects-Components/Icons/react.png"
import swift from "./Projects-Components/Icons/swift.png"
import vscode from "./Projects-Components/Icons/vscode.png"
import blender from "./Projects-Components/Icons/blender.png"
import firebase from "./Projects-Components/Icons/firebase.png"
import arduino from "./Projects-Components/Icons/Arduino.png"
import react from "./Projects-Components/Icons/react.png"
import Java from "./Projects-Components/Icons/Java.png"

// Project Images
import LightTriangle_1 from "./Projects-Components/computer-science/CompletedProjects/CompSciCompleted_Images/LightTriangle_1.jpg"
import LightTriangle_2 from "./Projects-Components/computer-science/CompletedProjects/CompSciCompleted_Images/LightTriangle_2.jpg"
import Arduino_MotorCircuit from "./Projects-Components/computer-science/CompletedProjects/CompSciCompleted_Images/Arduino_MotorCircuit.png"
import DistanceRobot_Circuit from "./Projects-Components/computer-science/CompletedProjects/CompSciCompleted_Images/DistanceRobot_Circuit.png"
import Gears_Pic from "./Projects-Components/computer-science/CompletedProjects/CompSciCompleted_Images/Gears_Pic.png"
import CardBoardMotor_Setup from "./Projects-Components/computer-science/CompletedProjects/CompSciCompleted_Images/CardBoardMotor_Setup.png"
import GoogleAIY_Front from "./Projects-Components/computer-science/CompletedProjects/CompSciCompleted_Images/GoogleAIY_Front.JPG"
import GoogleAIY_Back from "./Projects-Components/computer-science/CompletedProjects/CompSciCompleted_Images/GoogleAIY_Back.JPG"

// Project vids
import Arduino_Motor from "./Projects-Components/computer-science/CompletedProjects/videos/Arduino_Motor.mp4"
import Gears_Spinning from "./Projects-Components/computer-science/CompletedProjects/videos/Gears_Spinning.mp4"
import Distance_Robot from "./Projects-Components/computer-science/CompletedProjects/videos/Distance_Robot.mp4"
import CardboardMotor from "./Projects-Components/computer-science/CompletedProjects/videos/CardboardMotor.mp4"

// Techcard Component (inline)
function Techcard({ name, image }) {
  return (
    <div className='tech-card-modern'>
      <img src={image} alt='Logo' className='tech-icon-modern' />
      <span className='tech-name-modern'>{name}</span>
    </div>
  )
}

// DynamicGitCard Component (inline)
function DynamicGitCard({ gitName, description, Git_Link, language, stars, lastUpdated, languagesUrl }) {
  const [allLanguages, setAllLanguages] = useState([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      if (!languagesUrl) {
        setLoadingLanguages(false);
        return;
      }

      try {
        const response = await fetch(languagesUrl);
        if (response.ok) {
          const languagesData = await response.json();
          const languageNames = Object.keys(languagesData);
          setAllLanguages(languageNames);
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setLoadingLanguages(false);
      }
    };

    fetchLanguages();
  }, [languagesUrl]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const getLanguageStyle = (lang) => {
    if (!lang) return {
      background: 'rgba(255, 255, 255, 0.08)',
      color: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.15)'
    };

    const normalizedLang = lang.toLowerCase();
    switch(normalizedLang) {
      case 'javascript':
        return {
          background: 'rgba(241, 196, 15, 0.15)',
          color: 'rgba(241, 196, 15, 0.95)',
          border: '1px solid rgba(241, 196, 15, 0.3)'
        };
      case 'typescript':
        return {
          background: 'rgba(52, 152, 219, 0.15)',
          color: 'rgba(52, 152, 219, 0.95)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        };
      case 'python':
        return {
          background: 'rgba(52, 168, 83, 0.15)',
          color: 'rgba(52, 168, 83, 0.95)',
          border: '1px solid rgba(52, 168, 83, 0.3)'
        };
      case 'java':
        return {
          background: 'rgba(231, 76, 60, 0.15)',
          color: 'rgba(231, 76, 60, 0.95)',
          border: '1px solid rgba(231, 76, 60, 0.3)'
        };
      case 'html':
        return {
          background: 'rgba(230, 126, 34, 0.15)',
          color: 'rgba(230, 126, 34, 0.95)',
          border: '1px solid rgba(230, 126, 34, 0.3)'
        };
      case 'css':
        return {
          background: 'rgba(155, 89, 182, 0.15)',
          color: 'rgba(155, 89, 182, 0.95)',
          border: '1px solid rgba(155, 89, 182, 0.3)'
        };
      case 'react':
      case 'jsx':
        return {
          background: 'rgba(97, 218, 251, 0.15)',
          color: 'rgba(97, 218, 251, 0.95)',
          border: '1px solid rgba(97, 218, 251, 0.3)'
        };
      case 'c':
      case 'c++':
        return {
          background: 'rgba(149, 165, 166, 0.15)',
          color: 'rgba(149, 165, 166, 0.95)',
          border: '1px solid rgba(149, 165, 166, 0.3)'
        };
      case 'php':
        return {
          background: 'rgba(142, 68, 173, 0.15)',
          color: 'rgba(142, 68, 173, 0.95)',
          border: '1px solid rgba(142, 68, 173, 0.3)'
        };
      case 'go':
        return {
          background: 'rgba(29, 233, 182, 0.15)',
          color: 'rgba(29, 233, 182, 0.95)',
          border: '1px solid rgba(29, 233, 182, 0.3)'
        };
      case 'rust':
        return {
          background: 'rgba(206, 84, 57, 0.15)',
          color: 'rgba(206, 84, 57, 0.95)',
          border: '1px solid rgba(206, 84, 57, 0.3)'
        };
      case 'swift':
        return {
          background: 'rgba(255, 149, 0, 0.15)',
          color: 'rgba(255, 149, 0, 0.95)',
          border: '1px solid rgba(255, 149, 0, 0.3)'
        };
      case 'kotlin':
        return {
          background: 'rgba(126, 87, 194, 0.15)',
          color: 'rgba(126, 87, 194, 0.95)',
          border: '1px solid rgba(126, 87, 194, 0.3)'
        };
      case 'dart':
        return {
          background: 'rgba(66, 165, 245, 0.15)',
          color: 'rgba(66, 165, 245, 0.95)',
          border: '1px solid rgba(66, 165, 245, 0.3)'
        };
      case 'shell':
      case 'bash':
        return {
          background: 'rgba(76, 175, 80, 0.15)',
          color: 'rgba(76, 175, 80, 0.95)',
          border: '1px solid rgba(76, 175, 80, 0.3)'
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.08)',
          color: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <Tilt glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffffff" glarePosition="bottom" glareBorderRadius='8px' tiltMaxAngleX={2} tiltMaxAngleY={2}>
      <div className='gitcard-holder'>
        <a
          ref={cardRef}
          href={Git_Link}
          target="_blank"
          rel='noreferrer'
          className='Git-Card liquid-hover'
          style={{textDecoration: 'none', height: '280px', display: 'flex', flexDirection: 'column'}}
          onMouseMove={handleMouseMove}
        >

          <div className='Git-Card-FirstSection'>
            <img src={github} className='Git-Img' alt='GitHub Logo' />
            <p className='Git-Name'>{gitName}</p>
          </div>

          <div className='Git-Card-SecondSection' style={{ paddingBottom: '2.5rem' }}>
            <ul className='Ul'>
              <li className='git-Description'>{description}</li>
            </ul>

            <div className='repo-meta' style={{ position: 'absolute', bottom: '0', right: '0', width: '100%' }}>
              <div className='Lang-Container'>
                {loadingLanguages ? (
                  <div style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    Loading...
                  </div>
                ) : allLanguages.length > 0 ? (
                  allLanguages.slice(0, 3).map((lang, index) => {
                    const langStyle = getLanguageStyle(lang);
                    return (
                      <div
                        key={index}
                        style={{
                          margin: 0,
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '12px',
                          ...langStyle
                        }}
                      >
                        {lang}
                      </div>
                    );
                  })
                ) : (
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    ...getLanguageStyle(language)
                  }}>
                    {language || 'Unknown'}
                  </div>
                )}
                {allLanguages.length > 3 && (
                  <div style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    +{allLanguages.length - 3}
                  </div>
                )}
              </div>

              {stars > 0 && (
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>⭐</span>
                  <span>{stars}</span>
                </div>
              )}
            </div>

            {lastUpdated && (
              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.5rem' }}>
                {formatDate(lastUpdated)}
              </div>
            )}
          </div>

        </a>
      </div>
    </Tilt>
  )
}

// CompletedProjectCard Component (inline)
function CompletedProjectCard({ img1, img2, title, description }) {
  return (
    <div className='CompSciProjectCard'>
      <Carousel interval={null}>
        <Carousel.Item>
          <img
            className="CompSciProjectCard_Img"
            src={img1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="CompSciProjectCard_Img"
            src={img2}
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className='CompSciProject_Description_Holder'>
        <p className='CompSciCompletedProject_Title'>{title}</p>
        <p className='CompSciCompletedProject_Description'>{description}</p>
      </div>
    </div>
  )
}

// CompletedProjectswithVid Component (inline)
function CompletedProjectswithVid({ vid, img1, title, description }) {
  return (
    <div className='CompSciProjectCard'>
      <Carousel interval={null}>
        <Carousel.Item>
          <video className='CompletedProject_Vid' playsInline controls>
            <source src={vid} type="video/mp4 " ></source>
          </video>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="CompSciProjectCard_Img"
            src={img1}
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className='CompSciProject_Description_Holder'>
        <p className='CompSciCompletedProject_Title'>{title}</p>
        <p className='CompSciCompletedProject_Description'>{description}</p>
      </div>
    </div>
  )
}

// Technologies Section (inline)
function Technologies() {
  Aos.init({
    duration: 500,
    easing: 'ease-in-out',
    once: true
  });

  return (
    <section className='ios-section'>
      <h2 className='ios-title-medium' style={{textAlign: 'center', marginBottom: '2rem'}} data-aos="fade-up">Technologies I use</h2>

      <div className='tech-grid-modern' data-aos="fade-up" data-aos-delay="100">
        <Techcard name="Python" image={python} />
        <Techcard name="NodeJS" image={node} />
        <Techcard name="HTML" image={html5} />
        <Techcard name="React" image={react} />
        <Techcard name="Github" image={github} />
        <Techcard name="Swift" image={swift} />
        <Techcard name="R" image={r} />
        <Techcard name="CSS" image={css3} />
        <Techcard name="Blender" image={blender} />
        <Techcard name="C++" image={c} />
        <Techcard name="Git" image={git} />
        <Techcard name="VS Code" image={vscode} />
        <Techcard name="Firebase" image={firebase} />
        <Techcard name="Arduino" image={arduino} />
        <Techcard name="Java" image={Java} />
      </div>
    </section>
  )
}

// GithubProjects Section (inline)
function GithubProjects() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //gobal animation to every single component
    Aos.init({
      duration: 500,
      once: true
    });

    // Fetch pinned repositories using a scraping service
    const fetchPinnedRepositories = async () => {
      try {
        const username = 'nethann';

        // Use a GitHub profile scraping service to get pinned repos
        try {
          const response = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`);

          if (response.ok) {
            const pinnedData = await response.json();

            if (pinnedData && pinnedData.length > 0) {
              // Fetch additional details for each pinned repo from GitHub API
              const enrichedRepos = await Promise.all(
                pinnedData.map(async (repo) => {
                  try {
                    const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repo.repo}`);
                    if (repoResponse.ok) {
                      const fullRepoData = await repoResponse.json();
                      return {
                        id: fullRepoData.id,
                        name: fullRepoData.name,
                        description: fullRepoData.description || repo.description,
                        html_url: fullRepoData.html_url,
                        stargazers_count: fullRepoData.stargazers_count,
                        language: fullRepoData.language || repo.language,
                        languages_url: fullRepoData.languages_url,
                        updated_at: fullRepoData.updated_at
                      };
                    } else {
                      // Fallback to scraped data only
                      return {
                        id: repo.repo,
                        name: repo.repo,
                        description: repo.description,
                        html_url: `https://github.com/${username}/${repo.repo}`,
                        stargazers_count: 0,
                        language: repo.language,
                        languages_url: `https://api.github.com/repos/${username}/${repo.repo}/languages`,
                        updated_at: new Date().toISOString()
                      };
                    }
                  } catch (error) {
                    console.warn(`Failed to fetch details for ${repo.repo}:`, error);
                    return {
                      id: repo.repo,
                      name: repo.repo,
                      description: repo.description,
                      html_url: `https://github.com/${username}/${repo.repo}`,
                      stargazers_count: 0,
                      language: repo.language,
                      languages_url: `https://api.github.com/repos/${username}/${repo.repo}/languages`,
                      updated_at: new Date().toISOString()
                    };
                  }
                })
              );

              setRepositories(enrichedRepos.filter(repo => repo !== null));
              setLoading(false);
              return;
            }
          }
        } catch (pinnedError) {
          console.warn('Pinned repos service failed, trying alternative:', pinnedError);
        }

        // Alternative approach: manually specify your actual pinned repositories
        // Update this list with your actual pinned repository names
        const knownPinnedRepos = [
          "contentGenius",
          "GPACalc",
          "GTMovieStore",
          "betterCanvas",
          "GTWalkThrough"
        ];

        // Handle repositories from different users with manual descriptions as fallback
        const repoDetails = [
          {
            name: "contentGenius",
            owner: username,
            fallbackDescription: "AI-powered content generation tool for creating engaging and high-quality content"
          },
          {
            name: "GPACalc",
            owner: username,
            fallbackDescription: "Simple and efficient GPA calculator for academic grade tracking"
          },
          {
            name: "GTMovieStore",
            owner: "nakulshah04",
            fallbackDescription: "GTMovieStore is a web application that allows users to browse, review, and purchase movies with a seamless shopping cart experience"
          },
          {
            name: "betterCanvas",
            owner: username,
            fallbackDescription: "A simple, interactive Tkinter-based GUI that connects to your Georgia Tech Canvas account and displays all upcoming assignments"
          },
          {
            name: "GTWalkThrough",
            owner: "nakulshah04",
            fallbackDescription: "GTWalkThrough is a community-powered web app designed to help Georgia Tech students and staff navigate campus more efficiently by avoiding active construction zones"
          }
        ];

        const pinnedRepoDetails = await Promise.all(
          repoDetails.map(async ({ name, owner, fallbackDescription }) => {
            try {
              const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
              if (response.ok) {
                const repoData = await response.json();
                console.log(`Fetched ${name}:`, repoData.description || 'Using fallback description');

                // Use GitHub description if available, otherwise use fallback
                return {
                  ...repoData,
                  description: repoData.description || fallbackDescription
                };
              } else {
                console.warn(`Failed to fetch ${owner}/${name}: ${response.status}`);
                // Return basic repo info with fallback description if API fails
                return {
                  id: `${owner}-${name}`,
                  name: name,
                  description: fallbackDescription,
                  html_url: `https://github.com/${owner}/${name}`,
                  stargazers_count: 0,
                  language: 'Unknown',
                  languages_url: `https://api.github.com/repos/${owner}/${name}/languages`,
                  updated_at: new Date().toISOString()
                };
              }
            } catch (error) {
              console.warn(`Error fetching ${owner}/${name}:`, error);
              // Return basic repo info with fallback description if fetch fails
              return {
                id: `${owner}-${name}`,
                name: name,
                description: fallbackDescription,
                html_url: `https://github.com/${owner}/${name}`,
                stargazers_count: 0,
                language: 'Unknown',
                languages_url: `https://api.github.com/repos/${owner}/${name}/languages`,
                updated_at: new Date().toISOString()
              };
            }
          })
        );

        const validRepos = pinnedRepoDetails.filter(repo => repo !== null);

        if (validRepos.length > 0) {
          setRepositories(validRepos);
        } else {
          // Final fallback to most starred repos
          const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`);
          const fallbackRepos = await response.json();
          setRepositories(fallbackRepos.filter(repo => !repo.fork));
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching pinned repositories:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPinnedRepositories();
  }, []);

  return (
    <section className='ios-section' data-aos="fade-right">
      <h2 className='ios-title-medium' style={{textAlign: 'center', marginBottom: '2rem'}}>Pinned Repositories ⭐</h2>

      <div className='ios-grid'>
        {loading && <p style={{color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center'}}>Loading repositories...</p>}
        {error && <p style={{color: 'rgba(255, 100, 100, 0.8)', textAlign: 'center'}}>Error loading repositories: {error}</p>}

        {!loading && !error && repositories.map((repo, index) => {
          return (
            <DynamicGitCard
              key={repo.id}
              gitName={repo.name}
              description={repo.description || 'Repository description not available'}
              Git_Link={repo.html_url}
              language={repo.language}
              stars={repo.stargazers_count}
              lastUpdated={repo.updated_at}
              languagesUrl={repo.languages_url}
            />
          );
        })}
      </div>
    </section>
  )
}

// CompletedProjects Section (inline)
function CompletedProjects() {
  return (
    <section className='Git-Container' data-aos="fade-right">
      <p className='Git-Title'>Engineering Journey 🍏 : </p>

      <div className='CompSciProjects_Grid'>
        <CompletedProjectCard img1={LightTriangle_1} img2={LightTriangle_2} title="Pyramid Lights" description="Lazer cut a pyramid shape and Programmed 3 light patterns to function" date="2020" />
        <CompletedProjectswithVid vid={Gears_Spinning} img1={Gears_Pic} title="Gear Kinetic Sculpture" description="Prototyped gears and acrylic using Inkscape & made gears which spins opposite directions and normal direction. " date="2021" />
        <CompletedProjectswithVid vid={Arduino_Motor} img1={Arduino_MotorCircuit} title="Arduino Motor Prototyping" description="Video of motor spinning for the distance sensing robot and the circuit diagram. I Programmed two motors to spin with speed input. This was progress on starting the main distance sensing robot. " date="2021" />
        <CompletedProjectswithVid vid={CardboardMotor} img1={CardBoardMotor_Setup} title="Arduino Motor Prototyping with cardboard" description="Programmed the ultrasonic sensor to read distance and connected batteries to power the arduino using cardboard as the body found at home." date="2021" />
        <CompletedProjectswithVid vid={Distance_Robot} img1={DistanceRobot_Circuit} title="Distance Sensing Robot" description="Prototyped and Programmed a distance sensing robot which can be Programmed for directions. While moving, it will continue to read distance to see if there are any objecting blocking. If so, it will turn either left or right before the robot is hit to the object. " date="2021" />
        <CompletedProjectCard img1={GoogleAIY_Front} img2={GoogleAIY_Back} title="Google AIY" description="Built and Programmed the Google AIY kit to detect face emotion where the button will change color depending on the face the user makes." date="2022" />
      </div>
    </section>
  )
}

// Main Projects Component
export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  Aos.init({
    duration: 500,
    easing: 'ease-in-out',
    once: true
  });

  return (
    <div className='Home-container ios-background'>
      <div className="ios-container" style={{paddingTop: '8rem'}}>
        <div className="dev-intro" data-aos="fade-up">
          <h1>Development</h1>
          <p>Building modern web applications and software solutions</p>
          <p className="location">📍 Atlanta, Georgia, United States</p>
        </div>

        {/* PC Equipment Section */}
        <section className="equipment-section" data-aos="fade-up" data-aos-delay="200">
          <h2>My Setup</h2>
          <div className="equipment-grid">
            <div className="equipment-category">
              <h3>💻 Computer Spex</h3>
              <ul>
                <li>GeForce RTX 4070 Ti</li>
                <li>13th Gen Intel(R) i9-13900k</li>
                <li>32.0GB RAM</li>
                <li>2TB SSD</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🖥️ Displays</h3>
              <ul>
                <li>27" Alienware AW2723DF Monitor (280hz)</li>
                <li>29" LG UltraWide FHD Monitor (60hz)</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>⌨️ Peripherals</h3>
              <ul>
                <li>Logitech G PRO Wireless</li>
                <li>Satechi Slim X1 Keyboard</li>
                <li>XVX Coral Sea Keyboard</li>
                <li>BOYI 68 Keyboard</li>
                <li>Keychron K8 Keyboard</li>
                <li>Logitech C920 Webcam</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🎧 Audio</h3>
              <ul>
                <li>Razer BlackShark V2 PRO Headset</li>
                <li>SteelSeries Arctic Nova 5p Headset</li>
                <li>Sanyum SW208 Speaker</li>
              </ul>
            </div>
          </div>
        </section>

        <div data-aos="fade-up" data-aos-delay="300">
          <Technologies />
        </div>
        <div data-aos="fade-up" data-aos-delay="400">
          <GithubProjects />
        </div>
        <div data-aos="fade-up" data-aos-delay="500">
          <CompletedProjects />
        </div>
      </div>
    </div>
  )
}
