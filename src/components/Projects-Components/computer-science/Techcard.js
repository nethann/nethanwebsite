import React from 'react'

import "../../../CSS/Projects/Techcard.css"


export default function Techcard({ name, image }) {
    return (
        <div>
            <div className='Tech-Card glass glass-subtle glass-ripple'>
                <img src={image} alt='Logo' className='Tech-Img' />
                <p className='Tech-Des'>{name}</p>

            </div>
        </div>
    )
}
