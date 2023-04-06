const express = require("express");
const errorHandler = require("./middleware/errorMiddlewware");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

// allow to send raw json
app.use(express.json())
// to accept url encoded form
app.use(express.urlencoded({extended:false}));

// end-points
//routes
app.get("/", (req, res) => {
  // you can .json and .send
  res.status(200).json({ message: "Hello" });
});

// routes
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server started", PORT);
});
