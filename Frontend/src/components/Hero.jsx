import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  const [today, setToday] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setToday(formattedDate);
  }, []);

  const categories = [
    { icon: "🌿", label: "Nature", bg: "bg-success" },
    { icon: "🏛️", label: "Cultural & Historical", bg: "bg-secondary" },
    { icon: "🛌", label: "Leisure & Relaxation", bg: "bg-info" },
    { icon: "🧗", label: "Adventure", bg: "bg-warning" },
    { icon: "🌊", label: "Water", bg: "bg-primary" },
    { icon: "👨‍👩‍👧‍👦", label: "Family", bg: "bg-dark text-white" },
    { icon: "🍽️", label: "Food & Culinary", bg: "bg-danger" },
  ];

  return (
    <div className="hero-section">
      <div className="container text-center py-3">
        <h1 className="display-4 fw-bold text-white mb-4" data-aos="fade-down">
          Discover Algeria, Your Way
        </h1>

        {/* Categories Section */}
       {/*<div
          className="d-flex flex-wrap justify-content-center gap-3 mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {categories.map((item, index) => (
            <div
              key={index}
              className={`d-flex flex-column align-items-center justify-content-center ${item.bg} rounded-4 px-3 py-3 shadow-sm category-item`}
              style={{
                width: '150px',
                height: '110px',
                cursor: 'pointer',
                transition: 'transform 0.3s',
              }}
            >
              <div style={{ fontSize: '24px' }}>{item.icon}</div>
              <small className="fw-semibold mt-2 text-center" style={{ fontSize: '12px' }}>
                {item.label}
              </small>
            </div>
          ))}
        </div>*/}

        {/* Search Box */}
        <div className="search-box p-4 rounded-4 shadow-lg mx-auto" data-aos="fade-up">
          <div className="row g-3">
            <div className="col-12 col-md-2" data-aos="fade-up" data-aos-delay="100">
              <select className="form-select rounded-3 shadow-sm">
                <option>Destination</option>
                <option>Alger</option>
                <option>Oran</option>
                <option>Constantine</option>
              </select>
            </div>

            <div className="col-12 col-md-2" data-aos="fade-up" data-aos-delay="200">
              <input
                type="date"
                className="form-control rounded-3 shadow-sm"
                min={today}
              />
            </div>

            <div className="col-12 col-md-2" data-aos="fade-up" data-aos-delay="300">
              <select className="form-select rounded-3 shadow-sm">
                <option>Duration</option>
                <option>1 day</option>
                <option>2 days</option>
                <option>1 week</option>
              </select>
            </div>

            <div className="col-12 col-md-3" data-aos="fade-up" data-aos-delay="400">
              <select className="form-select rounded-3 shadow-sm">
                <option>Category</option>
                <option>Nature</option>
                <option>Cultural</option>
                <option>Beach</option>
                <option>Adventure</option>
              </select>
            </div>

            <div className="col-12 col-md-3" data-aos="fade-up" data-aos-delay="500">
              <button className="btn w-100 btn-gradient-green text-white fw-bold">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
