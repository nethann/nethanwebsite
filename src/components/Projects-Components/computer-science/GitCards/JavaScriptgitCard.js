import React from 'react'

import "../../../../CSS/Projects/GitCard.css"
import github from "../../../Home-Components/Technology/Icons/github.png"

import Tilt from 'react-parallax-tilt';

export default function JavaScriptgitCard({ gitName, description, Git_Link }) {
  return (
    

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
              <p className='Special-JS Languages'>JavaScript</p>
            </div>

          </div>

        </a>
      </div>

  )
}
