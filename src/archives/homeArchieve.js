import React from 'react'



import "../CSS/Global/Global.css"

import { Suspense } from 'react'
import { useState, useEffect } from 'react';

//THREE JS FIBER
import { Canvas } from '@react-three/fiber';

//importing 3-D model 
import DesktopSetup from "./Global-Components/3-D_Models/Desktop"
import PickleballBadminton from "./Global-Components/3-D_Models/Pickleball_badminton"
import Nethan_Avatar from "./Global-Components/3-D_Models/Nethan_Avatar"

import axios from 'axios';

import "../CSS/Home/Home.css"
import '../CSS/Global/Stickers.css';

import TypeWriterEffect from 'react-typewriter-effect';

import NethanPC from "./Projects-Components/Photography/Photograph_Images/nethan1.jpg"



//animation
import Aos from 'aos';
import "aos/dist/aos.css"


// Importing orbit controls 
import ControlledOrbitControls from './Global-Components/ControlledOrbitControls';

export default function Home() {
    const [enableRotate, setEnableRotate] = useState(true);


    var today = new Date();
    var birthDate = new Date('6/25/2005');  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
    }


    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=atlanta&units=imperial&appid=5125605cff667618b52d4b08100d9eef';
    const discordUrl = 'https://api.lanyard.rest/v1/users/743601359697477713';


    //weather ITEM
    const [weatherInfo, setweatherInfo] = useState('');
    const [weatherDescription, setweatherDescription] = useState('');
    const [weatherLogo, setweatherLogo] = useState('');
    const [Fahrenheit, setFahrenheit] = useState('');


    //Discord ITEMS
    const [discordStatus, setdiscordStatus] = useState('');

    const [discordStatusClass, setdiscordStatusClass] = useState('');
    const [discordPulse, setDiscordPulse] = useState('')



    useEffect(() => {

        //weather API
        axios.get(weatherUrl).then((response) => {

            setweatherInfo(response.data.weather[0].main.toLowerCase())

            setweatherDescription(response.data.weather[0].description)

            setweatherLogo(response.data.weather[0].icon)

            setFahrenheit(response.data.main.temp.toFixed());

        });

        //gobal animation to every single component
        Aos.init({
            duration: 500,
            once: true
        });

    }, [])

    const weatherIcon = `http://openweathermap.org/img/wn/${weatherLogo}@2x.png`;

    return (
        <div className='Home-container'>
            <section className='Welcome-Container'>


                <div className='welcome-side-1'>
                    <div className='Weather-Status'>
                        <img className='weather-Icon' src={weatherIcon} />
                    </div>


                    <p className='margin-fix abt-txt'>

                        <TypeWriterEffect
                            textStyle={{
                                fontFamily: 'Arial',
                                color: 'white',
                                fontWeight: 500,
                                fontSize: '1em',
                            }}
                            cursorColor="#3F3D56"
                            multiText={[
                                "Nethan Nagendran",
                            ]}
                            typeSpeed={90}
                        />

                    </p>

                    <div className='my-brief-info'>
                        <p className='margin-fix college-info'>Computer Science @ Georgia Institute of Technology</p>
                        <p className='margin-fix current-location'>📌 Atlanta, Georgia</p>
                    </div>
                </div>


                <div className='welcome-side-2'>

                    <Canvas>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <Suspense fallback={null}>

                            <Nethan_Avatar scale={[0.5, 0.5, 0.5]} />

                            <ControlledOrbitControls enableRotate={true} enableZoom={true} />
                        </Suspense>
                    </Canvas>

                </div>



            </section>



            <section className='About-Container' data-aos="fade-right">

                <div className='About-Image'>
                    <img alt='Nethan' className='Nethan-Pic' src={NethanPC} />
                </div>

                <div className='About-Description-Holder'>
                    <div className='About-Txt'>
                        <div className='Description-Holder'>
                            <p className='Section main-color'>About me 🐊 </p>


                            <ul className='List'>
                                <li className='Txt-Description'>Hi, I’m Nethan Nagendran, a {age_now}-year-old computer science student and passionate programmer with a love for creating impactful projects</li>
                                <li className='Txt-Description'>When I’m not coding, you’ll find me singing, strumming my guitar, gaming, playing pickleball, or badminton.</li>
                            </ul>

                        </div>


                    </div>

                </div>

            </section>


            {/* Second  */}


            <section className='About-Container-2' data-aos="fade-right">

                <div className='About-Description-Holder-2'>

                    <div className='About-Txt-2'>
                        <h2 className="Developer-Title main-color">Building my future one line at a time 🧠</h2>

                        <div className='Description-Holder-2'>

                            <p className='Section-2'>More about <span className='main-color'>ME</span> 🍀 </p>


                            <ul className='List'>
                                <li className='Txt-Description'>I'm a developer with a passion for building <span className='main-color'>software</span> and web applications with a background in JavaScript, Python, Java, Lua, ReactJS, CSS, and R.</li>
                                <li className='Txt-Description'>I like to build <span className='main-color'>full-stack applications</span> with scalable and responsive technologies. I'm also a fan of the <span className='main-color'>open-source community</span> and always looking for new ways to improve my skills.</li>
                                <li className='Txt-Description'>This website was developed using <span className='main-color'>ReactJS</span> by <span className='main-color'>Nethan</span>. </li>

                            </ul>

                        </div>


                    </div>

                </div>

                <div className='About-Image-2'>
                    <Canvas camera={{ fov: 40, position: [10, 3, 10] }}>

                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />


                        <Suspense fallback={null}>
                            <DesktopSetup />
                            <ControlledOrbitControls enableRotate={true} enableZoom={true} />

                        </Suspense>

                    </Canvas>
                </div>

            </section>


            <section className='About-Container-2' data-aos="fade-right">



                <div className='About-Image-2'>

                    <Canvas>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <Suspense fallback={null}>
                            <PickleballBadminton />
                            <ControlledOrbitControls enableRotate={true} enableZoom={true} />
                        </Suspense>
                    </Canvas>

                </div>

                <div className='About-Description-Holder-2'>
                    <div className='About-Txt-2'>
                        <h2 className="Developer-Title main-color">Pickleball & Badminton 👻</h2>

                        <div className='Description-Holder-2'>

                            <ul className='List'>
                                <li className='Txt-Description Section-description-card'>I play badminton at ARC club, college & pickleball @YMCA. </li>

                            </ul>
                        </div>


                    </div>

                </div>

            </section>
        </div>

    )
}
