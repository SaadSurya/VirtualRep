import React, { } from 'react';
import { Route } from 'react-router-dom';

import './PreviewLayout.css'

const PreviewLayout = ({ children }) => (
    <div>
        <div className="page" style={{ width: '100%' }}>
            <header className="header">
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-holder d-flex align-items-center justify-content-between">
                            <div className="navbar-header">
                                <a href={window.location} className="navbar-brand">
                                    {/* <div className=" brand-text d-md-inline-block"><span>Tranz-Life </span><strong className="text-primary"> Virtual Rep</strong></div> */}
                                    <div className=" brand-text d-none d-md-inline-block">
                                        <img src="/img/brand/elastix_logo_mini.png" style={{ maxWidth: '6rem' }} className="img-fluidnew mb-6" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {children}
        </div>
    </div>
);

const PreviewLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <PreviewLayout>
                <Component {...matchProps} />
            </PreviewLayout>
        )} />
    )
};

export default PreviewLayoutRoute;  