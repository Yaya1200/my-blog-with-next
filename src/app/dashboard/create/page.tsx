"use client";
import Link from "next/link";
import { title } from "process";
import {useState } from "react";
import { useTheme } from "@/app/lib/ThemeProvider";
export default function CreateBlog() {
 const { darkMode, toggleTheme }:any = useTheme();
  type inputs = {
    title:string, content:string
  }
  const [inputValues, setInputValues] = useState<inputs>({
  title: "",
  content: "",
});
const [storeInputs, setStoreInputs] = useState<any[]>([])
function handleInput(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
  const inputname = e.target.name;
  const inputvalue = e.target.value;
  setInputValues((prev)=>({
    ...prev,
      [inputname]: inputvalue
    }
  ))
}
async function handleChange() {
  setStoreInputs((prev) => [
    ...prev,
    inputValues,
  ]);
  
  await fetch("/api/posts",{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(inputValues)
  })
 setInputValues({title : "", content: ""})  

}
function Toogle(){
  toggleTheme();
  
}



  return (
    <div style={{backgroundColor : darkMode ? "#000000ff" : "#289dc4ff"}}>
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{backgroundColor: darkMode ? "#000000ff":"#70d5f7ff", color: darkMode ? "#ffffffff" :"#000000ff"}}>
  
      <div className="container-fluid">
      
        <Link href="/home" className="logo navbar-brand fw-bold fs-4" style={{color: darkMode? "#ffffffff" : "#000000ff"}}>
          Blogify
        </Link>

       
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" href="/dashboard" style={{color: darkMode? "#ffffffff" : "#000000ff"}}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" href="/home" style={{color: darkMode? "#ffffffff" : "#000000ff"}}>
                Home
              </Link>
            </li>
          </ul>

         
                    <button
           
                style={{
        width: "40px",
        height: "25px",
        borderRadius:"15px",
        border: "none",
        cursor: "pointer",
        backgroundImage :  darkMode ? "url('/toogle-right.svg')": "url('/toogle-left.svg')",
        backgroundSize:"cover",
        backgroundPosition:"center",
        transition: "all 0.3s ease",
        marginRight : "20px"
      }} onClick={Toogle}
      >
          
          </button>


          <Link href={"/"} className="d-flex">
            <img
              src="/profile.webp"
              alt="Profile"
              className="rounded-circle"
              width="50"
              height="50"
            />
          </Link>
        </div>
      </div>
    </nav>
    <div className="p-3   text-info-emphasis">
    <div className="mt-5 ms-5 d-flex justify-content-center ">
    <div className="form-floating ">
      <div className="d-flex justify-content-center">
      <input className="bg-primary-subtle  ps-2" onChange={handleInput} name="title" value={inputValues.title} placeholder="Catagory" style={{border:"none", borderRadius:"5px 5px 0 0",color: "#000000ff"}}/>
      </div>
  <textarea className="form-control p-3 mb-2 bg-primary-subtle" onChange={handleInput} name= "content" value={inputValues.content} placeholder="Write here" style= {{height: "300px", width: "600px", border: "none", color:  "#000000ff"}}></textarea>

  <div className="d-flex justify-content-end">
  <button type="button" className="btn  my-1 bg-primary-subtle" onClick={handleChange}>Add</button>
  </div>
  </div>
  
</div>
</div>
<div style={{backgroundColor : darkMode ? "#000000ff" : "#289dc4ff",color: darkMode? "#ffffffff" : "#000000ff", textAlign: "center", padding: "25px 0", maxWidth:"100%", height:"65px", marginTop:"41px"}}>
  &copy; 2025 Blogify. All rights reserved.
</div>
</div>
  );
}
