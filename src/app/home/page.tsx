"use client";
import { title } from "process";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "../lib/ThemeProvider";
export default function HomePage(){
  const[data, setData] = useState<any[]>([]);
  const[searchData, setSearchData] = useState("");
  const{darkMode, toggleTheme} = useTheme();
  
  useEffect(() => {
    async function BlogPosts() {
      try {
        const result = await fetch("http://localhost:3000/api/posts", {
          cache: "no-store"
        });

        const json = await result.json();
        setData(json.data); 
      } catch (error) {
        console.error("Error fetching data", error);
      }
    } BlogPosts()},[])
    function searchTitle(e:React.ChangeEvent<HTMLInputElement>){
      let inputValue = e.target.value;
      setSearchData(inputValue);

    }
    function SearchContent(e:React.ChangeEvent){
      e.preventDefault();
      const searchContent = data.filter(element=>{
        return element.title.toLowerCase().includes(searchData.toLowerCase());
      })
      setSearchData("")
      searchContent?.length > 0 && data?.length > 0 ?  setData(searchContent): alert("The searched content does not exit.")
      
    }
    function Toogle(){
  toggleTheme();
  
}

  
  return(
   <div style={{backgroundColor: darkMode ? "#000000ff":"#289dc4ff", minHeight: "100vh"}}>
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{backgroundColor: darkMode ? "#000000ff":"#70d5f7ff", color: darkMode ? "#ffffffff" : "#000000ff"}}>
  
      <div className="container-fluid">
      
        <Link href="/home" className="logo navbar-brand fw-bold fs-4" style={{color: darkMode ? "#ffffffff" : "#000000ff"}}>
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
              <Link className="nav-link active" href="/dashboard" style={{color: darkMode ? "#ffffffff" : "#000000ff"}}>
                DashBoard
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

         
          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={searchTitle}
              value={searchData}
            />
            <button className="btn btn-outline-success" type="submit" onClick={SearchContent}>
              Search
            </button>
          </form>

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
   
        
 <div className={styles.containerholder} style={{minHeight:"475px", backgroundColor: darkMode ? "#000000ff":"#289dc4ff"}}>
  {data?.length === 0 ? (
  <div className="spinner-border text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
  ) : (
    <div className={styles.containerhold} >{
    data?.map((element, index) => (    
       <div className="card border-warning mb-3" style={{maxWidth: "20rem", maxHeight:"16rem", overflow:"auto" ,cursor:'pointer'}} key={index}>
  <div className="card-header" style={{color: "#000000ff" }}>{element.title} </div>
  <div className="card-body">
    <p className="card-text" style={{color: "#000000ff"  }}>{element.content}</p>
   
  </div>
  
  
  </div>
     
    ))}
    </div>
  )}
</div>

       
    
<div
  style={{
    position:"relative",top: "20px",left: "0", backgroundColor: darkMode ? "#000000ff":"#70d5f7ff",color: darkMode ? "#ffffffff" : "#000000ff",textAlign: "center",padding: "20px 0",width: "100%",height: "60px"}}
>&copy; 2025 Blogify. All rights reserved.
</div>

</div>
  )
}