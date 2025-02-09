import React from 'react'

import Carousel from 'react-bootstrap/Carousel';

import "../../../../CSS/Projects/Model/OneImageModel.css"


import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


export default function TwoImageModel({ Img1, Img2, Title, Description, RenderType, Year }) {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Render Type
    </Tooltip>
  );

  const yearTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Render Year
    </Tooltip>
  );
  return (
    <div className='OneImageModelCard'>

      <Carousel interval={null}>
        <Carousel.Item>
          <img
            className="OneImageModel_Img"
            src={Img1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="OneImageModel_Img"
            src={Img2}
            alt="Second slide"
          />
        </Carousel.Item>

      </Carousel>


      <section className='models-center-items'>
        <div className='OneImageModel-Title'>
          <p>{Title}</p>
          <ul>
            <li>{Description}</li>
          </ul>
        </div>

        <div className='OneImageModel-Year'>
          <div className='Data-type-holder'>


            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <p className='render-model'>{RenderType}</p>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={yearTooltip}
            >

              <p className='year-model'>{Year}</p>

            </OverlayTrigger>

          </div>
        </div>
      </section>

      

    </div>
  )
}
