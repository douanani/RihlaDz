"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const StatCard = ({ title, value, change, period }) => {
  const isPositive = change > 0;
  const changeColor = isPositive ? "text-primary bg-primary-subtle" : "text-danger bg-danger-subtle";

  return (
    <div className="card shadow-sm p-3">
      <h6 className="text-muted mb-2">{title}</h6>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fs-3 fw-semibold">{value}</span>
        <span className={`badge rounded-pill ${changeColor}`}>
          {isPositive ? "+" : "-"}{change}%
        </span>
      </div>
      <small className="text-secondary">{period}</small>
    </div>
  );
};

const handleDelete = (name) => {
  Swal.fire({
    title: `Are you sure you want to delete ${name}?`,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Deleted!",
        `${name} has been deleted successfully.`,
        "success"
      );
    }
  });
};

const CustomTable = ({ title, columns, rows }) => (
  <div className="card shadow-sm p-3">
    <h5 className="mb-3">{title}</h5>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i}><strong>{col}</strong></TableCell>
            ))}
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {Object.values(row).map((val, j) => (
                <TableCell key={j}>{val}</TableCell>
              ))}
              <TableCell>
                <Button variant="contained" color="error" size="small" onClick={() => handleDelete(row.name)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

const AdminDashboard = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const stats = [
    { title: "Total Bookings", value: 2456, change: 12.5, period: "This month" },
    { title: "Total Users", value: 1250, change: 22.4, period: "This month" },
    { title: "Total Agencies/Clubs", value: 45, change: 15.8, period: "This month" },
    { title: "Total Revenue", value: "$156,420", change: 8.2, period: "This month" },
  ];

  const agencyColumns = ["Agency Name", "Email", "Phone"];
  const agencyRows = [
    { name: "AdventureX", email: "info@adventurex.com", phone: "+213 661 11 11 11" },
    { name: "TravelGo", email: "contact@travelgo.dz", phone: "+213 662 22 22 22" },
  ];

  const userColumns = ["Full Name", "Email", "Phone"];
  const userRows = [
    { name: "Ahmed Benzema", email: "ahmed.bz@gmail.com", phone: "+213 669 55 66 77" },
    { name: "Leila Nassim", email: "leila.ns@gmail.com", phone: "+213 665 44 33 22" },
  ];

  return (
    <main className="bg-light min-vh-100 p-4">
      <div className="container">
        {/* Stat Cards */}
        <div className="row g-4 mb-4">
          {stats.map((stat, i) => (
            <div
              className="col-md-6 col-lg-3"
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Tables */}
        <div className="row g-4">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
            <CustomTable title="Tour Agencies" columns={agencyColumns} rows={agencyRows} />
          </div>
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="400">
            <CustomTable title="Users" columns={userColumns} rows={userRows} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
