import * as constants from './const.js';
import sha256 from 'crypto-js/sha256';
import React, { useState } from "react";
import TextField from "@mui/material/TextField";  

function InputBox({ getOutput }) {
  const [info, setInfo] = useState({ name: "", password: ""})
  const [error, setError] = useState(null);

  const handleSubmit=e=>{
    e.preventDefault();

    console.log(`You are submitting ${info.name} - ${info.password} - HASH:${sha256(info.password)}`);
    fetch(constants.BASE_URL + 'auth',{
      method: 'POST',
      mode: 'cors',
      cache: 'force-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        user_id: info.name,
        pass: sha256(info.password).toString()
      })
    })
    .then(res => {
      if(!res.ok)
        throw Error("Error");
      return res;
    })
    .then(res  => res.json())
    .then(res => res.body)
    .then(data => {
      getOutput(data);
      console.log(data);
    })
    .catch((err) => {
      setError(true);
    });
  }
  return (
    <div className='logContainer'>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginField">
          <TextField
            id='outlined-basic'
            label='Username'
            variant='standard'
            name='username'
            type='text'
            onChange={e=>setInfo({...info, name:e.target.value})}
            value={info.name}
          />
        </label>
        <br />
        <label className="loginField">
          <TextField
            id='outlinede-basic'
            label='Password'
            variant='standard'
            name="password"
            type="password"
            onChange={e=>setInfo({...info, password:e.target.value})}
            value={info.password}
          />
        </label>
        <br />
        <button>Login</button>
        <div>{error}</div>
        {error && (<p className="loginError">Invalid Login</p>)}
      </form>
      <div>
      </div>
    </div>
  )
}

export default InputBox;