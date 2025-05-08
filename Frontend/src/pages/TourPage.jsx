"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Swal from "sweetalert2";  // استيراد مكتبة SweetAlert2

// تعريف reviews قبل استخدامه
const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    date: "February 2024",
    comment:
      "Absolutely incredible experience! The mountain views were breathtaking and our guide was extremely knowledgeable. Highly recommend this tour!",
    avatar:
      "https://images.pexels.com/photos/31853121/pexels-photo-31853121.jpeg",
  },
  {
    name: "Michael Chen",
    rating: 4,
    date: "January 2024",
    comment:
      "Great tour overall. The photography workshops were particularly helpful. Would have loved more time at some locations.",
    avatar:
      "https://images.pexels.com/photos/31848987/pexels-photo-31848987.jpeg",
  },
  {
    name: "Emma Wilson",
    rating: 5,
    date: "December 2023",
    comment:
      "Perfect mix of adventure and culture. The local village visits were a highlight. Our group had amazing chemistry!",
    avatar:
      "https://images.pexels.com/photos/31869537/pexels-photo-31869537.jpeg",
  },
];

function TourPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [participants, setParticipants] = useState(1);
  const [totalPrice, setTotalPrice] = useState(599);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const reviewsPerPage = 2;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const galleryImages = [
    "https://images.pexels.com/photos/31871797/pexels-photo-31871797.jpeg",
    "https://images.pexels.com/photos/31823677/pexels-photo-31823677.jpeg",
    "https://images.pexels.com/photos/31852926/pexels-photo-31852926.jpeg",
    "https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg",
  ];

  const tourProgram = [
    { day: "Day 1", title: "Arrival & Welcome", description: "Arrive in Zurich, transfer to hotel, welcome dinner" },
    { day: "Day 2", title: "Mountain Trek", description: "Guided hike through scenic Alpine trails, photography workshop" },
    { day: "Day 3", title: "Village Experience", description: "Visit traditional mountain villages, local cheese making demonstration" },
    { day: "Day 4", title: "Peak Adventure", description: "Cable car to summit, panoramic views, glacier walk" },
    { day: "Day 5", title: "Lake & Valley", description: "Lake cruise, valley exploration, evening fondue dinner" },
    { day: "Day 6", title: "Cultural Day", description: "Historic town tour, local crafts workshop, farewell celebration" },
    { day: "Day 7", title: "Departure", description: "Breakfast, free time for shopping, departure transfers" },
  ];

  const pagedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    setTotalPrice(participants * 599);
  }, [participants]);

  function updateParticipants(num) {
    setParticipants(Math.max(1, participants + num));
  }

  // Modal Component
  const BookingModal = ({ onClose }) => {
    const handleConfirmBooking = () => {
      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed!',
        text: 'Your booking has been confirmed. You will receive a confirmation notification shortly.',
        confirmButtonText: 'Okay',
      }).then(() => {
        onClose(); // إغلاق المودال بعد عرض التنبيه
      });
    };

    return (
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header">
              <h5 className="modal-title">Booking Summary</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p><strong>Date:</strong> 2024-06-01</p>
              <p><strong>Participants:</strong> 2</p>
              <p><strong>Total:</strong> $1198</p>
              <p>This is a preview. Backend connection will be added later.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmBooking}>Confirm Booking</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      {/* Gallery Section */}
      <header className="position-relative w-100 mb-5" style={{ height: "auto" }}>
        <div className="row g-2" data-aos="fade-up">
          {galleryImages.map((src, index) => (
            <div className="col-6 col-md-3" key={index}>
              <img
                src={src}
                alt={`Gallery ${index}`}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
                className="img-fluid rounded shadow-sm"
                style={{ cursor: "pointer", transition: "transform 0.3s", aspectRatio: "1 / 1" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)") }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)") }
              />
            </div>
          ))}
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={galleryImages[photoIndex]}
            nextSrc={galleryImages[(photoIndex + 1) % galleryImages.length]}
            prevSrc={galleryImages[(photoIndex + galleryImages.length - 1) % galleryImages.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + galleryImages.length - 1) % galleryImages.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % galleryImages.length)
            }
          />
        )}
      </header>

      {/* Two Column Layout */}
      <div className="row gx-5">
        <div className="col-lg-8">
          <section className="mb-5">
            <h2 className="display-4 mb-4">Tour Overview</h2>
            <p className="fs-5">Embark on an unforgettable journey through the majestic Alps. This carefully crafted tour combines breathtaking landscapes, cultural experiences, and outdoor adventures. Perfect for nature enthusiasts and photography lovers.</p>
          </section>

          <section className="mb-5">
            <h2 className="display-4 mb-4">Highlights</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {["Guided mountain hikes", "Local cuisine tasting", "Photography workshops", "Cultural village visits"].map((highlight, index) => (
                <div key={index} className="col">
                  <div className="d-flex align-items-center p-3 rounded-3 bg-light">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white" style={{ width: "40px", height: "40px" }}>✓</div>
                    <span className="ms-3" style={{ fontSize: "18px" }}>{highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-5">
            <h2 className="display-4 mb-4">Tour Program</h2>
            <div className="list-group">
              {tourProgram.map((item, index) => (
                <div key={index} className="list-group-item p-4">
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-primary text-white">{item.day}</span>
                    <h5 className="mb-0">{item.title}</h5>
                  </div>
                  <p className="text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-lg-4">
          <section className="mb-5">
            <h2 className="display-6 mb-4">Book This Tour</h2>
            <form className="bg-white p-4 rounded-3 shadow">
              <div className="mb-4">
                <label htmlFor="tour-date" className="form-label">Select Date</label>
                <input
                  id="tour-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="participants-count" className="form-label">Participants</label>
                <div className="d-flex align-items-center gap-3">
                  <button type="button" onClick={() => updateParticipants(-1)} className="btn btn-outline-secondary"> - </button>
                  <span id="participants-count" className="fs-4">{participants}</span>
                  <button type="button" onClick={() => updateParticipants(1)} className="btn btn-outline-secondary"> + </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
                  <span>Total Price:</span>
                  <span>${totalPrice}</span>
                </div>
                <button
                  type="button"
                  className="w-100 btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  Book Now
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>

      {showModal && <BookingModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default TourPage;
