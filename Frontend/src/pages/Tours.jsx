import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function Packages() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    destination: "",
    priceMin: "",
    priceMax: "",
    departDate: "",
  });

  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    console.log("Search with filters:", filters);
    // هنا تقدر تبعت القيم إلى API باستخدام axios مثلاً
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const packages = [
    {
      id: 1,
      name: "Thailand",
      img: "assets/img/package-1.jpg",
      price: 149.0,
      packaging: 20,
      rating: 4.5,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
    {
      id: 2,
      name: "Indonesia",
      img: "assets/img/package-2.jpg",
      price: 139.0,
      packaging: 35,
      rating: 4.8,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
    {
      id: 3,
      name: "Malaysia",
      img: "assets/img/package-3.jpg",
      price: 189.0,
      packaging: 12,
      rating: 4.1,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
    {
      id: 3,
      name: "Malaysia",
      img: "assets/img/package-3.jpg",
      price: 189.0,
      packaging: 12,
      rating: 4.1,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
    {
      id: 3,
      name: "Malaysia",
      img: "assets/img/package-3.jpg",
      price: 189.0,
      packaging: 12,
      rating: 4.1,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
    {
      id: 3,
      name: "Malaysia",
      img: "assets/img/package-3.jpg",
      price: 189.0,
      packaging: 12,
      rating: 4.1,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
    {
      id: 3,
      name: "Malaysia",
      img: "assets/img/package-3.jpg",
      price: 189.0,
      packaging: 12,
      rating: 4.1,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
    {
      id: 3,
      name: "Malaysia",
      img: "assets/img/package-3.jpg",
      price: 189.0,
      packaging: 12,
      rating: 4.1,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
    {
      id: 3,
      name: "Malaysia",
      img: "assets/img/package-3.jpg",
      price: 189.0,
      packaging: 12,
      rating: 4.1,
      description:
        "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos",
    },
  ];

  // الترتيب
  let sortedPackages = [...packages];
  if (sortBy === "priceAsc") {
    sortedPackages.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceDesc") {
    sortedPackages.sort((a, b) => b.price - a.price);
  } else if (sortBy === "packagingDesc") {
    sortedPackages.sort((a, b) => b.packaging - a.packaging);
  } else if (sortBy === "ratingDesc") {
    sortedPackages.sort((a, b) => b.rating - a.rating);
  }

  const itemsPerPage = 3;
  const offset = currentPage * itemsPerPage;
  const currentItems = sortedPackages.slice(offset, offset + itemsPerPage);

  return (
    <div>
      {/* Hero Header */}
      <div
        className="position-relative text-white mb-5"
        style={{ minHeight: "60vh" }}
      >
        <img
          src="/assets/img/Destinations.jpg"
          alt="Hero Background"
          className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
          style={{ zIndex: 1 }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 123, 255, 0.4), rgba(0, 0, 0, 0.7))",
            zIndex: 2,
          }}
        ></div>
        <div
          className="position-absolute top-50 start-50 translate-middle text-center"
          style={{ zIndex: 3 }}
        >
          <h1 className="display-3 fw-bold text-white mb-3 animate__animated animate__fadeInDown">
            Discover Your Next Adventure
          </h1>
          <p className="lead animate__animated animate__fadeInUp animate__delay-1s">
            Handpicked travel packages tailored just for you.
          </p>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <a href="/" className="text-white-50">
                  Home
                </a>
              </li>
              <li
                className="breadcrumb-item active text-white"
                aria-current="page"
              >
                Packages
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="container mb-5 p-4 bg-light rounded shadow">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Search</label>
            <input
              type="text"
              className="form-control"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search packages..."
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Adventure">Adventure</option>
              <option value="Relax">Relax</option>
              <option value="Cultural">Cultural</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Destination</label>
            <input
              type="text"
              className="form-control"
              name="destination"
              value={filters.destination}
              onChange={handleFilterChange}
              placeholder="e.g. Thailand"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Price Min (DZD)</label>
            <input
              type="number"
              className="form-control"
              name="priceMin"
              value={filters.priceMin}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Price Max (DZD)</label>
            <input
              type="number"
              className="form-control"
              name="priceMax"
              value={filters.priceMax}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3 mt-3">
            <label className="form-label">Depart Date</label>
            <input
              type="date"
              className="form-control"
              name="departDate"
              value={filters.departDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3 mt-3">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="packagingDesc">Most Packaged</option>
              <option value="ratingDesc">Highest Rated</option>
            </select>
          </div>
          <div className="col-md-2 mt-3">
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Packages
            </h6>
            <h1 className="mb-5">Awesome Packages</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {currentItems.map((pkg) => (
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                key={pkg.id}
                data-wow-delay="0.1s"
              >
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={pkg.img} alt={pkg.name} />
                  </div>
                  <div className="d-flex border-bottom">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-map-marker-alt text-primary me-2" />
                      {pkg.name}
                    </small>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-box text-primary me-2" />
                      {pkg.packaging} Packaging
                    </small>
                  </div>
                  <div className="text-center p-4">
                    <h3 className="mb-0">${pkg.price.toFixed(2)}</h3>
                    <div className="mb-3">
                      {Array.from({ length: 5 }, (_, i) => (
                        <small
                          key={i}
                          className={`fa fa-star ${i < Math.round(pkg.rating) ? "text-primary" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p>
                      <p>{pkg.description}</p>
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <a
                        href="#"
                        className="btn btn-sm btn-primary px-3 border-end"
                        style={{ borderRadius: "30px 0 0 30px" }}
                      >
                        Read More
                      </a>
                      <a
                        href="#"
                        className="btn btn-sm btn-primary px-3"
                        style={{ borderRadius: "0 30px 30px 0" }}
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-5">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(sortedPackages.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;
