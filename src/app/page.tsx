"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";


function Login() {
    const router = useRouter();
  


  type LoginForm = {
    username: string;
    password: string;
  };

  const [changeLogin, setChangeLogin] = useState(false);

  const [inputValues, setInputValues] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [loginValues, setLoginValues] = useState<LoginForm>({
    username: "",
    password: "",
  });

  function ChangeLogin() {
    setChangeLogin((prev) => !prev);
  }

  function InputValues(e: any) {
    const inputname = e.target.name;
    const inputvalue = e.target.value;
    setInputValues((prev) => ({
      ...prev,
      [inputname]: inputvalue,
    }));
  }



  function LoginValues(e: any) {
    const inputname = e.target.name;
    const inputvalue = e.target.value;
    setLoginValues((prev) => ({
      ...prev,
      [inputname]: inputvalue,
    }));
  }

  async function InputArray() {
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

    setInputValues({ username: "", password: "" });
    setChangeLogin(false);
  }

  async function LoginArray() {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginValues),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/home");
      } else {
        alert("Incorrect password or username");
      }
    } catch (error) {
      alert("Something went wrong");
    }

    setLoginValues({ username: "", password: "" });
  }

  return changeLogin ? (
  
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={InputValues}
          value={inputValues.username}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={InputValues}
          value={inputValues.password}
          style={inputStyle}
        />

        <button onClick={InputArray} style={primaryButton}>
          Sign Up
        </button>

        <p style={textStyle}>
          want to login?{" "}
          <Link href="#" onClick={ChangeLogin}>
            Login
          </Link>
        </p>
      </div>
    </div>
  ) : (
  
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={loginValues.username}
          onChange={LoginValues}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginValues.password}
          onChange={LoginValues}
          style={inputStyle}
        />

        <button onClick={LoginArray} style={primaryButton}>
          Login
        </button>

        <p style={textStyle}>
          Don’t have an account?{" "}
          <Link href="#" onClick={ChangeLogin}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url('login-background.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const cardStyle = {
  width: "320px",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const titleStyle = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const primaryButton = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#121c46ff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "10px",
};

const googleButton = {
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
};

const textStyle = {
  textAlign: "center" as const,
  marginTop: "15px",
};
