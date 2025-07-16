import React from 'react';

import Carousel from 'react-bootstrap/Carousel';


export default function CompletedProjectswithVid({ vid, img1, title, description }) {
    return (
        <div className='CompSciProjectCard'>
            <Carousel interval={null}>
                <Carousel.Item>
                    <video className='CompletedProject_Vid' playsInline controls>
                        <source src={vid} type="video/mp4 " ></source>
                    </video>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="CompSciProjectCard_Img"
                        src={img1}
                        alt="Second slide"
                    />
                </Carousel.Item>

            </Carousel>

            <div className='CompSciProject_Description_Holder'>
                <p className='CompSciCompletedProject_Title'>{title}</p>
                <p className='CompSciCompletedProject_Description'>{description}</p>
            </div>
        </div>
    )
}
