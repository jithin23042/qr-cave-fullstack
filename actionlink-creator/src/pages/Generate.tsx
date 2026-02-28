import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Download, ArrowLeft, Link2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Generate = () => {
  const [url, setUrl] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const isValidUrl = (str: string) => {
    try {
      new URL(str.startsWith("http") ? str : `https://${str}`);
      return str.length > 3;
    } catch {
      return false;
    }
  };

  const qrValue = url.startsWith("http") ? url : `https://${url}`;

  const handleGenerate = async () => {
    if (!isValidUrl(url)) return;
    const response = await fetch(`/api/qr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: qrValue }),
    });

    const data = await response.json();
    setQrImage(data.qrImage);
    setGenerated(true);
  };

  const handleDownload = async () => {
  if (!qrImage) {
    console.log("No QR image available");
    return;
  }

  try {
    const response = await fetch(qrImage);
    const blob = await response.blob();

    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = `qr-${Date.now()}.png`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    console.log("Download triggered");
  } catch (error) {
    console.error("Download failed:", error);
  }
};

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-glow" />

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <QrCode className="w-7 h-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            QR Cave
          </span>
        </button>
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-12 md:pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3 text-foreground">
            Generate your <span className="text-gradient-primary">QR Code</span>
          </h1>
          <p className="text-muted-foreground">
            Paste any URL below and get a scannable QR code instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setGenerated(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="https://example.com"
                className="pl-10 bg-background/50 border-border/60 h-12"
              />
            </div>
            <Button
              variant="default"
              className="h-12 px-6"
              onClick={handleGenerate}
              disabled={!isValidUrl(url)}
            >
              Generate
            </Button>
          </div>

          {generated && qrImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="bg-white rounded-xl p-6">
                <img src={qrImage} alt="QR Code" width={200} />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
                <Button
                  variant="hero"
                  className="w-full sm:w-auto gap-2"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4" /> Download PNG
                </Button>
                <Button
                  variant="heroOutline"
                  className="w-full sm:w-auto gap-2"
                  onClick={handleCopyUrl}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Link2 className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground truncate max-w-full">
                {qrValue}
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Generate;