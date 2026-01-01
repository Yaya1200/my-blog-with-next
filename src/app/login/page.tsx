import Link from 'next/link'
import React from 'react'

function Login() {
  return (
    <div
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
          Don’t have an account? <Link href={"#"}> Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login