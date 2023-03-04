import React, { useState } from "react";

function Editor({ renderMyData, owner }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_WEBSITE_URL}/contact/add`
          : "http://localhost:5000/contact/add",
        {
          method: "POST",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            owner,
          }),
        }
      );
      renderMyData(owner);
      setName("");
      setPhone("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <h1>Enter Details</h1>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="mr-3"
          onChange={handleNameChange}
          value={name}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="mr-3"
          maxLength={10}
          minLength={10}
          onChange={handlePhoneChange}
          value={phone}
        />
        <button
          className="btn btn-primary "
          type="submit"
          onClick={handleSubmit}
        >
          <i className="fa fa-fw fa-plus"></i>
          Add
        </button>
      </div>
    </>
  );
}

export default Editor;
