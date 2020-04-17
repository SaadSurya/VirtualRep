import React, { } from 'react';
import { Route } from 'react-router-dom';

import './LoginLayout.css'

const LoginLayout = ({ children }) => (
    <div className="container-fluid px-3">
        <div className="row min-vh-100">
            <div className="col-md-5 col-lg-6 col-xl-4 px-lg-5 d-flex align-items-center">
                {children}
            </div>
            <div className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
                <div style={{ backgroundImage: 'url(/img/photos/conference-bridge.png)' }} className="bg-cover h-100 mr-n3">
                    <img src="/img/brand/elastix_logo_mini.png" alt="..." style={{ maxWidth: '10rem', marginTop: '2rem', marginRight: '6rem' }} className="float-right img-fluid mb-4" />

                </div>
            </div>
        </div>
    </div>
);

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LoginLayout>
                <Component {...matchProps} />
            </LoginLayout>
        )} />
    )
};

export default LoginLayoutRoute;  