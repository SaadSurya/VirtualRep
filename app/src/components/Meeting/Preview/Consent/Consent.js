import React, { useState } from 'react';
import queryString from 'query-string';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Consent.css';


const Consent = ({ location }) => {

    //const [meetingId, setMeetingId] = useState("");
    const { id } = queryString.parse(location.search);

    return (
        <div className="w-100 py-5">
            <div className="form-group">
                <label className="h3 display">Welcome to      </label>
                <div className="">
                    <img src="/img/brand/Vfield.png" alt="..." style={{ maxWidth: '10rem' }} className="img-fluid mb-4 align-item-right-side" /></div>
                <h1></h1>
                <label>A digital detailing platform for Healthcare community</label>
            </div>
            <div className="form-group">
                <label>By clicking below ‘start activity’ button, I do confirm that I accept to receive remote internet and telephone based presentations by representative from XYZ Pharma company </label>
                <Link to={`/meeting/preview?id=${id}`}><input type="button" value="Start Activity" className="btn btn-primary" /></Link>
            </div>
            <br />
            <br />
            <div className="form-group">
                <label><strong>Technology Partners: </strong></label><br />
                <img src="/img/brand/elastix_logo_mini.png" alt="..." style={{ maxWidth: '8rem' }} className="img-fluid mb-4 align-item-right-side" />
                <img src="/img/brand/ZRlogo.png" alt="..." style={{ maxWidth: '6rem', maxHeight: '2rem' }} className="img-fluid mb-4 align-item-right-side" />
            </div>
        </div>

    );
}

export default Consent;
