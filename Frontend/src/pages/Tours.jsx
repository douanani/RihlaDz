import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchTours(currentPage);
  }, [currentPage]);

  const fetchTours = async (page = 1) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/tours?page=${page}`);
      setTours(res.data.data);
      setLastPage(res.data.last_page);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>Available Tours</Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(tour => (
          <Card key={tour.id} className="rounded-2xl shadow-md">
  {/* الصورة */}
  {tour.thumbnail && (
    <CardMedia
      component="img"
      height="180"
      image={`http://localhost:8000/storage/images/${tour.thumbnail}`}
      alt={tour.title}
    />
  )}

  {/* المحتوى النصي */}
  <CardContent>
    <Typography variant="h6">{tour.title}</Typography>
    <Typography variant="body2" color="text.secondary">
      {tour.location} | {tour.duration} days | {tour.price} DA
    </Typography>
    <Typography variant="body1" className="mt-2 line-clamp-3">
      {tour.description}
    </Typography>
  </CardContent>
</Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outlined"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Typography variant="body2" className="self-center">
          Page {currentPage} of {lastPage}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Tours;
