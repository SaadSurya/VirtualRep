import React from 'react';
import { Link } from 'react-router-dom';
import './Meetings.css';
import SessionService from '../../services/session-service';

const Meetings = () => {
    return (
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Meeting 1</td>
                          <td>Dr. ABC</td>
                          <td><Link to={`/meeting/player?id=1`}>Start Meeting</Link></td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Meeting 2</td>
                          <td>Dr. MNO</td>
                          <td><Link to={`/meeting/player?id=2`}>Start Meeting</Link></td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Meeting 3</td>
                          <td>Dr. XYZ</td>
                          <td><Link to={`/meeting/player?id=3`}>Start Meeting</Link></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        </section>

        // <div>
        //     <h1>Logged In User: {SessionService.getSession().username}</h1>
        //     <h1>All Meetings</h1>
        //     <div>
        //         <ul>
        //             <li><Link to={`/meeting/player?id=1`}>Meeting 1</Link></li>
        //             <li><Link to={`/meeting/player?id=2`}>Meeting 2</Link></li>
        //         </ul>
        //     </div>
        // </div>

    );
}

export default Meetings;