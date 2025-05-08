import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AOS from 'aos';
import './BookingModal.css';

const BookingModal = ({ tour }) => {
  useEffect(() => {
    AOS.refresh(); // يبقى هذا مفيد إذا راك تستعمل أنيميشن
  }, []);

  return (
    <Modal
      show={true} // المودال ديما ظاهر
      onHide={() => {}} // نحيينا الفنكشن باش ما يغلقش
      centered
      size="lg"
      className="custom-modal"
      backdropClassName="custom-backdrop"
      backdrop={false} // نحيو الخلفية الداكنة
    >
      <div data-aos="zoom-in">
        <Modal.Header closeButton={false}>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{tour.title}</h5>
          <p>{tour.description}</p>
          <ul className="list-group">
            <li className="list-group-item">Destination: {tour.destination}</li>
            <li className="list-group-item">Date: {tour.date}</li>
            <li className="list-group-item">Duration: {tour.duration}</li>
            <li className="list-group-item">Category: {tour.category}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled>
            Cancel
          </Button>
          <Button variant="success" disabled>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default BookingModal;
