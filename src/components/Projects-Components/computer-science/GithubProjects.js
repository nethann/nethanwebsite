import { React, useEffect } from 'react'


import PythongitCard from "../computer-science/GitCards/PythongitCard"
import JavaScriptgitCard from '../computer-science/GitCards/JavaScriptgitCard';


import ContributionCalendar from './ContributionCalendar';


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
                <p className='Git-Title'>Github Repositories 🍁 : </p>

                <ContributionCalendar />




                <div className='Github-Grid'>
                    <PythongitCard gitName="GTWalkThrough" description="GTWalkThrough is a community-powered web app designed to help Georgia Tech students and staff navigate campus more efficiently by avoiding active construction zones." Git_Link="https://github.com/nakulshah04/GTWalkThrough" />
                    <PythongitCard gitName="GTMovieStore" description="GTMovieStore is a web application that allows users to browse, review, and purchase movies with a seamless shopping cart experience." Git_Link="https://github.com/nakulshah04/GTMovieStore" />
                    <PythongitCard gitName="betterCanvas" description="A simple, interactive Tkinter-based GUI that connects to your Georgia Tech Canvas account and displays all upcoming assignments (due today or later) for your current active courses." Git_Link="https://github.com/nethann/betterCanvas" />
                    <PythongitCard gitName="googleForm_Requests" description="Automate Google Forms by sending multiple Requests" Git_Link="https://github.com/nethann/googleForm_Requests/tree/main" />
                    {/* <JavaScriptgitCard gitName="Java" description="Discord bot that helps moderate  Discord Servers" Git_Link="https://google.com" /> */}
                    <PythongitCard gitName="MiniBox" description="Graphical User Interface made using Tkinter from Python." Git_Link="https://github.com/nethann/Minibox" />
                </div>
            </section>
        </>
    )
}
