import { motion } from "framer-motion";
import { Zap, PieChart, Crosshair, Eye } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Real-Time Governance Intelligence", desc: "Immediate visibility into citizen issues at the grassroots level." },
  { icon: PieChart, title: "Better Resource Allocation", desc: "Data-driven deployment of government resources where needed most." },
  { icon: Crosshair, title: "Micro-Level Decision Making", desc: "Booth-level granularity enables precise, localized interventions." },
  { icon: Eye, title: "Transparency in Administration", desc: "Public tracking of government response and resolution timelines." },
];

const WhyMattersSection = () => {
  return (
    <section className="py-24 px-4 stats-gradient">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Why This System Matters</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card-glow rounded-xl p-6 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMattersSection;
