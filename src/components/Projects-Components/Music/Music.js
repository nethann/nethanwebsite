import React from 'react'

import "../../../CSS/Projects/Music/Music.css"

import InstrumentCard from './Music_components/InstrumentCard'

import guitar from "../Music/Music_Pics/Instruments/guitar.png"
import bongo from "../Music/Music_Pics/Instruments/bongo.png"
import piano from "../Music/Music_Pics/Instruments/piano.png"
import mic from "../Music/Music_Pics/Instruments/mic.png"

import BarChart from './Music_components/BarChart'


import MusicVids from './Music_components/MusicVids'

import Typewriter from 'typewriter-effect';

import { useEffect } from 'react';
import PlacesPlayed from './PlacesPlayed'

// import MusicPlayedPlaces from "./Music_components/MusicPlayedPlaces"
//animation
import Aos from 'aos';
import "aos/dist/aos.css"

//importing music videos
import Birds_of_feather from "./Music_Vids/Birds_of_a_feather.mp4"
import JamTrack1_bossa_nova from "./Music_Vids/JamTrack1_BossaNova.mp4"

export default function Music() {

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  return (
    <div className='Home-container'>
      <div className='Music'>
        <h2 className='Music-title'>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString('Reach out through the contact page if you would like to book me for a gig.')
                .pauseFor(2500) // Optional pause after typing
                .start();
            }}
            options={{
              delay: 0, //lower the number, the higher
            }}

          />
        </h2>


        <div className='my-instruments-section'>
          <h3 >Instruments I play</h3>
          <div className='instruments-div'>
            <InstrumentCard name="Accoustic & Electric" image={guitar} />
            <InstrumentCard name="Piano" image={piano} />
            <InstrumentCard name="Bongo" image={bongo} />
            <InstrumentCard name="Vocals" image={mic} />
          </div>

        </div>

        <div className='experience-charts-holder'>
          <div className='music-experience-chart' >
            <BarChart />
          </div>

          <div className='where-i-played'>

            <h3 className='margin-fix'>Where I played</h3>

            <div className='music-played-places-grid'>

              {/* <div className='scroll-x'> */}
                <PlacesPlayed />

              {/* </div> */}




            </div>


          </div>
        </div>

        <div className='recorded-instruments' >
          <h3>My Recorded Covers</h3>
          <div className='created-music-cards-holder'>
            <MusicVids Title='Birds of a feather' Instrument='Electric Guitar' Video={Birds_of_feather} />
            <MusicVids Title='Bossa Nova Jam' Instrument='Accoustic Guitar ' Video={JamTrack1_bossa_nova} />

          </div>
        </div>



      </div>
    </div>
  )
}
