const express = require("express");
const Contact = require("../model/contact");
const router = express.Router();

router.get("/", async (req, res) => {
  let contacts = await Contact.find();
  if (contacts) {
    return res.status(200).json(contacts);
  }
  res.send({ err: "No Contacts Found" });
});
router.post("/add", async (req, res) => {
  let contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
  });

  try {
    await contact.save();
    res.send({ message: "Saved Successfully" });
  } catch (e) {
    res.send({ err: "Couldn't create Contact" });
  }
});

router.post("/edit", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    res.send({ message: "Updated Successfully" });
  } catch (e) {
    res.send({ err: "Couldn't Update Contact" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.body._id);
    res.send({ message: "Deleted Successfully" });
  } catch (e) {
    res.send({ err: "Couldn't Delete Contact" });
  }
});
module.exports = router;
