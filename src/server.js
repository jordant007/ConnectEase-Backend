const express = require("express");
const contactRoutes = require("./routes/contact.js");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000 || process.env.PORT;
const dotenv = require("dotenv");
const authRouter = require("../src/routes/auth.js");
const cors = require("cors")
const fileUpload = require("express-fileupload");
const categoryRouter = require("./routes/category.js"); 
const stkRoute = require ("./routes/stk.js")

dotenv.config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
// API Routes
app.get("/", (req, res) => {
  res.json({ message: "ConnectEase API" });
  console.log(res);
});

app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRouter);


app.use("/api/category", categoryRouter);
app.use("/api/mpesa/stk",stkRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT} and DB is connected`
      );
    });
  })
  .catch((err) => console.log(err));
