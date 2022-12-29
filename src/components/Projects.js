import React from 'react'

import "../CSS/Global/Global.css"
import Technologies from './Projects-Components/Technologies'
import GithubProjects from './Projects-Components/GithubProjects'

export default function Projects() {
  return (
    <div className='Home-container'>
      <Technologies />
      <GithubProjects />
    </div>
  )
}
