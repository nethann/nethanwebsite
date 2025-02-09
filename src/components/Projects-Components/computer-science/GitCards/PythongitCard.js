import React from 'react'

import github from "../../../Home-Components/Technology/Icons/github.png"
import "../../../../CSS/Projects/GitCard.css"


import Tilt from 'react-parallax-tilt';

export default function GithubCards({ gitName, description, Git_Link }) {
  return (
    <Tilt  glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffffff" glarePosition="bottom" glareBorderRadius='8px'  tiltMaxAngleX={2} tiltMaxAngleY={2}>
      <div>
        <a href={Git_Link} target="_blank" rel='noreferrer' className='Git-Card'>

          <div className='Git-Card-FirstSection'>
            <img src={github} className='Git-Img' alt='Logo' />
            <p className='Git-Name'>{gitName}</p>
          </div>

          <div className='Git-Card-SecondSection'>

            <ul className='Ul'>
              <li className='git-Description'>{description}</li>
            </ul>

            <div className='Lang-Container'>
              <p className='Special-Py Languages'>Python</p>
            </div>

          </div>

        </a>
      </div>
    </Tilt>
  )
}
