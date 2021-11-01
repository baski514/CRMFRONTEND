import React, {Component, useState} from 'react';
import { API_POST_SIGNUP } from '../../backend';
import { httpsPOST } from '../../backend_api/CRMAPI';
import {toast} from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { LoaderLarge } from '../ui_utilities/Loaders';
toast.configure ();


const Signup = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [showLoader,setShowLoader] = useState(false);

    const createAccount = () => {
        setShowLoader(true)
        httpsPOST (null, API_POST_SIGNUP, {username:username,password:password})
            .then (response => {
                if(response.msg && response.status){
                    alert ('Account created');
                }else{
                    alert (response.msg);
                }
                setShowLoader (false);

            })
            .catch (error => {
                toast.error(error)
                console.log ('Error: ', error);
                setShowLoader(false)
            });
    };



  return (
    <body class="antialiased bg-gray-200 text-gray-900 font-sans">
      <div class="flex items-center h-screen w-full">
          {showLoader?
            <div className="w-full flex items-center justify-center h-3/6">
                <LoaderLarge type="ThreeDots" />
            </div>:
            <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
  <span class="block w-full text-xl uppercase font-bold mb-4">
    Create Account
  </span>
  <div class="mb-4">
    <div class="mb-4 md:w-full">
      <label for="email" class="block text-xs mb-1">
        Choose username
      </label>
      <input
        class="w-full border rounded p-2 outline-none focus:shadow-outline"
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        value={username}
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
        value={password}
        placeholder="Password"
        onChange={e => setPassword (e.target.value)}
      />
    </div>

    <button
      class="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
      onClick={() => {
        createAccount ();
      }}
    >
      Signup
    </button>
  </div>
  <a class="text-blue-700 text-center text-sm" href="/signin">
    Already have an account? signin{' '}
  </a>
</div>

        }   
      </div>
    </body>
  );
};

export default Signup;
