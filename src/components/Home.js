// Home.js





import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import axios from 'axios';

import '../CSS/Global/Global.css';
import '../CSS/Home/Home.css';

import TypeWriterEffect from 'react-typewriter-effect';

// Importing 3D Models
import DesktopSetup from './Global-Components/3-D_Models/Desktop';
import PickleballBadminton from './Global-Components/3-D_Models/Pickleball_badminton';
import Nethan_Avatar from './Global-Components/3-D_Models/Nethan_Avatar';

// Profile photo
import NethanPC from './Projects-Components/Photography/Photograph_Images/nethan1.jpg';

// Optional orbit controls (if needed)
import { OrbitControls } from '@react-three/drei';

const Home = () => {


    return (
        <div className="homepage">
            <header className="hero">
                <h1 className="gradient-text apple-style">I create. I code. I capture.</h1>
                <TypeWriterEffect
                    textStyle={{
                        fontSize: '1.25rem',
                        color: '#bbbbbb',
                        textAlign: 'center',
                        marginTop: '1.5rem' // space between headline and typewriter
                    }}
                    cursorColor="white"
                    text="Follow my journey through music, code, and the lens."
                    typeSpeed={30}
                    deleteSpeed={20}
                />
            </header>

            <section className="intro">
                <div className="intro-text">
                    <img src={NethanPC} alt="Nethan G" className="profile-pic" />
                    <h2 className='gradient-name'>Nethan Nagendran</h2>
                    <p>
                        Hey! I'm Nethan — a CS student, guitarist, and visual storyteller. Whether I’m building
                        apps, jamming out solos, or snapping the world around me, this is where I share it all.
                    </p>
                    <a href="/contact" className="contact-btn">Contact Me</a>
                </div>

                <div className='welcome-side-2'>
                    <Canvas>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <Suspense fallback={null}>
                            <Nethan_Avatar scale={[0.8, 0.8, 0.8]} />
                            <OrbitControls
                                enableRotate={true}
                                enableZoom={false}
                                autoRotate={true}
                                autoRotateSpeed={0.6}
                                rotateSpeed={0.2}
                                maxPolarAngle={Math.PI / 2}
                                minPolarAngle={Math.PI / 2}
                            />

                        </Suspense>

                    </Canvas>
                </div>
            </section>
        </div>
    );
};

export default Home;
