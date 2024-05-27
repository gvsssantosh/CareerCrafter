import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { authServiceObj } from './services/authService';
import "./login.css";
import Header from '../commonComponents/header';
function UserLogin() {

  const [uid, setUserId] = useState("mraju@gmail.com");
  const [pwd, setPassword] = useState("abcd@123");
  const [result, setResult] = useState("");

  let navigate = useNavigate(); // for navigation using code
  let location = useLocation(); // for reading query string params

  async function loginButton_click() {

    // returns the query string from the current url
    const queryString = location.search;
    let strReturnUrl = new URLSearchParams(queryString).get('returnUrl');

    if (strReturnUrl == null) {
      strReturnUrl = "/userHome/searchJobs";
    }
    
    try {
      let data = await authServiceObj.userLogin({ email: uid, password: pwd });
      if (data.success === true) {
        sessionStorage.setItem('user-token', data.token);
        sessionStorage.setItem('user_id', data.user_id);
        console.log("here");
        // navigate("/Depts");
        // navigate(strReturnUrl);
        navigate(strReturnUrl);
        // alert(`token:${sessionStorage.getItem('user-token')}, user_id:${sessionStorage.getItem('user_id')}`);
      }
      else {
        
        setResult(`Invalid User Id or Password:${data.msg}`);
      }

    } catch (error) {
      
      alert(error.message);
    }
  }


  return (
    <>
      <Header />

      <div className="login-component-user">
        <fieldset className='fieldset-class'>

          <h4>User Login</h4>
          <label>User Id  : </label>
          <input type="text" value={uid} onChange={(event) => setUserId(event.target.value)} />
          <br /><br />

          <label>Password  : </label>
          <input type="password" value={pwd} onChange={(args) => setPassword(args.target.value)} />
          <br /><br />

          <input type="button" onClick={loginButton_click} value="Login" />
          <p style={{ color: "red" }}>{result}</p>
          <br />
          <a className="link" href="/forgotUserPassword">Forgot Password?</a>
          <br />
          <a className="link" href="/userRegister">Sign Up</a>
        </fieldset>
      </div>
    </>

  );

}

export default UserLogin;
{/* <div className="login">
        <h4>Sign In</h4>
        <form onSubmit={loginButton_click}>
          <div className="text_area">
            <input
              type="text"
              placeholder='Username'
              value={uid}
              onChange={(event) => setUserId(event.target.value)}
              className="text_input"

            />
          </div>
          <div className="text_area">
            <input
              type="password"
              placeholder='Password'
              value={pwd}
              onChange={(args) => setPassword(args.target.value)}
              className="text_input"

            />
          </div>
          <input
            type="submit"
            value="SIGN IN"
            className="btn"

          />
        </form> */}
{/* <a className="link" href="/signup">Sign Up</a> */ }
{/* </div> */ }