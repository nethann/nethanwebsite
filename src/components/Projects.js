import React from 'react'

import "../CSS/Global/Global.css"


import Technologies from './Projects-Components/computer-science/Technologies'
import GithubProjects from './Projects-Components/computer-science/GithubProjects'
import CompletedProjects from './Projects-Components/computer-science/CompletedProjects'

export default function Projects() {
  return (
    <div className='Home-container ios-background'>
      <div className="ios-container">
        <Technologies />
        <GithubProjects />
        <CompletedProjects />
      </div>
    </div>
  )
}
