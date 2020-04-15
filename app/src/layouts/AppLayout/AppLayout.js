import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import './AppLayout.css';

const AppLayout = ({ children, ...rest }) => {

  const [navShrinked, setNavShrinked] = useState(false);
  const [navClass, setNavClass] = useState('');
  const [pageClass, setPageClass] = useState('');



  const toggleButtonClickHandler = (event) => {
    event.preventDefault();
    console.log($(window).outerWidth());
    if ($(window).outerWidth() > 1194) {
      if (navShrinked) {
        setNavClass('');
        setPageClass('');
      } else {
        setNavClass('shrink');
        setPageClass('active');
      }
    } else {
      if (navShrinked) {
        setNavClass('');
        setPageClass('');
      } else {
        setNavClass('show-sm');
        setPageClass('active-sm');
      }
    }
    setNavShrinked(!navShrinked);
  }

  return (
    <div >
      <nav className={navClass + ' side-navbar'}>
        <Scrollbars>
          <div className="side-navbar-wrapper">
            <div className="sidenav-header d-flex align-items-center justify-content-center">
              <div className="sidenav-header-inner text-center">
                <a href="#">
                  <img src="/img/avatar-12.jpg" alt="person" className="img-fluid rounded-circle" />
                </a>
                <h2 className="h5">Ali Imran</h2><span>Medical Information Officer</span>
              </div>
              <div className="sidenav-header-logo"><a href={window.location} className="brand-small text-center"> <strong>V</strong><strong className="text-primary">F</strong></a></div>
            </div>
            <div className="main-menu">
              <h5 className="sidenav-heading">Main</h5>
              <ul id="side-main-menu" className="side-menu list-unstyled">
                <li><a href="/meetings"> <i className="icon-home"></i>Home</a></li>
                <li><a href="#formsDropdown" aria-expanded="false" data-toggle="collapse"> <i className="icon-form"></i>Forms </a>
                  <ul id="formsDropdown" className="collapse list-unstyled ">
                    <li><a href="forms.html">Basic forms</a></li>
                    <li><a href="forms-advanced.html">Advanced forms</a></li>
                    <li><a href="forms-autocomplete.html">Autocomplete</a></li>
                    <li><a href="forms-dropzone.html">Files upload</a></li>
                    <li><a href="forms-texteditor.html">Text editor</a></li>
                    <li><a href="forms-validation.html">Validation</a></li>
                  </ul>
                </li>
                <li><a href="#chartsDropdown" aria-expanded="false" data-toggle="collapse"> <i className="fa fa-bar-chart"></i>Charts </a>
                  <ul id="chartsDropdown" className="collapse list-unstyled ">
                    <li><a href="charts.html">Charts</a></li>
                    <li><a href="charts-gauge-sparkline.html">Gauge + Sparkline</a></li>
                  </ul>
                </li>
                <li><a href="#tablesDropdown" aria-expanded="false" data-toggle="collapse"> <i className="icon-grid"></i>Tables </a>
                  <ul id="tablesDropdown" className="collapse list-unstyled ">
                    <li><a href="tables.html">Bootstrap tables</a></li>
                    <li><a href="tables-datatable.html">Datatable</a></li>
                  </ul>
                </li>
                <li><a href="#componentsDropdown" aria-expanded="false" data-toggle="collapse"> <i className="icon-page"></i>Components </a>
                  <ul id="componentsDropdown" className="collapse list-unstyled ">
                    <li><a href="components-cards.html">Cards</a></li>
                    <li><a href="components-calendar.html">Calendar</a></li>
                    <li><a href="components-gallery.html">Gallery</a></li>
                    <li><a href="components-loading-buttons.html">Loading buttons</a></li>
                    <li><a href="components-map.html">Maps</a></li>
                    <li><a href="components-notifications.html">Notifications</a></li>
                    <li><a href="components-preloader.html">Preloaders</a></li>
                  </ul>
                </li>
                <li><a href="#pagesDropdown" aria-expanded="false" data-toggle="collapse"> <i className="icon-interface-windows"></i>Pages </a>
                  <ul id="pagesDropdown" className="collapse list-unstyled ">
                    <li><a href="pages-contacts.html">Contacts</a></li>
                    <li><a href="pages-invoice.html">Invoice</a></li>
                    <li><a href="login.html">Login page</a></li>
                    <li><a href="login-2.html">Login v.2 <span className="badge badge-info">New</span></a></li>
                    <li><a href="pages-profile.html">Profile</a></li>
                    <li><a href="pages-pricing.html">Pricing table</a></li>
                  </ul>
                </li>
                <li> <a href="#"> <i className="icon-mail"></i>Demo
                <div className="badge badge-warning">6 New</div></a></li>
              </ul>
            </div>
            <div className="admin-menu">
              <h5 className="sidenav-heading">Second menu</h5>
              <ul id="side-admin-menu" className="side-menu list-unstyled">
                <li> <a href="#"> <i className="icon-screen"> </i>Demo</a></li>
                <li> <a href="#"> <i className="icon-flask"> </i>Demo
                <div className="badge badge-info">Special</div></a></li>
                <li> <a href=""> <i className="icon-flask"> </i>Demo</a></li>
                <li> <a href=""> <i className="icon-picture"> </i>Demo</a></li>
              </ul>
            </div>
          </div>
        </Scrollbars>
      </nav>

      <div className={pageClass + ' page'}>
        <header className="header">
          <nav className="navbar">
            <div className="container-fluid">
              <div className="navbar-holder d-flex align-items-center justify-content-between">
                <div className="navbar-header">
                  <a onClick={toggleButtonClickHandler} id="toggle-btn" href="#" className="menu-btn"><i className="icon-bars"> </i></a>
                  <a href={window.location} className="navbar-brand">
                    <div className=" brand-text d-none d-md-inline-block">
                      {/* <span>Tranz-Life </span> */}
                      <img src="/img/brand/elastix_logo_mini.png" style={{ maxWidth: '6rem' }} className="img-fluidnew mb-6" />
                      {/* <strong className="text-primary"> eField</strong> */}
                    </div>
                  </a>
                </div>
                <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                  <li className="nav-item"><Link to="/login" className="nav-link logout"> <span className="d-none d-sm-inline-block">Logout</span><i className="fa fa-sign-out"></i></Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        {children}
      </div>
    </div>
  )
}

const AppLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <AppLayout>
        <Component {...matchProps} />
      </AppLayout>
    )} />
  )
};

export default AppLayoutRoute; 