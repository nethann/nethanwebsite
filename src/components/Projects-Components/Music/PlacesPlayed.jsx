import React from 'react'

import guitar from "./Music_Pics/Instruments/guitar.png"

export default function PlacesPlayed() {
    return (
        <div className='places-Played-card-holder'>
            <img className='places-played-image' src={guitar} />


            <div className='places-played-card-description'>
                <p className='margin-fix places-played-title'>United</p>
                <ul>
                    <li>Vocalist & Accoustic Guitarist for band</li>
                    <li>Played communion songs</li>
                </ul>
            </div>

        </div>
    )
}
