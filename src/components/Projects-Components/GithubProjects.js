import React from 'react'




import PythongitCard from './GitCards/PythongitCard'
import JavaScriptgitCard from './GitCards/JavaScriptgitCard'




import "../../CSS/Projects/GithubRep.css"
import github from "../Home-Components/Technology/Icons/github.png"


export default function GithubProjects() {
    return (
        <>
            <section className='Git-Container'>
                <p className='Git-Title'>Github Repositories:</p>



                <div className='Github-Grid'>
                    <PythongitCard gitName="googleForm_Requests" description="Automate Google Forms by sending multiple Requests" Git_Link="https://github.com/nethann/googleForm_Requests/tree/main"  />
                    <JavaScriptgitCard gitName="Java" description="Discord bot that helps moderate  Discord Servers" Git_Link="https://google.com" />
                </div>
            </section>
        </>
    )
}
