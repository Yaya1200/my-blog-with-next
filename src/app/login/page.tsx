"use client";
import Link from 'next/link'
import React, { ChangeEventHandler } from 'react'
import { useState } from 'react';

function Login() {
  type LoginForm = {
  username: string;
  password: string;
};

  const [changeLogin, setChangeLogin] = useState(false);
  const [inputValues, setInputValues] = useState<LoginForm>({
    username:"",
    password:"",
  });

const [loginValues, setLoginValues] = useState<LoginForm>({
    username:"",
    password:"",
  });
  function ChangeLogin(){
   setChangeLogin((prev)=>!prev);
  }
  function InputValues(e:any){
    const inputname = e.target.name;
    const inputvalue = e.target.value;
    setInputValues((prev)=>({
      ...prev,
      [inputname] : inputvalue,
    }
      
    ))

  }
  function LoginValues(e:any){
    const inputname = e.target.name;
    const inputvalue = e.target.value;
    setInputValues((prev)=>({
      ...prev,
      [inputname] : inputvalue,
    }
      
    ))

  }
  async function InputArray(){
    setInputValues({
        username:"",
    password:"",
    });
   try {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputValues),
  });

  const data = await res.json();
  alert(data.message);
} catch (error) {
  alert("Something went wrong");
}

    setChangeLogin(false);

  }
  async function LoginArray() {
     setLoginValues({
        username:"",
    password:"",
    });
    try{
      const res = await fetch("/api/signup",{
        method : 'GET',
        headers: {'Content-Type' : "application/json"},
        body: JSON.stringify(loginValues)
      })
      const data = await res.json();
      alert(data.message);


    }
    catch(error){
      alert('Something went wrong!');
    }

    
  }
  return (
    changeLogin ? <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       backgroundImage : "url('login-background.jpg')",
       backgroundSize: "cover",
       backgroundPosition : "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "320px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Username"
          name='username'
          onChange={InputValues}
          value={inputValues.username || ""}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          name = "password"
          onChange={InputValues}
          value={inputValues.password || ""}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <button
        onClick={InputArray}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#121c46ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom:"10px"
          }}
        >
          Sign Up
            </button>
              


        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
          }}
        >
          want to login? <Link href={"#"} onClick={ChangeLogin}>Login</Link>
        </p>
      </div>
    </div> : <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       backgroundImage : "url('login-background.jpg')",
       backgroundSize: "cover",
       backgroundPosition : "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "320px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          name='username'
          value={loginValues.username}
          onChange={LoginValues}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          name='password'
          value={loginValues.password}
          onChange={LoginValues}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#121c46ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom:"10px"
          }}
          onClick={LoginArray}
        >
          Login
            </button>
              <button
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#fff",
        color: "#000",
        border: "1px solid #dadce0",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        style={{
          width: "20px",
          height: "20px",
        }}
      />
      Continue with Google
    </button>


        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
          }}
        >
          Don’t have an account? <Link href={"#"} onClick={ChangeLogin}> Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login