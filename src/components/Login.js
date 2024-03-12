import React from "react";
import { GoogleOutlined,FacebookOutlined } from "@ant-design/icons";
import { auth } from './firebase';
import "firebase/compat/auth";
import { GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";






function Login() {
    const provider = new GoogleAuthProvider();
    const provider2 = new FacebookAuthProvider();
    return (
        <div id="login-page">
            <div id="login-card">
                <h2> Welcome To Messenger </h2>



                <div

                    className="login-button google"
                    onClick={() => {signInWithRedirect(auth,provider)}}
                >
                    <GoogleOutlined /> SignIn with google

                </div>

                <br /><br />

                <div

                    className="login-button facebook"
                    onClick={() => {signInWithRedirect(auth,provider2)}}
                >
                    <FacebookOutlined /> SignIn with facebook

                </div>

            </div>

        </div>
    );
}

export default Login;