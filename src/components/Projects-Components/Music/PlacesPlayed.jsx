import React from 'react'

import guitar from "./Music_Pics/Instruments/guitar.png"

export default function PlacesPlayed() {
    return (

        <>


            <div className='places-Played-card-holder'>
                <img className='places-played-image' src={guitar} />


                <div className='places-played-card-description'>
                    <p className='margin-fix places-played-title'>United Church</p>
                    <ul>
                        <li>Vocalist & Accoustic Guitarist for the morning band</li>
                        <li>Lead communion songs</li>

                    </ul>

                    <div className='music-year-counter-holder'>
                        <p className='music-year-counter margin-fix'>3 years</p>

                    </div>
                </div>


            </div>


            <div className='places-Played-card-holder'>
                <img className='places-played-image' src={guitar} />


                <div className='places-played-card-description'>
                    <p className='margin-fix places-played-title'>Atlanta Church of Christ</p>
                    <ul>
                        <li>Vocalist & Accoustic Guitarist for the morning band</li>
                        <li>Singer and guitarist for childrens ministry</li>

                    </ul>

                    <div className='music-year-counter-holder'>
                        <p className='music-year-counter margin-fix'>3 years</p>

                    </div>
                </div>




            </div>
        </>
    )
}
