"use client";
import React from "react";
import {
  Avatar,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Grid,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Fade,
} from "@mui/material";

const StatCard = ({ title, value, change, period }) => {
  const isPositive = change > 0;
  const changeColor = isPositive ? "success.main" : "error.main";
  const sign = isPositive ? "+" : "-";

  return (
    <Fade in timeout={600}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h5" fontWeight={600}>
              {value}
            </Typography>
            <Chip
              label={`${sign}${Math.abs(change)}%`}
              size="small"
              sx={{ color: changeColor, backgroundColor: `${changeColor}20` }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {period}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
};

const DestinationItem = ({ image, name, bookings }) => (
  <Box display="flex" alignItems="center" gap={2}>
    <img
      src={image}
      alt={name}
      style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 12 }}
    />
    <Box>
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {bookings} bookings
      </Typography>
    </Box>
  </Box>
);

const CustomTable = () => {
  const data = [
    {
      bookingId: "B001",
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "+213 661 23 45 67",
      avatar: "https://mdbootstrap.com/img/new/avatars/8.jpg",
      title: "Software engineer",
      status: { label: "Confirmed", color: "success" },
      tourId: "T101",
    },
    {
      bookingId: "B002",
      name: "Alex Ray",
      email: "alex.ray@gmail.com",
      phone: "+213 669 11 22 33",
      avatar: "https://mdbootstrap.com/img/new/avatars/6.jpg",
      title: "Consultant",
      status: { label: "Refused", color: "error" },
      tourId: "T102",
    },
    {
      bookingId: "B003",
      name: "Kate Hunington",
      email: "kate.hunington@gmail.com",
      phone: "+213 660 98 76 54",
      avatar: "https://mdbootstrap.com/img/new/avatars/7.jpg",
      title: "Designer",
      status: { label: "Pending", color: "warning" },
      tourId: "T103",
    },
  ];

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Booking ID</b></TableCell>
            <TableCell><b>Tour ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>Title</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Manage</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.bookingId}</TableCell>
              <TableCell>{row.tourId}</TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar alt={row.name} src={row.avatar} />
                  <Box>
                    <Typography fontWeight={500}>{row.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.email}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>
                <Chip label={row.status.label} color={row.status.color} variant="outlined" />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" color="success" size="small">
                    Accept
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    Refuse
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function AdminDashboard() {
  const stats = [
    { title: "Total Bookings", value: 2456, change: 12.5, period: "This month" },
    { title: "Total Revenue", value: "$156,420", change: 8.2, period: "This month" },
    { title: "Active Destinations", value: 45, change: 15.8, period: "This month" },
    { title: "Total Customers", value: 1250, change: 22.4, period: "This month" },
  ];

  const destinations = [
    {
      image: "https://images.pexels.com/photos/31951185/pexels-photo-31951185.jpeg",
      name: "Bali, Indonesia",
      bookings: 245,
    },
    {
      image: "https://images.pexels.com/photos/31916503/pexels-photo-31916503.jpeg",
      name: "Paris, France",
      bookings: 198,
    },
    {
      image: "https://images.pexels.com/photos/30698887/pexels-photo-30698887.jpeg",
      name: "Dubai, UAE",
      bookings: 156,
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", p: 3 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader title="Booking Analytics" />
            <CardContent>
              <CustomTable />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader title="Popular Destinations" />
            <CardContent>
              <Stack spacing={2}>
                {destinations.map((dest, i) => (
                  <DestinationItem key={i} {...dest} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
