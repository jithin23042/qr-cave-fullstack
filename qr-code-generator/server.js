import express from "express";
import fs from "fs";
import qr from "qr-image";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("frontend"));
app.use("/qrs", express.static("qrs"));

app.post("/api/qr", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const fileName = `qr-${Date.now()}.png`;
  const filePath = path.join("qrs", fileName);

  const qr_png = qr.image(url, { type: "png" });
  qr_png.pipe(fs.createWriteStream(filePath));

  res.json({ qrImage: `/qrs/${fileName}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});