import React, {useState,useEffect} from 'react';
import {API_POST_LOGIN} from '../../backend';
import {httpsPOST} from '../../backend_api/CRMAPI';
import {toast} from 'react-toastify';
import {Redirect} from 'react-router-dom';
import {LoaderLarge} from '../ui_utilities/Loaders';
toast.configure ();


const Signin = ()=>{

  console.log("Access_Token",localStorage.getItem('access_token'))
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [showLoader, setShowLoader] = useState (false);
  const [hasAccessToken,setHasAccesstoken] = useState(true);

  useEffect(() => {
     if(hasAccessToken || localStorage.getItem('access_token')){
    debugger
    <Redirect to="/signup"/>  
  }
  }, [hasAccessToken])

 

  const loginAccount = () => {
    setShowLoader (true);
    httpsPOST (null, API_POST_LOGIN, {username: username, password: password})
      .then (response => {
        if(response.accessToken){
          alert("Login successfull")
          localStorage.setItem('access_token',response.accessToken)
          setHasAccesstoken(true)
        }
        // toast.success ('Account created');
        // <Redirect to="/signin" />;
        setShowLoader (false);
      })
      .catch (error => {
        toast.error (error);
        console.log ('Error: ', error);
        setShowLoader (false);
      });
};


    return(
        <body class="antialiased bg-gray-200 text-gray-900 font-sans">
          <div class="flex items-center h-screen w-full">
              {showLoader?
                <div className="w-full flex items-center justify-center h-3/6">
                  <LoaderLarge type="ThreeDots" />
                </div>:

                <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span class="block w-full text-xl uppercase font-bold mb-4">Signin</span>
                    <div class="mb-4">
                      <div class="mb-4 md:w-full">
                        <label for="email" class="block text-xs mb-1">Username</label>
                        <input
                          class="w-full border rounded p-2 outline-none focus:shadow-outline"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Username or Email"
                          onChange={e => setUsername (e.target.value)}
                        />
                      </div>
                      <div class="mb-6 md:w-full">
                        <label for="password" class="block text-xs mb-1">Password</label>
                        <input
                          class="w-full border rounded p-2 outline-none focus:shadow-outline"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          onChange={e => setPassword (e.target.value)}
                        />
                      </div>
                      <button
                        class="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
                        onClick={() => loginAccount ()}
                      >
                        Login
                      </button>
                    </div>
                    <div className="flex flex-row justify-between">
                      <a class="text-blue-700 text-center text-sm" href="/login">
                        Forgot password?
                      </a>
                      <a class="text-blue-700 text-center text-sm" href="/signup">
                        Create New Account
                      </a>

                    </div>
                </div>

              }
          </div>
        </body>
    )
}

export default Signin;

