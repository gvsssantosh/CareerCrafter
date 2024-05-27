import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserLogin from './user/Login';
import NotFound from './user/NotFound';
import SearchJobs from './user/components/searchComponent/searchJobs';
import MyApplications from './user/components/applicationComponent/myApplications';
import Resume from './user/components/resumeComponent/resume';
import Profile from './user/components/profileComponent/profile';
import ApplyJob from './user/components/searchComponent/applyJob';
import ViewJob from './user/components/applicationComponent/viewJob';
import UpdateResumeDetails from './user/components/resumeComponent/updateResumeDetails';
import UpdateResumeFile from './user/components/resumeComponent/updateResumeFile';
import UserRegistrationForm from './user/components/newUserRegisterComponent/userRegister';
import ResumeRegister from './user/components/newUserRegisterComponent/resumeRegister';
import ForgotUserPassword from './user/components/forgotUserPassword';
import ProtectedRoute from './user/ProtectedRoute';

import AdminHome from './admin/components/Home';
import Jobs from './admin/components/jobs/Jobs';
import JobForm from './admin/components/forms/JobForm';
import AdminJobList from './admin/components/JobPosting/adminjoblist';
import LogOut from './admin/components/Logout';
import AdminLogin from './admin/components/login/AdminLogin';
import AdminRegister from './admin/components/Register/AdminRegister';
import MyApplicationsAdmin from './admin/components/Applications/MyApplications';
import Viewuser from './admin/components/Applications/viewuser';
import ForgotAdminPassword from './admin/components/login/forgotAdminPassword';
import ProtectedRouteAdmin from './admin/ProtectedRoute';
import AboutUs from './commonComponents/aboutUs';
import ContactUs from './commonComponents/contactUs';

const routing = (
  <Router>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/userLogin' element={<UserLogin />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/userHome/searchJobs" element={<ProtectedRoute returnUrl="/userHome/searchJobs"><SearchJobs /></ProtectedRoute>} />
      <Route path="/userHome/myApplications" element={<ProtectedRoute returnUrl="/userHome/myApplications"><MyApplications /></ProtectedRoute>} />
      <Route path="/userHome/resume" element={<ProtectedRoute returnUrl="/userHome/resume"><Resume /></ProtectedRoute>} />
      <Route path="/userHome/profile" element={<ProtectedRoute returnUrl="/userHome/profile"><Profile /></ProtectedRoute>} />
      <Route path="/applyJob/:jobId" element={<ProtectedRoute returnUrl="/applyJob/:jobId"><ApplyJob /></ProtectedRoute>} />
      <Route path="/viewJob/:jobId" element={<ProtectedRoute returnUrl="/viewJob/:jobId"><ViewJob /></ProtectedRoute>} />
      <Route path="/updateResume/details/:userId" element={<ProtectedRoute returnUrl="/updateResume/details/:userId"><UpdateResumeDetails /></ProtectedRoute>} />
      <Route path="/updateResume/fileLink/:userId" element={<ProtectedRoute returnUrl="/updateResume/fileLink/:userId"><UpdateResumeFile /></ProtectedRoute>} />
      <Route path="/userRegister" element={<UserRegistrationForm />} />
      <Route path="/resumeRegister" element={<ProtectedRoute returnUrl="/resumeRegister"><ResumeRegister /></ProtectedRoute>} />
      <Route path="/forgotUserPassword" element={<ForgotUserPassword />} />
      {/* <Route path="/Employees" element={<ProtectedRoute returnUrl="/Employees"><Emps /></ProtectedRoute>} /> */}

      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/AdminHome" element={<AdminHome />} />
      <Route path="/AdminHome/Jobs" element={<ProtectedRouteAdmin returnUrl="/AdminHome/Jobs"><Jobs /></ProtectedRouteAdmin>} />
      <Route path="/AdminHome/Applications" element={<ProtectedRouteAdmin returnUrl="/AdminHome/Applications"><MyApplicationsAdmin /></ProtectedRouteAdmin>} />
      <Route path="/viewuser/:userId" element={<ProtectedRouteAdmin returnUrl="/viewuser/:userId"><Viewuser /></ProtectedRouteAdmin>} />
      <Route path="/AdminHome/JobForm" element={<ProtectedRouteAdmin returnUrl="/AdminHome/JobForm"><JobForm /></ProtectedRouteAdmin>} />
      <Route path="/AdminHome/AdminJobList" element={<ProtectedRouteAdmin returnUrl="/AdminHome/AdminJobList"><AdminJobList /></ProtectedRouteAdmin>} />
      <Route path="/forgotAdminPassword" element={<ForgotAdminPassword />} />
      <Route path="/AdminHome/logout" element={<LogOut />} />


    </Routes>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
