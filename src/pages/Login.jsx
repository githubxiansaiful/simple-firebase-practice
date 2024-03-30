import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.int";
import { useState } from "react";


const Login = () => {
    const [userData, setUserData] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setUserData(user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleGitHubSignIn = () => {

    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUserData(null);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className="container">
                {/* userData ? logout : Sign In */}

                <div className="text-center">
                    {
                        userData ?
                            <button onClick={handleSignOut} className="btn btn-warning">SignOut</button> : <div>
                                <button onClick={handleGoogleSignIn} className="btn btn-primary mr-3">Google Login</button>
                                <button onClick={handleGitHubSignIn} className="btn btn-primary">GitHub Login</button>
                            </div>

                    }
                </div>

                {userData && <div>
                    <h3>Username: {userData.displayName}</h3>
                    <h3>Email: {userData.email}</h3>
                    <img src={userData.photoURL} alt="" className="rounded-full" />
                </div>
                }
            </div>
        </div>
    );
};

export default Login;