const express = require("express");
const path = require("path");
const multer = require("multer");

// const upload = multer({ dest: 'uploads/' })
const app = express();
const PORT = 8000;

// file is the user uploaded file, cb is callback ,cb has two parameters first is for error and second is for the destination to store the uploaded file
// for the second function the cb has error and filename parameter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

app.get("/", (req, res) => {
  res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
