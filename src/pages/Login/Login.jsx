import { Fragment, useState, useRef } from "react";
import classes from "./Login.module.css";
import { CgProfile } from "react-icons/cg";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";
import { IoMdPhonePortrait } from "react-icons/io";
import { RiText } from "react-icons/ri";
const Login = () => {
  const [show, setShow] = useState(true);
  const [state, setState] = useState(true);
  const [resolve, setResolve] = useState(false);
  const [passwordState, setPasswordState] = useState(true);
  const enteredName = useRef();
  const enteredEmail = useRef();
  const enteredPassword = useRef("");
  const enteredPhone = useRef();
  const [newState, setNewState] = useState(true);
  const navigate = useNavigate();

  const handlePasswordFocus = () => {
    setShow(false);
  };
  const handlePasswordBlur = () => {
    setShow(true);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const postSignupdata = async () => {
      try {
        setResolve(true);
        const obj = {
          name: enteredName.current.value,
          email: enteredEmail.current.value,
          phone: enteredPhone.current.value,
          password: enteredPassword.current.value,
        };
        await axios.post(`https://dummyjson.com/auth/login`, obj);
        alert("Signed up Successfully");
        setState(true);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        } else {
          alert(`Error: ${err.message}`);
        }
      }
      setResolve(false);
    };
    const postLogin = async () => {
      try {
        setResolve(true);
       
        const response =await axios.post('https://dummyjson.com/auth/login', {
            username: 'kminchelle',
            password: '0lelplR',
          
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userName", response.data.userName);
        navigate("/product");
      } catch (err) {
        if (err.response) {
          alert(err.response.data.error);
        } else {
          alert(err);
        }
      }
      setResolve(false);
    };
    if (!state) {
      postSignupdata();
    } else {
      postLogin();
    }
  };
  const signupHandler = () => {
    setState((prev) => !prev);
  };
  const changeInputHandler = (e) => {
    e.target.value ? setNewState(false) : setNewState(true);
    setShow(true);
  };
  const showPassword = () => {
    console.log("show");
    setPasswordState(true);
  };
  const hidePassword = () => {
    setPasswordState(false);
  };
  return (
    <Fragment>
      <div className={classes.Login}>
        <lottie-player
          src="https://lottie.host/5f1067ff-3930-484f-876a-3827aec6e680/3ARPbpT4oY.json"
          background="transparent"
          speed="1"
          style={{ width: "500px", height: "500px" }}
          loop
          autoplay
        ></lottie-player>
        <div className={classes.formcontainer}>
          
          <CgProfile className={classes.icon} />
          <form onSubmit={submitHandler} className={classes.form}>
            {!state && (
              <>
                <label>Name</label>
                <div className={classes.inputcontainer}>
                  <input ref={enteredName} />
                  <RiText className={classes.user} />
                </div>
              </>
            )}
            <label>Username</label>
            <div className={classes.inputcontainer}>
              <input type="text" ref={enteredEmail} required />
              <FaRegUser className={classes.user} />
            </div>
            {!state && (
              <>
                <label>Phone Number</label>
                <div className={classes.inputcontainer}>
                  <input ref={enteredPhone} />

                  <IoMdPhonePortrait className={classes.user} />
                </div>
              </>
            )}

            <label htmlFor="password">Password</label>
            <div className={classes.inputcontainer}>
              <input
                type={passwordState ? "password" : "text"}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                onChange={changeInputHandler}
                ref={enteredPassword}
                required
              ></input>

              {show && newState && <FaLock className={classes.lock} />}
              {!newState && (
                <>
                  {!passwordState && (
                    <IoIosEye onClick={showPassword} className={classes.lock} />
                  )}
                  {passwordState && (
                    <IoIosEyeOff
                      onClick={hidePassword}
                      className={classes.lock}
                    />
                  )}
                </>
              )}
            </div>

            <small>Forgot Password?</small>
            <button type="submit"> {state ? "Login" : "Signup"}</button>
          </form>
          <hr />
          <div className={classes.accountContainer}>
            <p> {state ? "Dont have an account yet?" : "Existing user?"}</p>
            <p className={classes.newaccount} onClick={signupHandler}>
              {state ? "Create an account" : "Click to login"}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
