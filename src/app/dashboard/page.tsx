"use client";

import { useEffect, useState } from "react";
import styles from "./DashBoard.module.css";

interface Post {
  _id: string;
  title: string;
  content: string;
}

export default function DashBoard() {
  const [data, setData] = useState<Post[]>([]);
  const [searchData, setSearchData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts", { cache: "no-store" });
        const json = await res.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filtered = data.filter((post) =>
      post.title.toLowerCase().includes(searchData.toLowerCase())
    );

    if (filtered.length > 0) {
      setData(filtered);
    } else {
      alert("The searched content does not exist.");
    }

    setSearchData("");
  };

  
  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (json.success) {
        setData((prev) => prev.filter((post) => post._id !== id));
      } else {
        alert("Failed to delete post: " + json.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#289dc4ff", minHeight: "100vh" }}>
     
      <nav
        className="navbar navbar-expand-lg"
        data-bs-theme="dark"
        style={{ backgroundColor: "#70d5f7ff", color: "#000" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="/" style={{ color: "#000" }}>
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
                <a className="nav-link active" href="/" style={{ color: "#000" }}>
                  Home
                </a>
              </li>
            </ul>

            
            <form className="d-flex me-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={searchData}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
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

   
      <div className={styles.containerholder} style={{ minHeight: "438px", padding: "20px" }}>
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : data.length === 0 ? (
          <p style={{ color: "#fff" }}>No posts available.</p>
        ) : (
          <div className={styles.containerhold} style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {data.map((post) => (
              <div
                key={post._id}
                className="card border-warning mb-3"
                style={{ maxWidth: "20rem", maxHeight: "16rem", overflow: "auto" }}
              >
                <div className="card-header" style={{ color: "#000" }}>
                  {post.title}
                </div>
                <div className="card-body">
                  <p className="card-text" style={{ color: "#000" }}>
                    {post.content}
                  </p>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
                    <button className="btn btn-sm">
                      <img src="/edit.svg" style={{ width: "20px", height: "20px" }} />
                    </button>
                    <button className="btn btn-sm" onClick={() => deletePost(post._id)}>
                      <img src="/delete.svg" style={{ width: "20px", height: "20px" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ textAlign: "right", padding: "20px" }}>
        <a href="/dashboard/create" className="btn btn-warning">
          Add
        </a>
      </div>

    
      <div
        style={{
          backgroundColor: "#70d5f7ff",
          color: "#000",
          textAlign: "center",
          padding: "20px 0",
          width: "100%",
          height: "60px",
        }}
      >
        &copy; 2025 Blogify. All rights reserved.
      </div>
    </div>
  );
}
