import React, { useState } from 'react';

import './ActionBar.css';
import { Button } from 'react-bootstrap';
import PVReportingModal from './PVReportingModal/PVReportingModal';
import DownloadsModal from './DownloadsModal/DownloadsModal';
import MedicalSurveyModal from './MedicalSurveyModal/MedicalSurveyModal';
import RequestFormModal from './RequestFormModal/RequestFormModal';
import RescheduleMeetingModal from './RescheduleMeetingModal/RescheduleMeetingModal';

const ActionBar = () => {

    const [showPvReporting, setShowPvReporting] = useState(false);
    const [showDownloads, setShowDownloads] = useState(false);
    const [showMedicalSurvey, setShowMedicalSurvey] = useState(false);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [showRescheduleMeeting, setShowRescheduleMeeting] = useState(false);

    return (
        <div className="text-center">
            <Button variant="outline-primary" onClick={() => setShowPvReporting(true)}>PV Reporting</Button>
            <PVReportingModal show={showPvReporting} setShow={setShowPvReporting} />
            <Button variant="outline-primary" onClick={() => setShowDownloads(true)}>Downloads</Button>
            <DownloadsModal show={showDownloads} setShow={setShowDownloads} />
            <Button variant="outline-primary" onClick={() => setShowMedicalSurvey(true)}>Medical Survey</Button>
            <MedicalSurveyModal show={showMedicalSurvey} setShow={setShowMedicalSurvey} />
            <Button variant="outline-primary" onClick={() => setShowRequestForm(true)}>Request Form</Button>
            <RequestFormModal show={showRequestForm} setShow={setShowRequestForm} />
            <Button variant="outline-primary" onClick={() => setShowRescheduleMeeting(true)}>Reschedule Meeting</Button>
            <RescheduleMeetingModal show={showRescheduleMeeting} setShow={setShowRescheduleMeeting} />
        </div>
    );
}

export default ActionBar;