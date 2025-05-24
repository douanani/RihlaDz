import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const today = new Date().toISOString().split("T")[0];

const TourList = () => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    date: "",
    duration: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  const fetchTours = async (page = 1) => {
    setLoading(true); // نزيدها هنا
    try {
      const res = await axios.get("http://localhost:8000/api/tours", {
        params: {
          keyword: filters.keyword,
          location: filters.location,
          date: filters.date,
          duration: filters.duration,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          page: page,
        },
      });
      setTours(res.data.data);
      setPageCount(res.data.last_page);
      setCurrentPage(res.data.current_page - 1);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    } finally {
      setLoading(false); // نزيدها هنا
    }
  };

  useEffect(() => {
    fetchTours(1);
    setCurrentPage(0); // نرجع لأول صفحة بعد تغيير الفلتر
  }, [filters]);
  useEffect(() => {
    // جلب البيانات عند تحميل الكومبوننت
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        setCategories(response.data); // تخزين الفئات
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  const currentTours = tours; // الباك ديجا عاطيك الصفحة اللي طلبتها

  const handlePageClick = (data) => {
    fetchTours(data.selected + 1); // selected is 0-indexed
  };

  return (
    <div className="container py-5">
      {/* ✅ صندوق البحث مع تصميم عصري */}
      <div
        className="search-box p-4 rounded-4 shadow-lg mx-auto mb-5"
        style={{ backgroundColor: "#f8f9fa", border: "1px solid #e0e0e0" }}
        data-aos="fade-up"
      >
        <div className="row g-3">
          {/* Search Keyword */}
          <div
            className="col-12 col-md-3"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            <input
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Search by keyword..."
              value={filters.keyword}
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value })
              }
            />
          </div>

          {/* Destination */}
          <div
            className="col-12 col-md-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <select
              className="form-select rounded-pill shadow-sm"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">Location</option>
              {[
                "Adrar",
                "Chlef",
                "Laghouat",
                "Oum El Bouaghi",
                "Batna",
                "El Meniaa",
              ].map((wilaya, index) => (
                <option
                  key={index}
                  value={wilaya}
                >{`${index + 1} - ${wilaya}`}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div
            className="col-12 col-md-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <input
              type="date"
              className="form-control rounded-pill shadow-sm"
              min={today}
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>

          {/* Duration */}
          <div
            className="col-12 col-md-2"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <select
              className="form-select rounded-pill shadow-sm"
              value={filters.duration}
              onChange={(e) =>
                setFilters({ ...filters, duration: e.target.value })
              }
            >
              <option value="">Duration</option>
              <option>1 day</option>
              <option>2 days</option>
              <option>1 week</option>
            </select>
          </div>

          {/* Category */}
          <div
            className="col-12 col-md-2"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <select
              className="form-select rounded-pill shadow-sm"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {/* Min Price */}
          <div
            className="col-6 col-md-2"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <input
              type="number"
              className="form-control rounded-pill shadow-sm"
              placeholder="Min Price (DA)"
              min="0"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
          </div>

          {/* Max Price */}
          <div
            className="col-6 col-md-2"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <input
              type="number"
              className="form-control rounded-pill shadow-sm"
              placeholder="Max Price (DA)"
              min="0"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>

          {/* Max People 
          <div
            className="col-6 col-md-2"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <input
              type="number"
              className="form-control rounded-pill shadow-sm"
              placeholder="Max People"
              min="1"
            />
          </div>
          */}

          {/* Search Button */}
          <div
            className="col-12 col-md-2"
            data-aos="fade-up"
            data-aos-delay="550"
          >
            <button
              className="btn btn-outline-secondary w-100 fw-bold rounded-pill shadow-sm mt-2"
              onClick={() =>
                setFilters({
                  keyword: "",
                  location: "",
                  date: "",
                  duration: "",
                  category: "",
                  minPrice: "",
                  maxPrice: "",
                })
              }
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          AVAILABLE TOURS
        </h6>
        <h1 className="mb-5">Popular Destination</h1>
      </div>
      {/* ✅ لودر تحميل */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "4rem", height: "4rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : currentTours.length === 0 ? (
        // ✅ حالة عدم وجود نتائج
        <div className="text-center py-5">
          <h5 className="text-muted">😕 No tours found.</h5>
        </div>
      ) : (
        <>
          {/* ✅ عرض البطاقات */}
          <div className="row g-4">
            {currentTours.map((tour, index) => (
              <div
                key={tour.id}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`${0.2 + (index % 3) * 0.1}s`}
              >
                <div
                  className="package-item border rounded-4 overflow-hidden shadow-sm"
                  style={{
                    backgroundColor: "#ffffff",
                    transition: "0.3s",
                    height: "100%",
                  }}
                >
                  <div
                    className="text-center text-white py-2"
                    style={{ backgroundColor: "#86B817" }}
                  >
                    <h5 className="mb-0">{tour.title}</h5>
                  </div>

                  <div className="overflow-hidden text-center">
                    <img
                      className="img-fluid"
                      src={`http://localhost:8000/storage/images/${tour.thumbnail}`}
                      alt={tour.title}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderBottom: "1px solid #ddd",
                      }}
                    />
                  </div>

                  <div className="d-flex border-bottom bg-light">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-map-marker-alt text-primary me-2" />
                      {tour.location}
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-calendar-alt text-primary me-2" />
                      {tour.duration} days
                    </small>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-user text-primary me-2" />
                      {tour.max_people} Person
                    </small>
                  </div>

                  <div className="text-center p-4">
                    <h3 className="mb-0 text-primary">{tour.price} DA</h3>
                    <div className="mb-3">
                      {[...Array(5)].map((_, i) => (
                        <small key={i} className="fa fa-star text-warning" />
                      ))}
                    </div>
                    <p className="text-muted small">
                      {tour.description?.slice(0, 100)}...
                    </p>

                    <div className="d-flex justify-content-center mb-2">
                      <Link
                        to={`/tourDetails/${tour.id}`}
                        className="btn btn-outline-primary btn-sm px-3 border-end"
                        style={{ borderRadius: "30px 0 0 30px" }}
                      >
                        Read More
                      </Link>
                      <a
                        href="#"
                        className="btn btn-primary btn-sm px-3"
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

          {/* ✅ ترقيم الصفحات */}
          <div className="d-flex justify-content-center mt-5">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousLabel="«"
              nextLabel="»"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              disabledClassName="disabled"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TourList;
