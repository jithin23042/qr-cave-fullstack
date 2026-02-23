import { motion } from "framer-motion";
import { ArrowRight, QrCode, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Paste your link, get a QR code in milliseconds. No signup required.",
  },
  {
    icon: Shield,
    title: "Reliable & Clean",
    description: "High-resolution codes that scan perfectly on every device.",
  },
  {
    icon: QrCode,
    title: "Download & Share",
    description: "Export as PNG and use anywhere — print, digital, or social.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <QrCode className="w-7 h-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">QRForge</span>
        </div>
        <Button variant="heroOutline" size="sm" onClick={() => navigate("/generate")}>
          Get Started
        </Button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <section className="flex flex-col items-center text-center pt-20 md:pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Free. Fast. No signup.</span>
            </div>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] max-w-4xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            Turn every interaction{" "}
            <span className="text-gradient-primary">into an action</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Generate beautiful QR codes from any link in seconds. Bridge the physical and digital world effortlessly.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <Button variant="hero" size="lg" className="text-base px-8" onClick={() => navigate("/generate")}>
              Create QR Code <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          {/* Floating QR illustration */}
          <motion.div
            className="mt-20 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-8 md:p-12 glow-primary-sm animate-float">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 25 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-4 h-4 md:w-6 md:h-6 rounded-sm ${
                      [0,1,2,4,5,6,8,10,12,14,16,18,20,22,23,24].includes(i)
                        ? "bg-primary/80"
                        : "bg-muted/30"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.03 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="pb-32">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="glass rounded-xl p-6 group hover:border-primary/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                <feature.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
