import React from 'react';

import "../../../CSS/Projects/Model/ModelingMain.css"

import OneImageModel from './utils/OneImageModel';
import TwoImageModel from "./utils/TwoImageModel"
import OneVidModel from './utils/OneVidModel';

// One image pictures

import Plush1 from "./Images/Plush1.png";
import FunkoPop1 from "./Images/FunkoPop1.png"
import FirstRoom from "./Images/FirstRoom.png";
import Motor from "./Images/Motor.png"
import MushRoomCity from "./Images/MushRoomCity.png"
import Room1004 from "./Images/Room1004.png"
import Room1005 from "./Images/Room1005.png"
import Windmill from "./Images/Windmill.png"
import Boat from "./Images/Boat.png"
import Mainobby from "./Images/Mainobby.png"

// Two image pictures 
import Airballoon1 from "./Images/HotAirBalloons/HotAirbaloonWithClouds.png"
import Airballoon2 from "./Images/HotAirBalloons/HotAirBaloonwithoutClouds.png"

import AmongFinisherd from "./Images/AmongUs/AmongFinished.jpg";
import AmongUnfinished from "./Images/AmongUs/AmongUnfinished.png";

import ObbyRender from "./Images/ObbyLobby/ObbyRender.png"
import ObbyRender2 from "./Images/ObbyLobby/ObbyRender2.png"

import BeachRender from "./Images/Beach/BeachRender.png"
import BeachRender2 from "./Images/Beach/BeachRender2.png"

// Videos
import Arduino_Motor from "../computer-science/CompletedProjects/videos/Arduino_Motor.mp4"
import JelloAnimation from "./Videos/JelloAnimation.mp4"
import WaterMolecule from "./Videos/WaterMolecule.mp4"

import VintageComputer1 from "./Images/VintageComputer/VintageComputer1.png"
import VintageComputer2 from "./Images/VintageComputer/VintageComputer2.png"

import Bulkville1 from "./Images/Bulkville/Bulkville1.png"
import Bulkville2 from "./Images/Bulkville/Bulkville2.png"

//animation
import Aos from 'aos';
import "aos/dist/aos.css"

export default function Modeling() {

    Aos.init({
        duration: 500,
        once: true
    });
    return (
        <div className='Home-container'>
            <section className='Models-section'>

                <div className='Rendered-Models' data-aos="fade-right">
                    <div className='Models-CardTitle'>
                        <p>Rendered <span className='first-models-container'>Models</span></p>
                    </div>

                    <div className='models-pic-grid'>
                        <OneImageModel Img={FunkoPop1} Title="Funko Pop" Description="My first model of Funko Pops" RenderType="Blender" Year="2020" />
                        <OneImageModel Img={FirstRoom} Title="Room 1001" Description="One of my first renders where I learned how to use materials on surfaces & use lighting for scene renders" RenderType="Blender" Year="2020" />
                        <OneImageModel Img={Motor} Title="Servo Motor" Description="Modeled the motor for my distance sensing robot which spins the tires" RenderType="Blender" Year="2020" />

                        <OneImageModel Img={Plush1} Title="Hill Billy" Description="Modeled Hill Billy" RenderType="Blender" Year="2020" />
                        <OneImageModel Img={MushRoomCity} Title="Mushroom Forest" Description="Modeled a mushroom forest " RenderType="Blender" Year="2021" />
                        <OneImageModel Img={Room1004} Title="Room 1002" Description="Modeled a luxury cabin with sunset shaders" RenderType="Blender" Year="2021" />

                        <OneImageModel Img={Room1005} Title="Room 1003" Description="Modeled a cozy evening living room with a cup of tea on the table" RenderType="Blender" Year="2021" />

                        <OneImageModel Img={Mainobby} Title="Spawn Lobby" Description="Modeled meshes from blender and imported to Roblox studio to create as a beach type theme for the obby" RenderType="Roblox Studio" Year="2022" />
                        <TwoImageModel Img1={Airballoon1} Img2={Airballoon2} Title="Hot Air Balloons" Description="Models air baloons with clouds for an art project" RenderType="Blender" Year="2021" />


                        <TwoImageModel Img1={AmongFinisherd} Img2={AmongUnfinished} Title="Among Us" Description="Ok, so who's the imposter? Modeled some peeps from Among Us " RenderType="Blender" Year="2022" />
                        <TwoImageModel Img1={ObbyRender} Img2={ObbyRender2} Title="Low-Poly Obby" Description="Finished buildnig the final spawn of the obby where players spawn" RenderType="Roblox Studio" Year="2022" />
                        <TwoImageModel Img1={Windmill} Img2={Boat} Title="Beach Models" Description="Modeled a low-poly windmill and a low-poly boat for commission for a roblox project" RenderType="Blender" Year="2022" />

                        <TwoImageModel Img1={BeachRender} Img2={BeachRender2} Title="Low-Poly Beach" Description="Added the windmill, boat and palm tree models from blender and made a scene from roblox studio" RenderType="Roblox Studio" Year="2022" />
                        <TwoImageModel Img1={VintageComputer1} Img2={VintageComputer2} Title="Vintage Computer" Description="Vintager computer build" RenderType="Blender" Year="2023" />
                        <TwoImageModel Img1={Bulkville1} Img2={Bulkville2} Title="Bulkville (Roblox game)" Description="Built a roblox game using my own created models/meshes https://www.roblox.com/games/8764010653/Bulkville" RenderType="Roblox Studio" Year="2023" />

                    </div>
                </div>


                <div className='Rendered-Models' data-aos="fade-right">
                    <div className='Models-CardTitle'>
                        <p>Rendered <span className='second-models-container'>Videos</span></p>
                    </div>

                    <div className='Models-grid'>
                        <OneVidModel Vid={JelloAnimation} Title="Jello Animation" Description="First recorded animation using blender with physics and keyframes" RenderType="Blender" Year="2020" />
                        <OneVidModel Vid={WaterMolecule} Title="Sunset Animation" Description="Sunset animation with boat moving along the water " RenderType="Blender" Year="2021" />
                    </div>
                </div>




            </section>
        </div>
    )
}
