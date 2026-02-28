import express from "express";
import fs from "fs";
import qr from "qr-image";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ensure qrs folder exists
const qrFolder = path.join(process.cwd(), "qrs");
if (!fs.existsSync(qrFolder)) {
  fs.mkdirSync(qrFolder);
}

app.use("/qrs", express.static(qrFolder));

app.post("/api/qr", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const fileName = `qr-${Date.now()}.png`;
  const filePath = path.join(qrFolder, fileName);

  const qr_png = qr.image(url, { type: "png" });
  const writeStream = fs.createWriteStream(filePath);

  qr_png.pipe(writeStream);

  writeStream.on("finish", () => {
    res.json({
      qrImage: `/qrs/${fileName}`
    });
  });

  writeStream.on("error", (err) => {
    console.error("File write error:", err);
    res.status(500).json({ error: "QR generation failed" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});