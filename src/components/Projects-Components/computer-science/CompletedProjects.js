import React from 'react';


import CompletedProjectCard from './CompletedProjects/CompletedProjectCard';
import CompletedProjectswithVid from './CompletedProjects/CompletedProjectswithVid';

// Project Images
import LightTriangle_1 from "./CompletedProjects/CompSciCompleted_Images/LightTriangle_1.jpg"
import LightTriangle_2 from "./CompletedProjects/CompSciCompleted_Images/LightTriangle_2.jpg"
import Arduino_MotorCircuit from "./CompletedProjects/CompSciCompleted_Images/Arduino_MotorCircuit.png"
import DistanceRobot_Circuit from "./CompletedProjects/CompSciCompleted_Images/DistanceRobot_Circuit.png"
import Gears_Pic from "./CompletedProjects/CompSciCompleted_Images/Gears_Pic.png"
import CardBoardMotor_Setup from "./CompletedProjects/CompSciCompleted_Images/CardBoardMotor_Setup.png"
import GoogleAIY_Front from "./CompletedProjects/CompSciCompleted_Images/GoogleAIY_Front.JPG"
import GoogleAIY_Back from "./CompletedProjects/CompSciCompleted_Images/GoogleAIY_Back.JPG"

import "../../../CSS/Projects/CompletedProjects.css"


// Project vids
import Arduino_Motor from "./CompletedProjects/videos/Arduino_Motor.mp4"
import Gears_Spinning from "./CompletedProjects/videos/Gears_Spinning.mp4"
import Distance_Robot from "./CompletedProjects/videos/Distance_Robot.mp4"
import CardboardMotor from "./CompletedProjects/videos/CardboardMotor.mp4"

export default function completedProjects() {
  return (
    <>
    <section className='Git-Container' data-aos="fade-right">
        <p className='Git-Title'>Engineering Journey 🍏 : </p>



        <div className='CompSciProjects_Grid'>
            <CompletedProjectCard img1={LightTriangle_1} img2={LightTriangle_2} title="Pyramid Lights" description="Lazer cut a pyramid shape and programmed 3 light patterns to function" date="2020" /> 
            <CompletedProjectswithVid vid={Gears_Spinning} img1={Gears_Pic} title="Gear Kinetic Sculpture" description="Prototyped gears and acrylic using Inkscape & made gears which spins opposite directions and normal direction. " date="2021" /> 
            <CompletedProjectswithVid vid={Arduino_Motor} img1={Arduino_MotorCircuit} title="Arduino Motor Prototyping" description="Video of motor spinning for the distance sensing robot and the circuit diagram. I programmed two motors to spin with speed input. This was progress on starting the main distance sensing robot. " date="2021" /> 
            <CompletedProjectswithVid vid={CardboardMotor} img1={CardBoardMotor_Setup} title="Arduino Motor Prototyping with cardboard" description="Programmed the ultrasonic sensor to read distance and connected batteries to power the arduino using cardboard as the body found at home." date="2021" /> 
            <CompletedProjectswithVid vid={Distance_Robot} img1={DistanceRobot_Circuit} title="Distance Sensing Robot" description="Prototyped and programmed a distance sensing robot which can be programmed for directions. While moving, it will continue to read distance to see if there are any objecting blocking. If so, it will turn either left or right before the robot is hit to the object. " date="2021" /> 
            <CompletedProjectCard img1={GoogleAIY_Front} img2={GoogleAIY_Back} title="Google AIY" description="Built and programmed the Google AIY kit to detect face emotion where the button will change color depending on the face the user makes." date="2022" /> 

        </div>

    </section>
</>
  )
}
