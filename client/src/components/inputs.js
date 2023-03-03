import React, { useState } from "react";

function Editor({ renderMyData }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <>
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
    </>
  );
}

export default Editor;
