import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../layouts/Layout";
import AdminMenu from "../../layouts/AdminMenu";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { environment } from "../../../environment";

const Users = () => {
  const apiUrl = environment.apiUrl;

  const [user, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const headerStyle = {
    marginBottom: "20px",
    marginTop: "10px",
    textAlign: "center",
    color: "#333",
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };
  const tableHeaderStyle = {
    background: "#007bff",
    color: "#fff",
    textAlign: "center",
    padding: "12px",
    border: "1px solid #ddd",
  };
  const tableRowStyle = { backgroundColor: "#f9f9f9" };
  const tableDataStyle = {
    padding: "12px",
    textAlign: "center",
    border: "1px solid #ddd",
  };
  const buttonStyle = { margin: "5px", width: "70px" };
  const paginationButtonStyle = { margin: "5px", padding: "5px 10px" };

  const modalStyle = {
    display: showEditModal ? "block" : "none",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  };
  const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    margin: "100px auto",
  };
  const closeButtonStyle = { float: "right", cursor: "pointer" };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/searchUser`);
      if (response.data.success) {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      }
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Call the fetchUsers function inside useEffect
  }, []);

  const handleEdit = (user) => {
    setSelectedUsers(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUsers(null);
    fetchUsers();
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/user/updateUser/${selectedUsers._id}`,
        formData
      );
      if (response.data.success) {
        setUsers(
          user.map((user) =>
            user._id === selectedUsers._id ? { ...user, ...formData } : user
          )
        );
        toast.success("User Updated successfully");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${apiUrl}/user/deleteUser/${userId}`
        );
        if (response.data.success) {
          toast.success("User deleted successfully");
          fetchUsers();
        }
      } catch (error) {
        console.error("Error deleting user: ", error);
      }
    }
  };

  const handleSearch = () => {
    const filteredUsers = user.filter(
      (user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(searchName.toLowerCase()) &&
        user.phone.toLowerCase().includes(searchPhone.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleSearchReset = () => {
    setSearchName("");
    setSearchEmail("");
    setSearchPhone("");
    setFilteredUsers(user);
    setCurrentPage(1);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
      <div className="m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 style={headerStyle}>Users List</h1>

            <div
              className="search-fields mb-3"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <input
                type="text"
                placeholder="Search by Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="form-control"
                style={{ marginRight: "10px", flex: "1" }}
              />
              <input
                type="text"
                placeholder="Search by Email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="form-control"
                style={{ marginRight: "10px", flex: "1" }}
              />
              <input
                type="text"
                placeholder="Search by Phone"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="form-control"
                style={{ marginRight: "10px", flex: "1" }}
              />

              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>

              <button
                className="btn btn-secondary"
                onClick={handleSearchReset}
                style={{ marginLeft: "10px" }}
              >
                Reset
              </button>
            </div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>S.No</th>
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Email</th>
                  <th style={tableHeaderStyle}>Phone</th>
                  <th style={tableHeaderStyle}>Address</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((user, index) => (
                  <tr key={user._id} style={tableRowStyle}>
                    <td style={tableDataStyle}>
                      {indexOfFirstRecord + index + 1}
                    </td>
                    <td style={tableDataStyle}>{user.name}</td>
                    <td style={tableDataStyle}>{user.email}</td>
                    <td style={tableDataStyle}>{user.phone}</td>
                    <td style={tableDataStyle}>{user.address}</td>
                    <td style={tableDataStyle}>
                      <button
                        className="btn btn-primary"
                        style={{
                          ...buttonStyle,
                          padding: "5px 10px",
                          fontSize: "12px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => handleEdit(user)}
                      >
                        <MdModeEditOutline />
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{
                          ...buttonStyle,
                          padding: "5px 10px",
                          fontSize: "12px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdDelete />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="pagination-controls"
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              <button
                className="btn btn-secondary"
                style={paginationButtonStyle}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-secondary"
                style={paginationButtonStyle}
                onClick={handleNextPage}
                disabled={
                  currentPage ===
                  Math.ceil(filteredUsers.length / recordsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit User Modal */}
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <span style={closeButtonStyle} onClick={handleCloseModal}>
            &times;
          </span>
          <h3>Edit User Details</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
            />
          </div>
          <br />
          <button className="btn btn-success" onClick={handleUpdateUser}>
            Update
          </button>
          &nbsp;
          <button className="btn btn-dark" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
