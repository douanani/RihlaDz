import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body d-flex">
          <div className="text-center me-4">
            <img
              src={profileImage || "https://bootdey.com/img/Content/avatar/avatar1.png"}
              className="rounded-circle"
              width="150"
              alt="profile"
            />
            <div className="mt-3">
              <input type="file" onChange={handleImageChange} className="form-control" />
            </div>
          </div>

          <div className="flex-grow-1">
            <ul className="nav nav-tabs mb-3" id="profileTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="settings-tab" data-bs-toggle="tab" href="#settings">Account Settings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="security-tab" data-bs-toggle="tab" href="#security">Security</a>
              </li>
            </ul>

            <div className="tab-content" id="profileTabContent">
              {/* Account Settings Tab */}
              <div className="tab-pane fade show active" id="settings">
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" defaultValue="yourUsername" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" />
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
                  <Button variant="primary" type="submit">Save Changes</Button>
                </Form>
              </div>

              {/* Security Tab */}
              <div className="tab-pane fade" id="security">
                <h5 className="mb-4">Security Settings</h5>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter current password" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm new password" />
                  </Form.Group>
                  <Button variant="primary" type="submit">Update Password</Button>
                </Form>

                <hr className="my-4" />

                <div>
                  <p className="mb-2">Forgot your password?</p>
                  <a href="/forgot-password" className="btn btn-outline-secondary">Reset Password</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
