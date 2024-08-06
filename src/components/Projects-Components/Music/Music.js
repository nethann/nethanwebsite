import React from 'react'

import "../../../CSS/Projects/Music/Music.css"

import InstrumentCard from './Music_components/InstrumentCard'

import guitar from "../Music/Music_Pics/Instruments/guitar.png"
import bongo from "../Music/Music_Pics/Instruments/bongo.png"
import piano from "../Music/Music_Pics/Instruments/piano.png"
import mic from "../Music/Music_Pics/Instruments/mic.png"

import BarChart from './Music_components/BarChart'

export default function Music() {
  return (
    <div className='Home-container'>
      <div className='Music'>
        <h1 className='Music-title'>My other half</h1>

        <div className='my-instruments-section'>
          <h3>Instruments I play</h3>
          <div className='instruments-div'>
            <InstrumentCard name="Accoustic & Electric" image={guitar} /> 
            <InstrumentCard name="Piano" image={piano} /> 
            <InstrumentCard name="Bongo" image={bongo} /> 
            <InstrumentCard name="Singing" image={mic} /> 
          </div>

          <BarChart />

        </div>


      </div>
    </div>
  )
}
