export default function CreateBlog() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
      
        <a href="/" className="navbar-brand fw-bold fs-4">
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
              <a className="nav-link active" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
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
    <div className="mt-5 ms-5 d-flex justify-content-center">
    <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style= {{height: "300px", width: "600px"}}></textarea>
  <label htmlFor="floatingTextarea2">Comments</label>
  </div>
</div>
</div>
  );
}
