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
              <div className="sidenav-header-inner text-center"><a href="pages-profile.html"><img src="img/avatar-7.jpg" alt="person" className="img-fluid rounded-circle" /></a>
                <h2 className="h5">Nathan Andrews</h2><span>Web Developer</span>
              </div>
              <div className="sidenav-header-logo"><a href={window.location} className="brand-small text-center"> <strong>V</strong><strong className="text-primary">R</strong></a></div>
            </div>
            <div className="main-menu">
              <h5 className="sidenav-heading">Main</h5>
              <ul id="side-main-menu" className="side-menu list-unstyled">
                <li><a href="index.html"> <i className="icon-home"></i>Home                             </a></li>
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
                    <div className=" brand-text d-none d-md-inline-block"><span>Tranz-Life </span><strong className="text-primary"> Virtual Rep</strong></div>
                  </a>
                </div>
                <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                  {/* <li className="nav-item dropdown"> <a id="notifications" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link"><i className="fa fa-bell"></i><span className="badge badge-warning">12</span></a>
                    <ul aria-labelledby="notifications" className="dropdown-menu">
                      <li><a rel="nofollow" href="#" className="dropdown-item">
                        <div className="notification d-flex justify-content-between">
                          <div className="notification-content"><i className="fa fa-envelope"></i>You have 6 new messages </div>
                          <div className="notification-time"><small>4 minutes ago</small></div>
                        </div></a></li>
                      <li><a rel="nofollow" href="#" className="dropdown-item">
                        <div className="notification d-flex justify-content-between">
                          <div className="notification-content"><i className="fa fa-twitter"></i>You have 2 followers</div>
                          <div className="notification-time"><small>4 minutes ago</small></div>
                        </div></a></li>
                      <li><a rel="nofollow" href="#" className="dropdown-item">
                        <div className="notification d-flex justify-content-between">
                          <div className="notification-content"><i className="fa fa-upload"></i>Server Rebooted</div>
                          <div className="notification-time"><small>4 minutes ago</small></div>
                        </div></a></li>
                      <li><a rel="nofollow" href="#" className="dropdown-item">
                        <div className="notification d-flex justify-content-between">
                          <div className="notification-content"><i className="fa fa-twitter"></i>You have 2 followers</div>
                          <div className="notification-time"><small>10 minutes ago</small></div>
                        </div></a></li>
                      <li><a rel="nofollow" href="#" className="dropdown-item all-notifications text-center"> <strong> <i className="fa fa-bell"></i>view all notifications                                            </strong></a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown"> <a id="messages" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link"><i className="fa fa-envelope"></i><span className="badge badge-info">10</span></a>
                    <ul aria-labelledby="notifications" className="dropdown-menu">
                      <li><a rel="nofollow" href="#" className="dropdown-item d-flex">
                        <div className="msg-profile"> <img src="img/avatar-1.jpg" alt="..." className="img-fluid rounded-circle" /></div>
                        <div className="msg-body">
                          <h3 className="h5">Jason Doe</h3><span>sent you a direct message</span><small>3 days ago at 7:58 pm - 10.06.2014</small>
                        </div></a></li>
                      <li><a rel="nofollow" href="#" className="dropdown-item d-flex">
                        <div className="msg-profile"> <img src="img/avatar-2.jpg" alt="..." className="img-fluid rounded-circle" /></div>
                        <div className="msg-body">
                          <h3 className="h5">Frank Williams</h3><span>sent you a direct message</span><small>3 days ago at 7:58 pm - 10.06.2014</small>
                        </div></a></li>
                      <li><a rel="nofollow" href="#" className="dropdown-item d-flex">
                        <div className="msg-profile"> <img src="img/avatar-3.jpg" alt="..." className="img-fluid rounded-circle" /></div>
                        <div className="msg-body">
                          <h3 className="h5">Ashley Wood</h3><span>sent you a direct message</span><small>3 days ago at 7:58 pm - 10.06.2014</small>
                        </div></a></li>
                      <li><a rel="nofollow" href="#" className="dropdown-item all-notifications text-center"> <strong> <i className="fa fa-envelope"></i>Read all messages    </strong></a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown"><a id="languages" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link language dropdown-toggle"><img src="img/flags/16/GB.png" alt="English" /><span className="d-none d-sm-inline-block">English</span></a>
                    <ul aria-labelledby="languages" className="dropdown-menu">
                      <li><a rel="nofollow" href="#" className="dropdown-item"> <img src="img/flags/16/DE.png" alt="English" className="mr-2" /><span>German</span></a></li>
                      <li><a rel="nofollow" href="#" className="dropdown-item"> <img src="img/flags/16/FR.png" alt="English" className="mr-2" /><span>French                                                         </span></a></li>
                    </ul>
                  </li>*/}
                  <li className="nav-item"><Link to="/login" className="nav-link logout"> <span className="d-none d-sm-inline-block">Logout</span><i className="fa fa-sign-out"></i></Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        {children}
        {/* <footer className="main-footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <p>Your company &copy; 2017-2020</p>
              </div>
              <div className="col-sm-6 text-right">
                <p>Version 1.4.7</p>
              </div>
            </div>
          </div>
        </footer> */}
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