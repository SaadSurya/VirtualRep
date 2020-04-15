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
            <div className="form-group row">
                <label className="h3 display">Welcome to      </label>
                <div className="text-center">
                    <img src="/img/brand/Vfield.png" alt="..." style={{ maxWidth: '8rem' }} className="img-fluid mb-4 align-item-right-side" /></div>
                <h1></h1>
                <label>A digital detailing platform for Healthcare community</label>
            </div>
            <div className="form-group row">
                <label>By clicking below ‘start activity’ button, I do confirm that I accept to receive remote internet and telephone based presentations by representative from XYZ Pharma company </label>
                <Link to={`/meeting/preview?id=${id}`}><input type="button" value="Start Activity" className="btn btn-primary" /></Link>
            </div>
        </div>

    );
}

export default Consent;

// <form class="form-horizontal">
// <div class="form-group row">
//     <div class="col-sm-6">
//         <label class="h3 display">Welcome to      </label>
//         <div class="text-center">
//             <img src="/img/brand/Vfield.png" alt="..." style={{maxWidth: '8rem'}} class="img-fluid mb-4 align-item-right-side" /></div>
//         <h1></h1>
//         <label>A digital detailing platform for Healthcare community</label>
//     </div>
//     <div class="col-sm-6">
//         <div class="text-center">
//             <img src="/img/brand/elastix_logo_mini.png" alt="..." style={{maxWidth: '8rem'}} align="right" class="img-fluid mb-4 align-item-right-side" />
//         </div>
//     </div>

// </div>
// <div class="form-group row">
//     <div class="col-sm-3">
//         <label>By clicking below ‘start activity’ button, I do confirm that I accept to receive remote internet and telephone based presentations by representative from XYZ Pharma company </label>
//         <input type="button" value="Start Activity" class="btn btn-primary" />

//     </div>
//     <div class="col-sm-9">
//         <div class="text-center">
//             <img src="img/brand/Meeting.png" alt="..." style={{maxWidth: '24rem'}} align="right" class="img-fluid mb-4 align-item-right-side" /></div>
//     </div>
// </div>
// </form>