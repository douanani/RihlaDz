import React from 'react'

function Services() {
  return (
    <div>
 <div
  className="hero-header custom-hero d-flex align-items-center justify-content-center text-center text-white mb-5"
>
  <div className="overlay-green" />
  <div className="z-1 position-relative glass-box animated fadeInDown">
    <h1 className="display-3 mb-3">Services</h1>
    <p className="lead fst-italic">Your adventure starts here – discover & plan with ease!</p>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb justify-content-center">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        <li className="breadcrumb-item text-white active" aria-current="page">
          Services
        </li>
      </ol>
    </nav>
  </div>
</div>

      {/* Service Start */}
      <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Services
      </h6>
      <h1 className="mb-5">Our Services</h1>
    </div>
    <div className="row g-4">
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="service-item rounded pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-globe text-primary mb-4" />
            <h5>Verified Travel Programs</h5>
            <p>
              Browse a wide selection of trusted travel programs offered by certified agencies and adventure clubs.
            </p>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="service-item rounded pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-hotel text-primary mb-4" />
            <h5>Create Your Traveler Profile</h5>
            <p>
              Sign up as a traveler, personalize your preferences, and choose trips that match your interests.
            </p>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
        <div className="service-item rounded pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-user text-primary mb-4" />
            <h5>Agency & Club Dashboard</h5>
            <p>
              A dashboard for agencies and clubs to easily publish, update, and manage their tour programs.
            </p>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
        <div className="service-item rounded pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-cog text-primary mb-4" />
            <h5>Real-Time Booking</h5>
            <p>
              Instantly book your spot or send a request for more info—no delays, just smooth planning.
            </p>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="service-item rounded pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-filter text-primary mb-4" />
            <h5>Customized Filter</h5>
            <p>
              Use filters to find trips based on location, Depart Date and duration.
            </p>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="service-item rounded pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-star text-primary mb-4" />
            <h5>Reviews & Ratings</h5>
            <p>
              Travelers can leave feedback and rate their experiences, helping others choose the best programs with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    {/* Service End */}
    </div>
  )
}

export default Services