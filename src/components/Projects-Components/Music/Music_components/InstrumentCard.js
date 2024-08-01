import React from 'react'

import '../../../../CSS/Projects/Music/InstrumentCard.css'

export default function InstrumentCard({ name, image }) {
    return (
        <div>
            <div className='InstrumentCard'>
                <img src={image} alt='Logo' className='Instrument-Img' />
                <p className='Instrument-Des'>{name}</p>

            </div>
        </div>
    )
}
