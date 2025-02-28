import React from 'react'

import Carousel from 'react-bootstrap/Carousel';
import "../../../../CSS/Projects/CompletedProjects.css"

import Tilt from 'react-parallax-tilt';

export default function CompletedProjectCard({ img1, img2, title, description }) {
    return (

            <div className='CompSciProjectCard'>
                <Carousel interval={null}>
                    <Carousel.Item>
                        <img
                            className="CompSciProjectCard_Img"
                            src={img1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="CompSciProjectCard_Img"
                            src={img2}
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
