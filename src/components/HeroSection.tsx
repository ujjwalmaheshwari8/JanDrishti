import { motion } from "framer-motion";
import { BarChart3, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-gradient relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-8"
      >
        <span className="text-xs">⚡</span>
        AI-Powered Governance Platform
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl"
        style={{ textWrap: "balance" }}
      >
        Booth-Level Governance{" "}
        <span className="text-gradient-orange">Intelligence System</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-muted-foreground text-lg max-w-xl mt-6 leading-relaxed"
        style={{ textWrap: "pretty" }}
      >
        Transforming citizen feedback into actionable governance insights. Real-time AI analysis of complaints mapped to every booth.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-center gap-4 mt-10"
      >
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all active:scale-[0.97]"
        >
          View Dashboard
          <BarChart3 className="w-4 h-4" />
        </Link>
        <a
          href="#demo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted/50 transition-all active:scale-[0.97]"
        >
          See Demo Data
          <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
