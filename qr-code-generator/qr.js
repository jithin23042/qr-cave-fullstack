import qr from "qr-image";
import fs from "fs";

export function generateQR(url, outputPath) {
  const qr_svg = qr.image(url, { type: "png" });
  qr_svg.pipe(fs.createWriteStream(outputPath));
}