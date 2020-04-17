import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SessionService from '../../services/session-service';


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { push } = useHistory();

    return (
        <div className="w-100 py-5">
            <div className="text-center">
                <img src="img/brand/Vfield.png" alt="..." style={{ maxWidth: '10rem' }} className="img-fluid mb-4" />
                <h1 className="display-4 mb-3">Sign in</h1>
            </div>
            <form className="form-validate">
                <div className="form-group">
                    <label>Username</label>
                    <input name="username" type="text" onChange={event => setUsername(event.target.value)} value={username} placeholder="" autoComplete="off" required data-msg="Please enter your username" className="form-control" />
                </div>
                <div className="form-group mb-4">
                    <div className="row">
                        <div className="col">
                            <label>Password</label>
                        </div>
                        <div className="col-auto"><a  className="form-text small text-muted">Forgot password?</a></div>
                    </div>
                    <input name="password" placeholder="Password" type="password" onChange={event => setPassword(event.target.value)} value={password} required data-msg="Please enter your password" className="form-control" />
                </div>
                <button className="btn btn-lg btn-block btn-primary mb-3" onClick={event => { if (!username) { event.preventDefault() } else { SessionService.createSession(username); push('/meetings') } }} >Sign in</button>
                <p className="text-center"><small className="text-muted text-center">Don't have an account yet? <a href="register-2.html">Register</a>.</small></p>
            </form>
            <br />
            <br />
            {/* <div className="form-group">
                <label>Technology Partners: </label><br />
                <img src="/img/brand/elastix_logo_mini.png" alt="..." style={{ maxWidth: '8rem' }} className="img-fluid mb-4 align-item-right-side" />
                <img src="/img/brand/ZRlogo.png" alt="..." style={{ maxWidth: '6rem' }} className="img-fluid mb-4 align-item-right-side" />
            </div> */}
        </div>
    )
}

export default Login;
