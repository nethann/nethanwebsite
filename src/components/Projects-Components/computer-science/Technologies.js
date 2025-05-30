import React from 'react'

import "../../../CSS/Projects/Technologies.css"

//IMPORTING COMPONENTS
import Techcard from './Techcard'

//ICONS IMPORT 

import c from "../Icons/c.png"
import css3 from "../Icons/css3.png"
import git from "../Icons/git.png"
import github from "../Icons/github.png"
import html5 from "../Icons/html5.png"
import node from "../Icons/node.png"
import python from "../Icons/python.png"
import r from "../Icons/react.png"
import swift from "../Icons/swift.png"
import vscode from "../Icons/vscode.png"
import blender from "../Icons/blender.png"
import firebase from "../Icons/firebase.png"
import arduino from "../Icons/Arduino.png"
import react from "../Icons/react.png"
import Java from "../Icons/Java.png"



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
                <p className='Tech-Title'>Technologies I use 👀 :</p>

                <div className='About-Tech'>
                    <p className='About'>I work with the latest technologies and programming languages to stay up-to-date in the field. These tools help me develop my own projects and tasks. Here’s a list of the key technologies I use and support regularly.
                    </p>
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
                    <Techcard name="Java" image={Java} />
                </div>
            </section>


        </>
    )
}
