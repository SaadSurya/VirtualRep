import React, { } from 'react';
import ApiService from '../../../services/api-service';
import { SLIDE_TYPE } from '../../../services/slide-service';

import './SlideThumbnail.css'
import { Card } from 'react-bootstrap';

const SlideThumbnail = ({ slide, selectSlide, isSelected }) => {
    let thumbnailTemplate;
    switch (slide.type) {
        default:
        case SLIDE_TYPE._IMAGE:
            thumbnailTemplate = (
                <img style={{ width: '100%' }} src={ApiService.getBaseUrl() + slide.url} alt="Slide thumbnail" />
            );
            break;
        case SLIDE_TYPE._VIDEO:
            thumbnailTemplate = (
                <img style={{ width: '100%' }} src={ApiService.getBaseUrl() + slide.thumbnail} alt="Slide thumbnail" />
            )
            break;
        case SLIDE_TYPE._SURVEY:
            thumbnailTemplate = (
                <div style={{padding: '1rem'}} className="text-center text-small">
                    <span className="text-muted">{slide.survey.name}</span>
                </div>
            )
    }
    return (
        <div className="slide-thumbnail">
            <div className="card" >
                <div className="card-body" style={{ padding: 0, cursor: 'pointer' }} onClick={event =>  selectSlide ? selectSlide(slide) : null}>
                    {thumbnailTemplate}
                </div>
                {isSelected ? <div className="selected-bar primary-background"></div> : null}
            </div>
        </div>
    )
}

export default SlideThumbnail;