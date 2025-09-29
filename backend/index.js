const express = require("express");

// instant object

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
// middleware

app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("dis-connected");
  });
// promise  .then , .catch

const schema = mongoose.Schema({
  name: String,
  email: String,
});

const dataSchema = mongoose.model("dataSchema", schema);

app.get("/getData", async (req, res) => {
  try {
    const findtheData = await dataSchema.find();

    res.json(findtheData);
  } catch (err) {
    res.json(err);
  }
});

app.post("/DataAdded", async (req, res) => {
  try {
    const duplicateMail = await dataSchema.findOne({ email: req.body.email });

    if (duplicateMail) return res.json("Email already exists");

    let data = dataSchema({
      ...req.body,
    });

    const saveData = await data.save();

    res.json(saveData);
  } catch (err) {
    res.json(err);
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    const updateData = await dataSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updateData);
  } catch (err) {
    res.json(err);
  }
});
app.delete("/DeleteUser/:id", async (req, res) => {
  try {
    const DeleteData = await dataSchema.findByIdAndDelete(req.params.id);

    res.json(DeleteData);
  } catch (err) {
    res.json(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running port on ${process.env.PORT}`);
});

// get , post , put , delete
