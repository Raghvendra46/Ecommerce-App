import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import AdminMenu from "../../layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Form/CategoryForm";
import { Modal } from "antd";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { environment } from "../../../environment";

const CreateCategory = () => {
  const apiUrl = environment.apiUrl;

  const [categories, setCategories] = useState();
  const [name, setName] = useState();
  const [visible, setVisible] = useState();
  const [selected, setSelected] = useState();
  const [updatedName, setUpdatedName] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} has been created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating category");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching Categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${apiUrl}/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${apiUrl}/category/delete-category/${pId}`
      );
      if (data?.success) {
        toast.success("Category deleted successfully");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th scope="col" style={{ padding: "10px" }}>
                      Name
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td style={{ padding: "10px" }}>{c.name}</td>
                      <td
                        style={{
                          padding: "10px",
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                          style={{
                            marginRight: "10px",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }} // Adjust the margin for spacing
                        >
                          <MdModeEditOutline />
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                          style={{
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MdDelete />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
