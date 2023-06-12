import React from 'react'

import "../../../CSS/Projects/Technologies.css"

//IMPORTING COMPONENTS
import Techcard from './Techcard'

//ICONS IMPORT 
import c from "../../Home-Components/Technology/Icons/c.png"
import css3 from "../../Home-Components/Technology/Icons/css3.png"
import git from "../../Home-Components/Technology/Icons/git.png"
import github from "../../Home-Components/Technology/Icons/github.png"
import html5 from "../../Home-Components/Technology/Icons/html5.png"
import node from "../../Home-Components/Technology/Icons/node.png"
import python from "../../Home-Components/Technology/Icons/python.png"
import r from "../../Home-Components/Technology/Icons/r.png"
import react from "../../Home-Components/Technology/Icons/react.png"
import swift from "../../Home-Components/Technology/Icons/swift.png"
import vscode from "../../Home-Components/Technology/Icons/vscode.png"
import blender from "../../Home-Components/Technology/Icons/blender.png"
import firebase from "../../Home-Components/Technology/Icons/firebase.png"
import arduino from "../../Home-Components/Technology/Icons/Arduino.png"


import Aos from 'aos';
import "aos/dist/aos.css"


export default function Technologies() {

    Aos.init({
        duration: 500,
        once: true
    });
    return (
        <>
            <section className='Tech-Container'>
                <p className='Tech-Title'>Technologies I use & Support</p>

                <div className='About-Tech'>
                    <p className='About'>I actively embrace and leverage cutting-edge technologies and programming languages, such as Typescript, to remain at the forefront of the industry. Below, you will find a curated list of the technologies I frequently utilize in my work. These technologies not only empower me to develop my own projects but also enable me to provide robust support in my professional endeavors</p>
                </div>


                <div className='Tech-Grid' data-aos="fade-right">
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
                </div>
            </section>


        </>
    )
}
