export default function CreateBlog() {
  return (
    <div style={{backgroundColor:"#289dc4ff"}}>
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{backgroundColor:"#70d5f7ff", color: "#000000ff"}}>
  
      <div className="container-fluid">
      
        <a href="/" className="navbar-brand fw-bold fs-4" style={{color: "#000000ff"}}>
          My Blog
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
      <input className="bg-primary-subtle  ps-2" placeholder="Catagory" style={{border:"none"}}/>
      </div>
  <textarea className="form-control p-3 mb-2 bg-primary-subtle text-warning-emphasis" placeholder="Write here" style= {{height: "300px", width: "600px", border: "none"}}></textarea>

  <div className="d-flex justify-content-end">
  <button type="button" className="btn  my-1 bg-primary-subtle">Add</button>
  </div>
  </div>
  
</div>
</div>
<div className="mt-4"style={{backgroundColor:"#70d5f7ff", color: "#000000ff", textAlign: "center", padding: "33px 0", maxWidth:"100%", height:"81px"}}>
  &copy; 2025 My Blog. All rights reserved.
</div>
</div>
  );
}
