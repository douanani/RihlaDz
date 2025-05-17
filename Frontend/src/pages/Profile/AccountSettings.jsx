import React, { useState } from "react";
import { Form, Button, Row, Col, Nav, Tab, Card } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const provinces = [
  { code: "01", name: "Adrar" },
  { code: "02", name: "Chlef" },
  { code: "03", name: "Laghouat" },
  { code: "04", name: "Oum El Bouaghi" },
  { code: "05", name: "Batna" },
  { code: "06", name: "Béjaïa" },
  { code: "07", name: "Biskra" },
  { code: "08", name: "Béchar" },
  { code: "09", name: "Blida" },
  { code: "10", name: "Bouira" },
  { code: "11", name: "Tamanrasset" },
  { code: "12", name: "Tébessa" },
  { code: "13", name: "Tlemcen" },
  { code: "14", name: "Tiaret" },
  { code: "15", name: "Tizi Ouzou" },
  { code: "16", name: "Algiers" },
  { code: "17", name: "Djelfa" },
  { code: "18", name: "Jijel" },
  { code: "19", name: "Sétif" },
  { code: "20", name: "Saïda" },
  { code: "21", name: "Skikda" },
  { code: "22", name: "Sidi Bel Abbès" },
  { code: "23", name: "Annaba" },
  { code: "24", name: "Guelma" },
  { code: "25", name: "Constantine" },
  { code: "26", name: "Médéa" },
  { code: "27", name: "Mostaganem" },
  { code: "28", name: "MSila" },
  { code: "29", name: "Mascara" },
  { code: "30", name: "Ouargla" },
  { code: "31", name: "Oran" },
  { code: "32", name: "El Bayadh" },
  { code: "33", name: "Illizi" },
  { code: "34", name: "Bordj Bou Arréridj" },
  { code: "35", name: "Boumerdès" },
  { code: "36", name: "El Tarf" },
  { code: "37", name: "Tindouf" },
  { code: "38", name: "Tissemsilt" },
  { code: "39", name: "El Oued" },
  { code: "40", name: "Khenchela" },
  { code: "41", name: "Souk Ahras" },
  { code: "42", name: "Tipaza" },
  { code: "43", name: "Mila" },
  { code: "44", name: "Aïn Defla" },
  { code: "45", name: "Naâma" },
  { code: "46", name: "Aïn Témouchent" },
  { code: "47", name: "Ghardaïa" },
  { code: "48", name: "Relizane" },
];

export default function ProfileSettings() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // State for password fields and warning
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  // Handle password change form submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordWarning("Passwords do not match.");
    } else {
      setPasswordWarning("");
      // Proceed with password update logic here
    }
  };

  // State to toggle password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Import Swal at the top of your file:
  // import Swal from "sweetalert2";

  return (
    <div className="container py-5">
      <Card className="shadow-lg">
        <Card.Body>
          <Row>
            {/* Profile Picture */}
            <Col md={4} className="text-center mb-4">
              <img
                src={
                  profileImage ||
                  "https://bootdey.com/img/Content/avatar/avatar1.png"
                }
                className="rounded-circle shadow"
                width="150"
                alt="profile"
              />
              <div className="mt-3">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
            </Col>

            {/* Tabs and Forms */}
            <Col md={8}>
              <Tab.Container defaultActiveKey="settings">
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="settings">Account Settings</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="security">Security</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  {/* Account Settings Tab */}
                  <Tab.Pane eventKey="settings">
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter first name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter last name"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" defaultValue="yourUsername" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Enter phone number"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Province</Form.Label>
                        <Form.Select>
                          {provinces.map((province) => (
                            <option key={province.code}>
                              {province.code} - {province.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  </Tab.Pane>

                  {/* Security Tab */}
                  <Tab.Pane eventKey="security">
                    <h5 className="mb-4">Security Settings</h5>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newPassword !== confirmPassword) {
                          setPasswordWarning("Passwords do not match.");
                        } else {
                          setPasswordWarning("");
                          // Proceed with password update logic here
                          import("sweetalert2").then((Swal) => {
                            Swal.default.fire({
                              icon: "success",
                              title: "Password Updated",
                              text: "Your password has been updated successfully.",
                            });
                          });
                        }
                      }}
                    >
                      <Form.Group
                        className="mb-3"
                        style={{ position: "relative" }}
                      >
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <span
                          onClick={() => setShowCurrentPassword((v) => !v)}
                          style={{
                            position: "absolute",
                            right: 10,
                            top: 38,
                            cursor: "pointer",
                            zIndex: 2,
                          }}
                        >
                          {showCurrentPassword ? (
                            <VisibilityOff
                              fontSize="small"
                              style={{ color: "gray" }}
                            />
                          ) : (
                            <Visibility
                              fontSize="small"
                              style={{ color: "gray" }}
                            />
                          )}
                        </span>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        style={{ position: "relative" }}
                      >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span
                          onClick={() => setShowNewPassword((v) => !v)}
                          style={{
                            position: "absolute",
                            right: 10,
                            top: 38,
                            cursor: "pointer",
                            zIndex: 2,
                          }}
                        >
                          {showNewPassword ? (
                            <VisibilityOff
                              fontSize="small"
                              style={{ color: "gray" }}
                            />
                          ) : (
                            <Visibility
                              fontSize="small"
                              style={{ color: "gray" }}
                            />
                          )}
                        </span>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        style={{ position: "relative" }}
                      >
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          isInvalid={!!passwordWarning}
                        />
                        <span
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          style={{
                            position: "absolute",
                            right: 10,
                            top: 38,
                            cursor: "pointer",
                            zIndex: 2,
                          }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff
                              fontSize="small"
                              style={{ color: "gray" }}
                            />
                          ) : (
                            <Visibility
                              fontSize="small"
                              style={{ color: "gray" }}
                            />
                          )}
                        </span>
                        {passwordWarning && (
                          <Form.Text className="text-danger">
                            {passwordWarning}
                          </Form.Text>
                        )}
                      </Form.Group>

                      <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                          Update Password
                        </Button>
                      </div>
                    </Form>

                    <hr className="my-4" />

                    <div>
                      <p className="mb-2">Forgot your password?</p>
                      <Button
                        variant="danger"
                        href="/forgot-password"
                      >
                        Reset Password
                      </Button>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
