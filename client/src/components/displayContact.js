import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
function DisplayContact({ contacts, renderMyData, owner }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(-1);

  const handleNameUpdate = (e) => {
    setName(e.target.value);
  };

  const handlePhoneUpdate = (e) => {
    setPhone(e.target.value);
  };
  const handleDelete = async (idToBeDeleted) => {
    try {
      await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_WEBSITE_URL}/contact/delete`
          : "http://localhost:5000/contact/delete",
        {
          method: "POST",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: idToBeDeleted,
          }),
        }
      );
      renderMyData(owner);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_WEBSITE_URL}/contact/edit`
          : "http://localhost:5000/contact/edit",
        {
          method: "POST",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            _id: id,
          }),
        }
      );
      renderMyData(owner);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <table className="table container mt-5 table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((ele, index) => {
            return (
              <tr key={index} className="mt-3">
                <td>{index + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.phone}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleShow();
                      setName(ele.name);
                      setPhone(ele.phone);
                      setId(ele._id);
                    }}
                  >
                    Edit Contact
                  </Button>
                </td>
                <td
                  className="btn btn-danger mt-2"
                  onClick={() => {
                    handleDelete(ele._id);
                  }}
                >
                  {"Delete"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update the details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleNameUpdate}
                value={name}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone"
                maxLength={10}
                minLength={10}
                onChange={handlePhoneUpdate}
                value={phone}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleClose();
              handleEdit(e);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DisplayContact;
