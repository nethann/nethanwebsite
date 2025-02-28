import { React, useEffect } from 'react'


import PythongitCard from "../computer-science/GitCards/PythongitCard"
import JavaScriptgitCard from '../computer-science/GitCards/JavaScriptgitCard';


import Aos from 'aos';
import "aos/dist/aos.css"

import "../../../CSS/Projects/GithubRep.css"

export default function GithubProjects() {
    useEffect(() => {
        //gobal animation to every single component
        Aos.init({
            duration: 500,
            once: true
        });
    })
    return (
        <>
            <section className='Git-Container' data-aos="fade-right">
                <p className='Git-Title'>Github Repositories:</p>



                <div className='Github-Grid'>
                    <PythongitCard gitName="GTMovieStore" description="Programmed in Django for Objects & Design class @GT with group" Git_Link="https://github.com/nakulshah04/GTMovieStore" />
                    <PythongitCard gitName="googleForm_Requests" description="Automate Google Forms by sending multiple Requests" Git_Link="https://github.com/nethann/googleForm_Requests/tree/main" />
                    <JavaScriptgitCard gitName="Java" description="Discord bot that helps moderate  Discord Servers" Git_Link="https://google.com" />

                    <PythongitCard gitName="MiniBox" description="Graphical User Interface made using Tkinter from Python." Git_Link="https://github.com/nethann/Minibox" />
                </div>
            </section>
        </>
    )
}
