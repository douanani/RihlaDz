import React from 'react'

function About() {
  return (
    <div>
      { /*
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
    <div className="container py-5">
      <div className="row justify-content-center py-5">
        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
          <h1 className="display-3 text-white animated slideInDown">
            About Us
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/Pages">Pages</a>
              </li> 
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>*/}
        
            {/* About Start */}
            <div className="container-xxl py-5">
  <div className="container">
    <div className="row g-5">
      <div
        className="col-lg-6 wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ minHeight: 400 }}
      >
        <div className="position-relative h-100">
          <img
            className="img-fluid position-absolute w-100 h-100"
            src="assets/img/about.jpg"
            alt="About Us"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
        <h6 className="section-title bg-white text-start text-primary pe-3">
          About Us
        </h6>
        <h1 className="mb-4">
          Welcome to <span className="text-primary">RihlaDZ</span>
        </h1>
        <p className="mb-4">
          RihlaDZ is a platform that connects tourists with top travel agencies and adventure clubs across the country. Whether you’re looking for a relaxing getaway or a thrilling outdoor experience, we help you find the perfect trip.
        </p>
        <p className="mb-4">
          Our mission is to make travel planning easy and accessible for everyone. Browse offers, book online, and join exciting programs organized by verified partners.
        </p>
        <div className="row gy-2 gx-4 mb-4">
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Verified Travel Agencies
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Adventure Clubs Access
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Online Booking System
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Wide Range of Activities
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              Secure Payment Methods
            </p>
          </div>
          <div className="col-sm-6">
            <p className="mb-0">
              <i className="fa fa-arrow-right text-primary me-2" />
              24/7 Customer Support
            </p>
          </div>
        </div>
        <a className="btn btn-primary py-3 px-5 mt-2" href="#">
          Learn More
        </a>
      </div>
    </div>
  </div>
</div>

    {/* About End */}
    {/* Team Start */}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Our Team
          </h6>
          <h1 className="mb-5">Meet Our Team</h1>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/team.png" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-twitter" />
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-instagram" />
                </a>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Djilali Ouanani</h5>
                <small>Web Developer</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="assets/img/team.png" alt="" />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: "-19px" }}
              >
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-twitter" />
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-instagram" />
                </a>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Bouchenafa Djaber</h5>
                <small>Web Developer</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Team End */}
    </div>
  )
}

export default About