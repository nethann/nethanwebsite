import React, { useEffect, useState } from 'react'

import "../../../CSS/Global/Global.css"
import "../../../CSS/Projects/Music/Music.css"

import InstrumentCard from './Music_components/InstrumentCard'
import YouTubeChannels from './Music_components/YouTubeChannels'


import BarChart from './Music_components/BarChart'


import MusicVids from './Music_components/MusicVids'

import Typewriter from 'typewriter-effect';

import Aos from 'aos';
import "aos/dist/aos.css"

// Review components
import ReviewModal from '../../Global-Components/ReviewModal'
import ReviewDisplay from '../../Global-Components/ReviewDisplay'
import { getReviewsByCategory } from '../../../services/reviewService'

//importing music videos
import Birds_of_feather from "./Music_Vids/Birds_of_a_feather.mp4"
import JamTrack1_bossa_nova from "./Music_Vids/JamTrack1_BossaNova.mp4"

export default function Music() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Load reviews asynchronously
    const loadReviews = async () => {
      const musicReviews = await getReviewsByCategory('music');
      setReviews(musicReviews);
    };
    loadReviews();

    // Expose function for Dynamic Island to open review modal
    window.openReviewModal = (category) => {
      if (category === 'music') {
        setIsReviewModalOpen(true);
      }
    };

    return () => {
      delete window.openReviewModal;
    };
  }, []);

  Aos.init({
    duration: 500,
    easing: 'ease-in-out',
    once: true
  });

  return (
    <div className='Home-container'>
      <div className='Music' style={{paddingTop: '8rem'}}>
        <div className='music-intro' data-aos="fade-up">
          <h1>Music</h1>
          <p>Creating and performing acoustic style covers</p>
          <p className="location">📍 Atlanta, Georgia, United States</p>
        </div>

        {/* Pricing Packages Section */}
        <section className="pricing-section" data-aos="fade-up" data-aos-delay="100">
          <h2>Booking Rates</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Solo Performance</h3>
                <div className="price">$200</div>
              </div>
              <ul className="pricing-features">
                <li>1-hour set</li>
                <li>Acoustic guitar & vocals</li>
                <li>Personal events</li>
                <li>Travel within 20 miles</li>
              </ul>
              <a href="/contact?service=music" className="pricing-button">Book Now</a>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Worship Service</h3>
                <div className="price">$300</div>
              </div>
              <ul className="pricing-features">
                <li>2-hour service</li>
                <li>Lead guitar & vocals</li>
                <li>Rehearsal included</li>
                <li>Multi-instrument capability</li>
                <li>Communion songs</li>
              </ul>
              <a href="/contact?service=music" className="pricing-button">Book Now</a>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Full Event</h3>
                <div className="price">$500</div>
              </div>
              <ul className="pricing-features">
                <li>4+ hours coverage</li>
                <li>Multiple sets</li>
                <li>Corporate/private events</li>
                <li>Sound system setup</li>
                <li>Custom song requests</li>
              </ul>
              <a href="/contact?service=music" className="pricing-button">Book Now</a>
            </div>
          </div>
        </section>

        {/* Instruments & Equipment Section */}
        <section className="equipment-section" data-aos="fade-up" data-aos-delay="200">
          <h2>My Instruments & Equipment</h2>
          <div className="equipment-grid">
            <div className="equipment-category">
              <h3>🎸 Guitars</h3>
              <ul>
                <li>Taylor 224-CE K DLX</li>
                <li>Fender Player Series Stratocaster</li>
                <li>Martin LX1</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🎹 Keyboards & Vocals</h3>
              <ul>
                <li>Alesis V49</li>
                <li>Shure SM58</li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🔊 Guitar pedals</h3>
              <ul>
                <li>Boss RC-600 Loop Station</li>
                <li>VOX V847 WAH</li>
                <li>Boss RC-1 Loop Station</li>
                <li>SONICAKE Reverb & Preamp</li>
                <li>JOYO American Sound Amp Simulator</li>
                <li></li>
              </ul>
            </div>

            <div className="equipment-category">
              <h3>🎵 Specialties</h3>
              <ul>
                <li>Lead & Rhythm Guitar</li>
                <li>Worship Leading</li>
                <li>Acoustic Performances</li>
                <li>Children's Ministry Music</li>
                <li>Guitar Looping & Solo</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="musical-journey-section" data-aos="fade-up" data-aos-delay="300">
          <h3>My Musical Journey</h3>
          <div className="horizontal-timeline">
            <div className="timeline-track">
              <div className="timeline-item-horizontal" data-year="2017" data-aos="fade-up" data-aos-delay="200">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-year">2017 - 2020</div>
                  <div className="timeline-venue">United Church Atlanta</div>
                  <div className="timeline-role">Guitarist & Worship Leader</div>
                  <div className="timeline-description">
                    Served as the guitarist for the morning band, contributing to the musical worship experience. I also had the privilege of leading communion songs.
                  </div>
                </div>
              </div>

              <div className="timeline-item-horizontal" data-year="2020" data-aos="fade-up" data-aos-delay="300">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-year">2020 - Present</div>
                  <div className="timeline-venue">Atlanta Church of Christ Gwinnett</div>
                  <div className="timeline-role">Lead Guitarist & Children's Ministry</div>
                  <div className="timeline-description">
                    Served as the guitarist for the morning band and took the lead in several communion songs. Additionally, I had the opportunity to sing and play for the children's ministry.
                  </div>
                </div>
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

        {/* YouTube Channels Section */}
        <div data-aos="fade-up" data-aos-delay="400">
          <YouTubeChannels />
        </div>

        {/* Reviews Section */}
        <ReviewDisplay
          reviews={reviews}
          category="music"
          onAddReviewClick={() => setIsReviewModalOpen(true)}
        />

        {/* Review Modal */}
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          category="music"
        />

      </div>
    </div>
  )
}
