const express = require("express");
const app = express();
const path = require("path");

// obsluga plikow statycznych
app.use(express.static(path.join(__dirname)));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "dynamic-views"));

// route dla strony glownej
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ladowanie widoku dla pokoju
app.get("/iframe/roomtemplate/:roomName/:roomType", (req, res) => {
  const roomName = req.params.roomName;
  const roomType = req.params.roomType;
  res.render("roomtemplate", { pageName: roomName, roomType: roomType });
});

app.post("/createRoom", (req, res) => {
  const pageName = req.body.title;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
