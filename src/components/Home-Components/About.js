import { React, Suspense } from 'react'
import { useState, useEffect } from 'react';

// component files 
import StickerWithPosition from '../StickerWithPosition';

//THREE JS FIBER
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

//importing 3-D model 
import DesktopSetup from "./Desktop"
import PickleballBadminton from "./Pickleball_badminton"
import axios from 'axios';

//CSS profile import
import "../../CSS/Home/About.css"
import "../../CSS/Global/Stickers.css"

import TypeWriterEffect from 'react-typewriter-effect';

//IMAGE import 
import Nethan from "../../images/Home/Nethan.png";
import NethanPC from "../../images/Home/Pc.jpg"

import Tilt from 'react-parallax-tilt';

// Stickers
import SunGlassSticker from "../Stickers/SunGlassSticker.gif"
import WonderSticker from "../Stickers/WonderSticker.gif"
import MonkeySticker from "../Stickers/MonkeySticker.png"
import FishSticker from "../Stickers/FishSticker.png"
import PeaceSticker from "../Stickers/PeaceSticker.png"

import { Link } from 'react-router-dom';

//animation
import Aos from 'aos';
import "aos/dist/aos.css"

export default function About() {

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

        // const presenceInterval = setInterval(() => {
        //     axios.get(discordUrl).then((discordResponse) => {
        //         const disVar = discordResponse.data.data.discord_status;


        //         if (disVar === 'online') {
        //             setdiscordStatus("online");
        //             setdiscordStatusClass('discord-online')
        //         }

        //         else if (disVar === 'idle') {
        //             setdiscordStatus("online");
        //             // setdiscordStatus("on idle");
        //             setdiscordStatusClass('discord-online')
        //             // setdiscordStatusClass('discord-idle')
        //         }

        //         else if (disVar === 'dnd') {
        //             setdiscordStatus("online");
        //             // setdiscordStatus("on do not disturb");
        //             setdiscordStatusClass('discord-online')
        //             // setdiscordStatusClass('discord-dnd')
        //         }

        //         else if (disVar === 'offline') {
        //             setdiscordStatus("offline");
        //             setdiscordStatusClass('discord-offline')
        //         }

        //     })
        // }, 5000)

        axios.get(discordUrl).then((discordResponse) => {
            const disVar = discordResponse.data.data.discord_status;


            if (disVar === 'online') {
                setdiscordStatus("online");
                setdiscordStatusClass('discord-online')
                setDiscordPulse('discord-pulse-online')
            }

            else if (disVar === 'idle') {
                setdiscordStatus("online");
                // setdiscordStatus("on idle");
                setdiscordStatusClass('discord-online')
                setDiscordPulse('discord-pulse-idle')

                // setdiscordStatusClass('discord-idle')
            }

            else if (disVar === 'dnd') {
                setdiscordStatus("online");
                // setdiscordStatus("on do not disturb");
                setdiscordStatusClass('discord-online')
                setDiscordPulse('discord-pulse-dnd')

                // setdiscordStatusClass('discord-dnd')
            }

            else if (disVar === 'offline') {
                setdiscordStatus("offline");
                setDiscordPulse('discord-pulse-offline')

                setdiscordStatusClass('discord-offline')
            }

        })

        // return () => clearInterval(presenceInterval);

    }, [])

    const weatherIcon = `http://openweathermap.org/img/wn/${weatherLogo}@2x.png`;


    return (
        <>

            <section className='Welcome-Container'>


                <div className='Weather-Status'>
                    <img className='weather-Icon' src={weatherIcon} />


                    {/* <p className='weather-description'>Software Developer, 3-D modeler & Musician</p> */}
                    {/* <p className='weather-description'>It's currently <span className='weather-span'>{weatherInfo}</span> with <span className='weather-span-2'>{weatherDescription} here.</span></p> */}
                    {/* <p className='weather-Fahrenheit'>{Fahrenheit}°F</p> */}
                </div>


                <p className='abt-txt'>

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
                    <p className='margin-fix college-info'>Computer Science @ Georgia Institue of Technology</p>
                    <p className='margin-fix'>📌 Atlanta, Georgia</p>
                </div>


            </section>



            <section className='About-Container' data-aos="fade-right">

                <div className='About-Image'>
                    <img alt='Nethan' className='Nethan-Pic' src={NethanPC} />
                </div>

                <div className='About-Description-Holder'>
                    <div className='About-Txt'>
                        {/* <h2 className='Nethan-Name'>About me</h2> */}
                        <div className='Description-Holder'>
                            <p className='Section main-color'>About me </p>


                            <ul className='List'>
                                {/* <li className='Txt-Description'>I am a {age_now} year old Software Developer living in America.</li> */}
                                <li className='Txt-Description'>Hi, I’m Nethan Nagendran, a {age_now}-year-old computer science student and passionate programmer with a love for creating impactful projects</li>
                                <li className='Txt-Description'>When I’m not coding, you’ll find me singing, strumming my guitar, playing pickleball, or badminton.</li>
                                <p className={`Txt-Description`}>Right now, I'm <span className={discordStatusClass}>{discordStatus}</span></p>
                            </ul>

                        </div>


                    </div>

                </div>

            </section>


            {/* Second  */}


            <section className='About-Container-2' data-aos="fade-right">

                {/* <img className='Sticker' src={MonkeySticker} style={imageStyle} />  */}


                <div className='About-Description-Holder-2'>

                    <div className='About-Txt-2'>
                        <h2 className="Developer-Title main-color">Being a Developer... 🛠️</h2>

                        <div className='Description-Holder-2'>

                            <p className='Section-2'>More about <span className='main-color'>ME</span></p>


                            <ul className='List'>
                                <li className='Txt-Description'>I'm a developer with a passion for building <span className='main-color'>software</span> and web applications with a background in JavaScript, Python, Lua, ReactJS, and R.</li>
                                <li className='Txt-Description'>I like to build <span className='main-color'>full-stack applications</span> with scalable and responsive technologies. I'm also a fan of the <span className='main-color'>open-source community</span> and always looking for new ways to improve my skills.</li>

                            </ul>

                        </div>


                    </div>

                </div>

                <div className='About-Image-2'>
                    <Canvas camera={{ fov: 40, position: [10, 3, 10] }}>

                        <pointLight position={[0, 20, 10]} intensity={1.5} />


                        <Suspense fallback={null}>
                            <DesktopSetup />
                            <OrbitControls autoRotate enableZoom={false} />

                        </Suspense>

                    </Canvas>
                </div>

            </section>


            <section className='About-Container-2' data-aos="fade-right">



                <div className='About-Image-2'>

                    <Canvas camera={{ fov: 20, position: [10, 3, 10] }} shadows>

                        <pointLight position={[0, 20, 10]} intensity={2} />
                        {/* <pointLight position={[-70, -90, -80]} intensity={1.5} /> */}
                        <pointLight position={[-0, -20, -10]} intensity={2} />


                        <Suspense fallback={null}>
                            <PickleballBadminton />
                            <OrbitControls autoRotate enableZoom={false} />
                        </Suspense>

                    </Canvas>
                </div>





                <div className='About-Description-Holder-2'>
                    <div className='About-Txt-2'>
                        <h2 className="Developer-Title main-color">Pickleball & Badminton 🏸</h2>

                        <div className='Description-Holder-2'>
                            {/* <p className='Section-2'>Who am I <span className='main-color'>&</span> How did I get here?</p> */}


                            <ul className='List'>
                                <li className='Txt-Description Section-description-card'>I play badminton in my college club and pickleball @YMCA. </li>
                                {/* <li className='Txt-Description'>I strive to cultivate a vibrant <span className='main-color'>pickleball community</span> in my city, bringing players together and promoting the sport for everyone to enjoy.</li> */}

                            </ul>
                        </div>


                    </div>

                </div>

            </section>




        </>

    )
}
