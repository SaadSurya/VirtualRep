import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import './Logs.css';
import SlideThumbnail from '../SlideThumbnail/SlideThumbnail';
import MeetingService from "../../../services/meeting-service";
const Logs = ({ location }) => {

  const [meetingId, setMeetingId] = useState(0);
  const [meeting, setMeeting] = useState(null);
  
  // const meetingRef = useRef(null);
  // meetingRef.current = meeting;

  useEffect(() => {
    const { id } = queryString.parse(location.search);
    setMeetingId(id);
    MeetingService.getMeetingById(id)
      .then(data => {
        setMeeting(data);
      }).catch(ex => {
        alert('Failed to load meeting logs please try again!');
      }) 


  }, []);

  return (
    <div>
      <div className="breadcrumb-holder">
        <div className="container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="/meetings">Home</a></li>
            <li className="breadcrumb-item"><a href="/meetings">Meetings</a></li>
            <li className="breadcrumb-item active">Meeting Log</li>
          </ul>
        </div>
      </div>
      <section>
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Meeting Log</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Slide</th>
                      <th>Time Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      meeting && meeting.slides
                        ? meeting.slides.map(slide =>
                          <tr key={slide.id}>
                            <td>{slide.id}</td>
                            <td>
                              <SlideThumbnail key={slide.id} slide={slide} isSelected={false}></SlideThumbnail>
                            </td>
                            <td>
                              {(['YES', '10 Minutes', '8 Minutes', '7 Minutes', '5 Minutes', 'YES'])[slide.id-1]}
                            </td>
                          </tr>
                        )
                        : <tr><td colSpan="3" className="text-center">loading...</td></tr>
                    }
                    {/* <tr>
                      <th scope="row">1</th>
                      <td>Meeting 1</td>
                      <td>Dr. ABC</td>
                      <td><Link to={`/meeting/player?id=1`}>Start Meeting</Link></td>
                      <td><Link to={`/meeting/logs?id=1`}>View Logs</Link></td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Meeting 2</td>
                      <td>Dr. MNO</td>
                      <td><Link to={`/meeting/player?id=2`}>Start Meeting</Link></td>
                      <td><Link to={`/meeting/logs?id=2`}>View Logs</Link></td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Meeting 3</td>
                      <td>Dr. XYZ</td>
                      <td><Link to={`/meeting/player?id=3`}>Start Meeting</Link></td>
                      <td><Link to={`/meeting/logs?id=3`}>View Logs</Link></td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Logs;