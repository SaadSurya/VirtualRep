import React from 'react';
import { Link } from 'react-router-dom';
import './Meetings.css';
import SessionService from '../../services/session-service';

const Meetings = () => {
  return (
    <div>
      <div class="breadcrumb-holder">
        <div class="container-fluid">
          <ul class="breadcrumb">
            <li class="breadcrumb-item"><a href="/meetings">Home</a></li>
            <li class="breadcrumb-item active">Meetings</li>
          </ul>
        </div>
      </div>
      <section>
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4>Meetings</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Meeting Name</th>
                      <th>With Doctor</th>
                      <th>Actions</th>
                      <th>Logs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
                    </tr>
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

export default Meetings;