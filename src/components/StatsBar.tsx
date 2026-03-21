import { motion } from "framer-motion";
import { MapPin, Eye, Target, Activity } from "lucide-react";

const stats = [
  { icon: MapPin, value: "9", label: "Booths Monitored" },
  { icon: Eye, value: "70+", label: "Issues Tracked" },
  { icon: Target, value: "3", label: "Blocks Covered" },
  { icon: Activity, value: "94%", label: "AI Accuracy" },
];

const StatsBar = () => {
  return (
    <section className="stats-gradient py-12 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <stat.icon className="w-5 h-5 text-primary mb-2" />
              <span className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">{stat.value}</span>
              <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
