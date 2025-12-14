"use client";
import { title } from "process";
import { useEffect, useState } from "react";
export default function DashBoard(){
  const[data, setData] = useState<any[]>([]);
  
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

  
  return(
   <div style={{backgroundColor:"#289dc4ff", height:"580px"}}>
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
   
        
   <div>{data.map((element)=>{
     <div className="card border-warning mb-3" style={{maxWidth: "18rem"}}>
  <div className="card-header">{element.title} </div>
  <div className="card-body">
    <h5 className="card-title">{prop.title}</h5>
    <p className="card-text">{prop.content}</p>
    <button onClick={() => prop.ondelete(prop.id)} className="btn btn-sm ">
          <DeleteIcon style={{color:"rgba(155, 32, 32, 1)"}}/>
        </button>
  </div>
   })
    
  
  </div>}
  </div>
       
    
<div
  style={{
    marginTop:"552px",position:"absolute",top: "20px",left: "0", backgroundColor: "#70d5f7ff",color: "#000000ff",textAlign: "center",padding: "20px 0",width: "100%",height: "60px"}}
>&copy; 2025 Blogify. All rights reserved.
</div>

</div>
  )
}