"use client";
import React, { useEffect ,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // مكتبة لعرض رسائل منبثقة جميلة
import AOS from "aos"; // مكتبة للأنيميشن عند التمرير
import "aos/dist/aos.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Modal,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// ✅ بطاقة إحصائية تظهر في أعلى اللوحة
const StatCard = ({ title, value, change, period }) => {
  const isPositive = change > 0;

  // نحدد اللون حسب إذا كانت القيمة إيجابية أو سلبية
  const changeColor = isPositive
    ? "text-primary bg-primary-subtle"
    : "text-danger bg-danger-subtle";

  return (
    <div className="card shadow-sm p-3">
      <h6 className="text-muted mb-2">{title}</h6>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fs-3 fw-semibold">{value}</span>
        <span className={`badge rounded-pill ${changeColor}`}>
          {isPositive ? "+" : "-"}
          {change}%
        </span>
      </div>
      <small className="text-secondary">{period}</small>
    </div>
  );
};

// ✅ دالة تأكيد الحذف مع SweetAlert
const handleDelete = (name) => {
  Swal.fire({
    title: `Are you sure you want to delete ${name}?`,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
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

// ✅ دالة تأكيد التفعيل مع SweetAlert
const handleConfirm = (name) => {
  Swal.fire({
    title: `Confirm ${name}?`,
    text: "This will activate the agency.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, confirm it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Confirmed!",
        `${name} has been confirmed successfully.`,
        "success"
      );
      // 💡 تقدر تحدث الحالة مباشرة هنا باستعمال useState لو تحب بدون انتظار الباك
    }
  });
};

// ✅ مكون الجدول القابل لإعادة الاستعمال
const CustomTable = ({ title, columns, rows }) => (
  <div className="card shadow-sm p-3">
    <h5 className="mb-3">{title}</h5>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* نعرض عناوين الأعمدة اللي جايين من props */}
            {columns.map((col, i) => (
              <TableCell key={i}>
                <strong>{col}</strong>
              </TableCell>
            ))}
            <TableCell>
              <strong>Status</strong>
            </TableCell>{" "}
            {/* عمود الحالة */}
            <TableCell>
              <strong>Actions</strong>
            </TableCell>{" "}
            {/* عمود الإجراءات */}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* نكرّر الأسطر حسب بيانات rows */}
          {rows.map((row, i) => {
            const { status, ...displayData } = row; // نفصل الحالة عن باقي البيانات

            return (
              <TableRow key={i}>
                {/* نعرض باقي القيم داخل الصف */}
                {Object.values(displayData).map((val, j) => (
                  <TableCell key={j}>{val}</TableCell>
                ))}

                {/* ✅ عرض الحالة: confirmed باللون الأخضر، pending بالبرتقالي */}
                <TableCell>
                  <span
                    className={`badge rounded-pill ${
                      status === "confirmed"
                        ? "bg-success text-white"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {status}
                  </span>
                </TableCell>

                {/* ✅ أزرار الإجراءات: تأكيد + حذف */}
                <TableCell>
                  <div className="d-flex gap-2">
                    {/* نعرض زر التأكيد فقط إذا كانت الحالة مش confirmed */}
                    {status !== "confirmed" && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleConfirm(row.name)}
                      >
                        Confirm
                      </Button>
                    )}
                    {/* زر الحذف */}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(row.name)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

// ✅ الصفحة الرئيسية للوحة التحكم
const AdminDashboard = () => {
  // 💡 حالة فتح/غلق المودال
  const [openModal, setOpenModal] = useState(false);

  // 💡 حالة بيانات الفورم
 const [newAgency, setNewAgency] = useState({
  name: "",
  type: "",
  email: "",
  phone: "",
});


  // نفعّل مكتبة AOS للأنيميشن عند التمرير
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleOpen = () => setOpenModal(true); // فتح المودال
  const handleClose = () => setOpenModal(false); // غلق المودال

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Agency/Club:", newAgency); // نطبع البيانات في الكونسول
    handleClose();
    setNewAgency({ name: "", type: "", email: "", phone: "" }); // نفرّغ الفورم
  };

  const handleChange = (e) => {
    setNewAgency({ ...newAgency, [e.target.name]: e.target.value }); // تحديث القيم
  };

  // ✅ بيانات البطاقات الإحصائية
  const stats = [
    {
      title: "Total Bookings",
      value: 2456,
      change: 12.5,
      period: "This month",
    },
    { title: "Total Users", value: 1250, change: 22.4, period: "This month" },
    {
      title: "Total Agencies/Clubs",
      value: 45,
      change: 15.8,
      period: "This month",
    },
    {
      title: "Total Revenue",
      value: "$156,420",
      change: 8.2,
      period: "This month",
    },
  ];

  // ✅ أعمدة وأسطر جدول الوكالات/الأندية
  const agencyColumns = ["Agency Name", "Type", "Email", "Phone"];
  const agencyRows = [
    {
      name: "AdventureX",
      type: "Club",
      email: "info@adventurex.com",
      phone: "+213 661 11 11 11",
      status: "pending",
    },
    {
      name: "TravelGo",
      type: "Agency",
      email: "contact@travelgo.dz",
      phone: "+213 662 22 22 22",
      status: "confirmed",
    },
  ];

  // ✅ أعمدة وأسطر جدول السياح
  const touristColumns = ["Profile", "Name", "Location", "Email", "Phone"];
  const touristRows = [
    {
      name: "Sami Lounis",
      location: "Algiers",
      email: "sami.lns@gmail.com",
      phone: "+213 770 88 99 00",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      name: "Yasmine Hadj",
      location: "Oran",
      email: "yasmine.hdj@gmail.com",
      phone: "+213 771 22 33 44",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <main className="bg-light min-vh-100 p-4">
      <div className="container">
        {/* ✅ قسم البطاقات الإحصائية */}
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

        {/* ✅ قسم الجداول */}
        <div className="row g-4">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Agencies/Clubs</h5>
             <Button
  variant="contained"
  color="primary"
  size="small"
  startIcon={<AddIcon />}
  onClick={handleOpen} // لما نضغط، يفتح المودال
>
  Add Agency/Club
</Button>

            </div>

            <CustomTable title="" columns={agencyColumns} rows={agencyRows} />
          </div>

          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">Tourists</h5>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {touristColumns.map((col, i) => (
                        <TableCell key={i}>
                          <strong>{col}</strong>
                        </TableCell>
                      ))}
                      <TableCell>
                        <strong>Actions</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {touristRows.map((tourist, i) => (
                      <TableRow key={i}>
                        {/* صورة السائح */}
                        <TableCell>
                          <img
                            src={tourist.image}
                            alt={tourist.name}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        </TableCell>

                        {/* باقي البيانات */}
                        <TableCell>{tourist.name}</TableCell>
                        <TableCell>{tourist.location}</TableCell>
                        <TableCell>{tourist.email}</TableCell>
                        <TableCell>{tourist.phone}</TableCell>

                        {/* زر الحذف */}
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(tourist.name)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openModal} onClose={handleClose}>
  <Box
    sx={{
      maxWidth: 400,
      bgcolor: "background.paper",
      p: 4,
      m: "100px auto",
      borderRadius: 2,
      boxShadow: 24,
    }}
  >
    <h5 className="mb-3">Add Agency/Club</h5>
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <TextField
        label="Agency/Club Name"
        name="name"
        value={newAgency.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Type (Agency or Club)"
        name="type"
        value={newAgency.type}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Email"
        name="email"
        value={newAgency.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Phone"
        name="phone"
        value={newAgency.phone}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button variant="contained" type="submit" color="success">
        Submit
      </Button>
    </form>
  </Box>
</Modal>

    </main>
  );
};

export default AdminDashboard;
