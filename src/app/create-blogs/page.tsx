"use client";
import { title } from "process";
import {useState } from "react";
export default function CreateBlog() {
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
  
  await fetch("api/posts",{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(inputValues)
  })
 setInputValues({title : "", content: ""})  

}



  return (
    <div style={{backgroundColor:"#289dc4ff"}}>
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{backgroundColor:"#70d5f7ff", color: "#000000ff"}}>
  
      <div className="container-fluid">
      
        <a href="/" className="logo navbar-brand fw-bold fs-4" style={{color: "#000000ff"}}>
          Blogify
        </a>

       
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
              <a className="nav-link active" href="#" style={{color: "#000000ff"}}>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#" style={{color: "#000000ff"}}>
                Home
              </a>
            </li>
          </ul>

         
          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          <div className="d-flex">
            <img
              src="profile.webp"
              alt="Profile"
              className="rounded-circle"
              width="50"
              height="50"
            />
          </div>
        </div>
      </div>
    </nav>
    <div className="p-3   text-info-emphasis">
    <div className="mt-5 ms-5 d-flex justify-content-center ">
    <div className="form-floating ">
      <div className="d-flex justify-content-center">
      <input className="bg-primary-subtle  ps-2" onChange={handleInput} name="title" placeholder="Catagory" style={{border:"none",color:"#000000ff"}}/>
      </div>
  <textarea className="form-control p-3 mb-2 bg-primary-subtle" onChange={handleInput} name= "content" placeholder="Write here" style= {{height: "300px", width: "600px", border: "none", color:"#000000ff"}}></textarea>

  <div className="d-flex justify-content-end">
  <button type="button" className="btn  my-1 bg-primary-subtle" onClick={handleChange}>Add</button>
  </div>
  </div>
  
</div>
</div>
<div className="mt-4"style={{backgroundColor:"#70d5f7ff", color: "#000000ff", textAlign: "center", padding: "33px 0", maxWidth:"100%", height:"82px"}}>
  &copy; 2025 Blogify. All rights reserved.
</div>
</div>
  );
}
