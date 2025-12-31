"use client";

import Link from "next/link";
import styles from "./DashBoard.module.css";
import { useEffect, useState } from "react";
import { title } from "process";
import { useTheme } from "../Theme/page";

export default function DashBoard() {
  const [data, setData] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<string>("");
  const [editedData, setEditedData] = useState({
    title:"",
    content: "",

  })
  const [editId, setEditId] = useState("");

  const {darkMode, toggleTheme}:any  = useTheme();

  useEffect(() => {
    async function BlogPosts() {
      try {
        const result = await fetch("http://localhost:3000/api/posts", {
          cache: "no-store",
        });
        const json = await result.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    BlogPosts();
  }, []);

  function searchTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchData(e.target.value);
  }

  function SearchContent(e: React.ChangeEvent) {
    e.preventDefault();
    const searchContent = data.filter((element) => {
      return element.title.toLowerCase() === searchData.toLowerCase();
    });

    setSearchData("");

    searchContent.length > 0
      ? setData(searchContent)
      : alert("The searched content does not exist.");
  }

  async function DeleteFunction(deleteData: string) {
    try {
      await fetch(`/api/posts/${deleteData}`, { method: "DELETE" });
      setData((prev) => prev.filter((element) => element._id !== deleteData));
    } catch (error) {
      console.error(error);
    }
  }
   async function EditFunction(editId:string, editedData: {
    title: string;
    content: string;
} ) {
    try{
      await fetch(`/api/posts/${editId}`,{
        method:"PATCH",
        headers: {
          "Content-Type" : "application/json"
        },

        body: JSON.stringify(editedData)
      })
      setData((prev)=>(prev.map((element)=>(
        element._id == editId ?  {
          ...element,
          title: editedData.title,
          content: editedData.content,
        }:
        element
      ))))
      alert("The content is edited sucessfully");

    }
    catch(error){
      console.log(error)
    }
  }
   function Toogle(){
  toggleTheme();
  
}

  return (
    <div style={{backgroundColor: darkMode ? "#000000ff":"#289dc4ff", minHeight: "100vh" }}>
     
      <nav
        className="navbar navbar-expand-lg"
        data-bs-theme="dark"
        style={{ backgroundColor: darkMode ? "#000000ff":"#70d5f7ff"}}
      >
        <div className="container-fluid">
          <Link
            href="/"
            className="navbar-brand fw-bold fs-4"
            style={{ color: darkMode ? "#ffffffff" : "#000000ff" }}
          >
            Blogify
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" href="/" style={{ color: darkMode ? "#ffffffff" : "#000000ff"}}>
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
      

            <form className="d-flex me-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                onChange={searchTitle}
                value={searchData}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={SearchContent}
              >
                Search
              </button>
            </form>
            <Link href={"/login"} className="d-flex">
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

      <div className={styles.containerholder} style={{ minHeight: "438px" }}>
        {data.length === 0 ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className={styles.containerhold}>
            {data.map((element, index) => (
             
              <div
                key={index}
                className="card border-warning mb-3"
                style={{
                  maxWidth: "20rem",
                  maxHeight: "16rem",
                  overflow: "auto",
                  position: "relative",
                }}
              >
               <div className="card-body d-flex flex-column">
                 {editId === element._id ? (
                          <input
                            className="form-control"
                            value={editedData.title}
                            onChange={(e) =>
                              setEditedData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <div className="card-header">{element.title}</div>
                        )}
                        {editId === element._id ? (
                            <textarea
                              className="form-control"
                              value={editedData.content}
                              onChange={(e) =>
                                setEditedData((prev) => ({
                                  ...prev,
                                  content: e.target.value,
                                }))
                              }
                            />
                          ) : (
                            <p className="card-text ms-3 mt-2">{element.content}</p>
                          )}


           
                  <div className="d-flex justify-content-end gap-2 mt-auto">
                    <button
                        className="btn btn-sm p-0"
                        onClick={() => {
                          if (editId === element._id) {
                            EditFunction(element._id, editedData);
                            setEditId("");
                          } else {
                            setEditId(element._id);
                            setEditedData({
                              title: element.title,
                              content: element.content,
                            });
                          }
                        }}
                      >
                   

                        {editId === element._id ? <img src="/edited.svg" width={20} height={20} /> : <img src="/edit.svg" width={20} height={20}/>}
                      </button>

                    <button
                      className="btn btn-sm p-0"
                      onClick={() => DeleteFunction(element._id)}
                    >
                      <img src="/delete.svg" width={20} height={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD BUTTON */}
      <div className="text-end me-5">
        <Link href="/dashboard/create" className="btn btn-warning">
          Add
        </Link>
      </div>

      {/* FOOTER */}
      <footer
       
        style={{
    position:"relative",top: "20px",left: "0", backgroundColor: darkMode ? "#000000ff":"#70d5f7ff",color: darkMode ? "#ffffffff" : "#000000ff",textAlign: "center",padding: "20px 0",width: "100%",height: "60px"}}
      >
        &copy; 2025 Blogify. All rights reserved.
      </footer>
    </div>
  );
}

