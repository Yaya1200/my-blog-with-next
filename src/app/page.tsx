"use client";
import { title } from "process";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
export default function HomePage(){
  const[data, setData] = useState<any[]>([]);
  const[searchData, setSearchData] = useState("");
  
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
      const inputValue = e.target.value;
      setSearchData(inputValue);

    }
    function SearchContent(){
      const searchContent = data.filter(element=>{
        element.title.toLowerCase() == (searchData).toLocaleLowerCase();
      })
      setData(searchContent);
    }

  
  return(
   <div style={{backgroundColor:"#289dc4ff", height:"100%"}}>
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
              <a className="nav-link active" href="/dashboard" style={{color: "#000000ff"}}>
                DashBoard
              </a>
            </li>
          </ul>

         
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

          <div className="d-flex">
            <img
              src="/profile.webp"
              alt="Profile"
              className="rounded-circle"
              width="50"
              height="50"
            />
          </div>
        </div>
      </div>
    </nav>
   
        
 <div className={styles.containerholder} style={{minHeight:"475px",cursor:'pointer'}}>
  {data.length === 0 ? (
  <div className="spinner-border text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
  ) : (
    <div className={styles.containerhold} >{
    data.map((element, index) => (    
       <div className="card border-warning mb-3" style={{maxWidth: "20rem", maxHeight:"16rem", overflow:"auto"}} key={index}>
  <div className="card-header" style={{color:"rgba(0, 0, 0, 1)"}}>{element.title} </div>
  <div className="card-body">
    <p className="card-text" style={{color:"rgba(0, 0, 0, 1)"}}>{element.content}</p>
   
  </div>
  
  
  </div>
     
    ))}
    </div>
  )}
</div>

       
    
<div
  style={{
    position:"relative",top: "20px",left: "0", backgroundColor: "#70d5f7ff",color: "#000000ff",textAlign: "center",padding: "20px 0",width: "100%",height: "60px"}}
>&copy; 2025 Blogify. All rights reserved.
</div>

</div>
  )
}