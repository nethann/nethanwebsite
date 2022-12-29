import { React, Component } from 'react'
import { useState, useEffect } from 'react';
import { ThemeProvider, createUseStyles } from 'react-jss';

import axios from 'axios';
//CSS profile import
import "../../CSS/Home/Pages/About.css"

import Typewriter from 'typewriter-effect';

//IMAGE import 
import Nethan from "../../images/Home/Nethan.png";


export default function About() {

    const currentYear = new Date().getFullYear()

    const nethanAge = currentYear - 2005




    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=atlanta&units=imperial&appid=5125605cff667618b52d4b08100d9eef';
    const discordUrl = 'https://api.lanyard.rest/v1/users/743601359697477713';



    const [data, setData] = useState({})
    const [discordData, setdiscordData] = useState({})


    //weather ITEM
    const [weatherInfo, setweatherInfo] = useState('');
    const [weatherDescription, setweatherDescription] = useState('');
    const [weatherLogo, setweatherLogo] = useState('');
    const [Fahrenheit, setFahrenheit] = useState('');




    //Discord ITEMS
    const [discordStatus, setdiscordStatus] = useState('');

    const [discordStatusClass, setdiscordStatusClass] = useState('');


    useEffect(() => {

        //weather API
        axios.get(weatherUrl).then((response) => {

            setweatherInfo(response.data.weather[0].main.toLowerCase())

            setweatherDescription(response.data.weather[0].description)

            setweatherLogo(response.data.weather[0].icon)

            setFahrenheit(response.data.main.temp.toFixed());

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
            }

            else if (disVar === 'idle') {
                setdiscordStatus("online");
                // setdiscordStatus("on idle");
                setdiscordStatusClass('discord-online')
                // setdiscordStatusClass('discord-idle')
            }

            else if (disVar === 'dnd') {
                setdiscordStatus("online");
                // setdiscordStatus("on do not disturb");
                setdiscordStatusClass('discord-online')
                // setdiscordStatusClass('discord-dnd')
            }

            else if (disVar === 'offline') {
                setdiscordStatus("offline");
                setdiscordStatusClass('discord-offline')
            }

        })

        // return () => clearInterval(presenceInterval);

    }, [])






    const weatherIcon = `http://openweathermap.org/img/wn/${weatherLogo}@2x.png`;


    return (
        <>

            <section className='Welcome-Container'>

                <p className='abt-txt'>

                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString('Nethan Nagendran.')
                                .pauseFor(2500)
                                .start();
                        }}
                    />

                </p>

                <div className='Weather-Status'>
                    <img className='weather-Icon' src={weatherIcon} />
                    <p className='weather-description'>It's currently <span className='weather-span'>{weatherInfo}</span> with <span className='weather-span-2'>{weatherDescription} here.</span></p>
                    <p className='weather-Fahrenheit'>{Fahrenheit}°F</p>
                </div>


            </section>



            <section className='About-Container'>

                <div className='About-Image'>
                    <img alt='Nethan' className='Nethan-Pic' src={Nethan} />
                </div>

                <div className='About-Description-Holder'>
                    <div className='About-Txt'>
                        {/* <h2 className='Nethan-Name'>My life:</h2> */}

                        <div className='Description-Holder'>
                            <p className='Section'>About me: </p>


                            <ul className='List'>
                                <li className='Txt-Description'>I am a {nethanAge} year old Software Developer living in America.</li>
                                <li className='Txt-Description'>I have over <span className='main-color'>3 years of experience</span> in software development, and I am currently working with <span className='lang-1'>ReactJS</span>, <span className='lang-2'>Python</span>, and <span className='lang-3'>R</span>.</li>
                                <p className={`Txt-Description`}>Right now, I'm <span className={discordStatusClass}>{discordStatus}</span></p>
                            </ul>


                        </div>


                    </div>

                </div>

            </section>


            {/* Second  */}


            <section className='About-Container-2'>

                <div className='About-Description-Holder-2'>
                    <div className='About-Txt-2'>
                        <h2 className="Developer-Title main-color">Being a Developer...</h2>

                        <div className='Description-Holder-2'>
                            <p className='Section-2'>Who am I <span className='main-color'>&</span> How did I get here?</p>


                            <ul className='List'>
                                <li className='Txt-Description'>Hello there! I'm a full-stack developer with a passion for building <span className='main-color'>software</span> and web applications. With a background in JavaScript, Python, and R. I'm currently learning ReactJS and c++.</li>
                                <li className='Txt-Description'>I like to build <span className='main-color'>full-stack applications</span> with scalable and responsive technologies. I'm also a fan of the <span className='main-color'>open-source community</span> and I'm always looking for new ways to improve my skills.</li>

                            </ul>

                        </div>


                    </div>

                </div>

                <div className='About-Image-2'>
                    <img alt='Nethan' className='Developer' src={Nethan} />
                </div>

            </section>




        </>

    )
}
