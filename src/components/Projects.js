import React from 'react'

import "../CSS/Global/Global.css"


import Technologies from './Projects-Components/computer-science/Technologies'
import GithubProjects from './Projects-Components/computer-science/GithubProjects'

export default function Projects() {
  return (
    <div className='Home-container'>
      <Technologies />
      <GithubProjects />
    </div>
  )
}
