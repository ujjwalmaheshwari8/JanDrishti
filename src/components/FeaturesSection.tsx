import { motion } from "framer-motion";
import { Brain, MapPin, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Text Analysis",
    desc: "NLP-powered analysis classifies citizen complaints, detects sentiment, and extracts key issues automatically.",
  },
  {
    icon: MapPin,
    title: "Micro-Level Mapping",
    desc: "Every complaint is geo-tagged and mapped to its exact booth location for granular tracking.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Live dashboards show complaint trends, category breakdowns, and resolution rates across all booths.",
  },
  {
    icon: Shield,
    title: "Transparent Admin",
    desc: "Full audit trail of complaints, responses, and resolutions for public accountability.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ textWrap: "balance" }}>
            Why Booth-Level Analytics Matter
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Bridging the gap between citizen complaints and government action
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card-glow rounded-xl p-6 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
