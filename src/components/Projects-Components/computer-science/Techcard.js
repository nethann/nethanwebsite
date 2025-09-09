import React from 'react'

import "../../../CSS/Projects/Techcard.css"


export default function Techcard({ name, image }) {
    return (
        <div>
            <div className='ios-card ios-interactive' style={{textAlign: 'center', padding: '1.5rem'}}>
                <img src={image} alt='Logo' className='Tech-Img' style={{width: '48px', height: '48px', marginBottom: '1rem'}} />
                <p className='ios-body' style={{margin: 0, fontWeight: 600}}>{name}</p>
            </div>
        </div>
    )
}
