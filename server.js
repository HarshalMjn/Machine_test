const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./config/database");
const userRoutes = require("./routes/Auth");
const createRoute = require("./routes/Employe")
const app = express();

const PORT = process.env.PORT || 4000;

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)



// Middleware
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1",createRoute)

// CORS Configuration
app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

dbConnect();

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});