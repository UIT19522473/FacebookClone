import React, { useEffect, useState } from "react";
import "../styles/login.css";
import LogoFacebook from "../images/fb_logo.svg";

// import Modal from "../components/ModalTailWind";
import Register from "../components/Register";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../features/auth/authAsync";
import ModalCustom from "../components/ModalCustom";
import { openRegisterForm } from "../features/registerForm/registerFormSlice";

import { FcGoogle } from "react-icons/fc";

// import ModalTest from "../components/ModalTest";
// import { apiSignIn } from "../apis/apiAuth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // const [open, setOpen] = useState(false);
  const open = useSelector((state) => state.registerForm.open);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //open form register
  const handleCreateAccount = () => {
    // setOpen(!open);
    dispatch(openRegisterForm());
  };

  //handle login
  const handleLogin = async () => {
    dispatch(
      signIn({
        email: email,
        password: pass,
      })
    );
  };

  useEffect(() => {
    if (auth.data?.user) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className="wrap-login">
      {open ? (
        <ModalCustom open={open} type="REGISTER">
          <Register />
        </ModalCustom>
      ) : (
        <></>
      )}
      <main className="main-login">
        <div className="row">
          <div className="col-logo">
            <img src={LogoFacebook} alt="Logo" />
            <h2 className="text-2xl">
              Facebook helps you connect and share with the people in your life.
            </h2>
          </div>
          <div className="col-form">
            <div className="form-container">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
                type="text"
                placeholder="Email address or phone number "
              />
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="rounded-lg"
                type="password"
                placeholder="Password"
              />
              <button onClick={handleLogin} className="btn-login">
                Login
              </button>

              <button
                onClick={handleLogin}
                className="btn-login btn-login--google flex items-center gap-2 justify-center"
              >
                <FcGoogle size={32} />
                <p className="text-3xl">Continue with Google</p>
              </button>

              <Link to="#">Forgotten password?</Link>
              <button onClick={handleCreateAccount} className="btn-new">
                Create new Account
              </button>
            </div>
            <p>
              <Link className="mr-1" to="#">
                <b>Create a Page</b>
              </Link>
              for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </main>
      <footer className="footer-login"></footer>
      {/* <footer className="footer-login">
        <div className="footer-contents">
          <ol>
            <li>English (UK)</li>
            <li>
              <a href="#">മലയാളം</a>
            </li>
            <li>
              <a href="#">தமிழ்</a>
            </li>
            <li>
              <a href="#">తెలుగు</a>
            </li>
            <li>
              <a href="#">বাংলা</a>
            </li>
            <li>
              <a href="#">اردو</a>
            </li>
            <li>
              <a href="#">हिन्दी</a>
            </li>
            <li>
              <a href="#">ಕನ್ನಡ</a>
            </li>
            <li>
              <a href="#">Español</a>
            </li>
            <li>
              <a href="#">Português (Brasil)</a>
            </li>
            <li>
              <a href="#">Français (France)</a>
            </li>
            <li>
              <button>
                <p>+</p>
              </button>
            </li>
          </ol>
          <ol>
            <li>
              <a href="#">Sign Up</a>
            </li>
            <li>
              <a href="#">Log In </a>
            </li>
            <li>
              <a href="#">Messenger</a>
            </li>
            <li>
              <a href="#">Facebook Lite</a>
            </li>
            <li>
              <a href="#">Watch</a>
            </li>
            <li>
              <a href="#">People</a>
            </li>
            <li>
              <a href="#">Pages</a>
            </li>
            <li>
              <a href="#">Page categories</a>
            </li>
            <li>
              <a href="#">Places</a>
            </li>
            <li>
              <a href="#">Games</a>
            </li>
            <li>
              <a href="#">Locations</a>
            </li>
            <li>
              <a href="#">Marketplace</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">PayGroups</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Oculus</a>
            </li>
            <li>
              <a href="#">Portal</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Local</a>
            </li>
            <li>
              <a href="#">Sign Up</a>
            </li>
            <li>
              <a href="#">Log In </a>
            </li>
            <li>
              <a href="#">Messenger</a>
            </li>
            <li>
              <a href="#">Facebook Lite</a>
            </li>
            <li>
              <a href="#">Watch</a>
            </li>
            <li>
              <a href="#">People</a>
            </li>
            <li>
              <a href="#">Pages</a>
            </li>
            <li>
              <a href="#">Page categories</a>
            </li>
            <li>
              <a href="#">Places</a>
            </li>
            <li>
              <a href="#">Games</a>
            </li>
            <li>
              <a href="#">Locations</a>
            </li>
            <li>
              <a href="#">Marketplace</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">PayGroups</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Oculus</a>
            </li>
            <li>
              <a href="#">Portal</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Local</a>
            </li>
          </ol>
          <small>Facebook © 2021</small>
        </div>
      </footer>
      ; */}
    </div>
  );
};

export default Login;
