"use client";
import Link from "next/link";
import styles from "./DashBoard.module.css";
import { useEffect, useState } from "react";
export default function DashBoard(){
  const[data, setData] = useState<any[]>([]);
  const[searchData, setSearchData] = useState<string>("")

  
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
        return element.title.toLowerCase() === searchData.toLowerCase();
      })
      setSearchData("")
      searchContent.length > 0 && data.length > 0 ?  setData(searchContent): alert("The searched content does not exit.")
      
    }
   async function DeleteFunction(deleteData:string) {
  try {
await fetch(`/api/posts/${deleteData}`, { method: "DELETE" });

       setData((prev) => prev.filter((element) => element._id !== deleteData));

    
  } catch (error) {
    console.error(error);
  }
}

    


  
  return(
   <div style={{backgroundColor:"#289dc4ff", height:"100%"}}>
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{backgroundColor:"#70d5f7ff", color: "#000000ff"}}>
  
      <div className="container-fluid">
      
        <Link href="/" className="logo navbar-brand fw-bold fs-4" style={{color: "#000000ff"}}>
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
              <Link className="nav-link active" href="/" style={{color: "#000000ff"}}>
                Home
              </Link>
            </li>
          </ul>

         
          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name = "title"
              onChange={searchTitle}
              value={searchData}
            />
            <button className="btn btn-outline-success" type="button" onClick={SearchContent}>
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
   
        
 <div className={styles.containerholder} style={{minHeight:"438px"}}>
  {data.length === 0 ? (
  <div className="spinner-border text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
  ) : (
    <div className={styles.containerhold} >{
    data.map((element, index) => (    
       <div className="card border-warning mb-3" style={{maxWidth: "20rem", maxHeight:"16rem", overflow:"auto", cursor:'pointer'}} key={index}>
  <div className="card-header" style={{color:"rgba(0, 0, 0, 1)"}}>{element.title} </div>
  <div className="card-body">
    <p className="card-text" style={{color:"rgba(0, 0, 0, 1)"}}>{element.content}</p>
    <div style={{position:"absolute"}}>
    <button  className="btn btn-sm " style={{marginLeft:"180px", marginRight:"10px", padding:"0px", marginTop:"40px"}}>
       {<img src="/edit.svg" style={{width:"20px", height:"20px"}}/>} </button>
    <button  className="btn btn-sm " style={{ marginTop:"40px", marginLeft:"5px"}} onClick={()=>{DeleteFunction(element._id)}}>
         {<img src="/delete.svg" style={{width:"20px", height:"20px"}}/>} </button>
         </div>
  </div>
  
  
  </div>
     
    ))}
    </div>
  )}
</div>

   <div>
   <Link href="/dashboard/create" type="button" className="btn btn-warning" style={{marginLeft:"1200px",cursor:'pointer'}}>Add</Link></div>    
<div
  style={{
    position:"relative",top: "20px",left: "0", backgroundColor: "#70d5f7ff",color: "#000000ff",textAlign: "center",padding: "20px 0",width: "100%",height: "60px"}}
>&copy; 2025 Blogify. All rights reserved.
</div>

</div>
  )
}
