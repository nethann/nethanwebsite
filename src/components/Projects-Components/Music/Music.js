import React, { useEffect } from 'react'

import "../../../CSS/Global/Global.css"
import "../../../CSS/Projects/Music/Music.css"

import InstrumentCard from './Music_components/InstrumentCard'

import guitar from "../Music/Music_Pics/Instruments/guitar.png"
import bongo from "../Music/Music_Pics/Instruments/bongo.png"
import piano from "../Music/Music_Pics/Instruments/piano.png"
import mic from "../Music/Music_Pics/Instruments/mic.png"

import BarChart from './Music_components/BarChart'


import MusicVids from './Music_components/MusicVids'

import Typewriter from 'typewriter-effect';


// import MusicPlayedPlaces from "./Music_components/MusicPlayedPlaces"
//animation
import "aos/dist/aos.css"

//importing music videos
import Birds_of_feather from "./Music_Vids/Birds_of_a_feather.mp4"
import JamTrack1_bossa_nova from "./Music_Vids/JamTrack1_BossaNova.mp4"

export default function Music() {

  const rawShortLinks = [
    'https://youtube.com/shorts/Wc6ca8W3Pes',
    'https://youtube.com/shorts/abc123xyz',
    // add more shorts here
  ];

  const extractVideoId = (url) => {
    const match = url.match(/shorts\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='Home-container'>
      <div className='Music'>
        <h2 className='Music-title'>
          <span className=" typewriter-text">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('Where passion meets performance')
                  .start();
              }}
              options={{
                delay: 60,
              }}
            />
          </span>

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


        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-content">
              <h4>2017 - 2020</h4>
              <div class="timeline-details">
                <span class="timeline-title">United Church Atlanta</span>
                <p class="timeline-description">Served as the guitarist for the morning band, contributing to the musical worship experience. I also had the privilege of leading communion songs.</p>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-content">
              <h4>2020 - Present</h4>
              <div class="timeline-details">
                <span class="timeline-title">Atlanta Church of Christ Gwinetee</span>
                <p class="timeline-description">Served as the guitarist for the morning band and took the lead in several communion songs. Additionally, I had the opportunity to sing and play for the children's ministry.</p>
              </div>
            </div>


          </div>

        </div>




        {/* <div className='experience-charts-holder'>
          <div className='music-experience-chart' >
            <BarChart />
          </div>

          <div className='where-i-played'>

            <h3 className='margin-fix'>Where I played</h3>

            <div className='music-played-places-grid'>

              <PlacesPlayed />





            </div>


          </div>
        </div> */}

        {/* <div className='recorded-instruments' >
          <h3>My Recorded Covers</h3>
          <div className='created-music-cards-holder'>
            <MusicVids Title='Birds of a feather' Instrument='Electric Guitar' Video={Birds_of_feather} />
            <MusicVids Title='Bossa Nova Jam' Instrument='Accoustic Guitar ' Video={JamTrack1_bossa_nova} />

          </div>
        </div> */}

        <div className="created-music-cards-holder">
          {rawShortLinks.map((link, i) => {
            const videoId = extractVideoId(link);
            return videoId ? (
              <div key={i} className="short-wrapper">
                <iframe
                  width="320"
                  height="570"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`YouTube Short ${i}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '15px' }}
                />
              </div>
            ) : null;
          })}
        </div>



      </div>
    </div>
  )
}
