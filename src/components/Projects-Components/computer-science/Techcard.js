import React from 'react'

import "../../../CSS/Projects/Techcard.css"


export default function Techcard({ name, image }) {
    return (
        <div className='tech-card-modern'>
            <img src={image} alt='Logo' className='tech-icon-modern' />
            <span className='tech-name-modern'>{name}</span>
        </div>
    )
}
