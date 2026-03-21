import { motion } from "framer-motion";

const steps = [
  { num: 1, label: "Citizen Text / Social Media" },
  { num: 2, label: "NLP Processing" },
  { num: 3, label: "Sentiment Analysis" },
  { num: 4, label: "Issue Classification" },
  { num: 5, label: "Location Detection" },
  { num: 6, label: "Booth Mapping" },
  { num: 7, label: "Analytics Dashboard" },
];

const PipelineSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold" style={{ textWrap: "balance" }}>
            AI Processing Pipeline
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            How citizen feedback is transformed into governance intelligence
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <div className="pipeline-step rounded-xl px-5 py-4 text-center min-w-[140px] hover:border-primary/30 transition-colors duration-300">
                <span className="text-xs text-primary font-medium block mb-1">Step {step.num}</span>
                <span className="text-sm text-foreground font-medium">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <span className="text-primary hidden md:block">→</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
