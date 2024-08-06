import React from 'react'

export default function MusicVids({ Title, Video,Instrument }) {
    return (
        <div className='music-card'>
            <video className='music-vid-model' playsInline controls="true" >
                <source src={Video} type="video/mp4 " ></source>
            </video>

            <div className='about-music-card-info'>
                <p className='margin-fix'>{Title}</p>
                <p className='margin-fix Instrument-played'>{Instrument}</p>
            </div>
        </div>
    )
}
