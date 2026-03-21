import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

const sampleComplaints = [
  "Roads are damaged near Booth 101.",
  "Water supply problem in Block B.",
  "Garbage collection not happening in ward 5.",
  "Electricity outage in Booth 303 for 2 days.",
  "New health clinic opened near Booth 201.",
];

type AnalysisResult = {
  sentiment: string;
  category: string;
  location: string;
  priority: string;
  booth: string;
};

const analyzeComplaint = (text: string): AnalysisResult => {
  const lower = text.toLowerCase();
  let sentiment = "Negative";
  let category = "General";
  let priority = "Medium";
  let location = "Unknown";
  let booth = "Unassigned";

  if (lower.includes("opened") || lower.includes("new") || lower.includes("good")) {
    sentiment = "Positive";
    priority = "Low";
  }

  if (lower.includes("road") || lower.includes("damaged")) category = "Infrastructure";
  else if (lower.includes("water") || lower.includes("supply")) category = "Water Supply";
  else if (lower.includes("garbage") || lower.includes("collection")) category = "Sanitation";
  else if (lower.includes("electricity") || lower.includes("outage")) category = "Electricity";
  else if (lower.includes("health") || lower.includes("clinic")) category = "Healthcare";

  const boothMatch = text.match(/Booth\s*(\d+)/i);
  if (boothMatch) {
    booth = `Booth ${boothMatch[1]}`;
    location = `Booth ${boothMatch[1]} Area`;
  }
  const blockMatch = text.match(/Block\s*([A-Z])/i);
  if (blockMatch) location = `Block ${blockMatch[1]}`;
  const wardMatch = text.match(/ward\s*(\d+)/i);
  if (wardMatch) location = `Ward ${wardMatch[1]}`;

  if (lower.includes("outage") || lower.includes("damaged")) priority = "High";

  return { sentiment, category, location, priority, booth };
};

const AIDemoSection = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeComplaint(text));
      setLoading(false);
    }, 1200);
  };

  return (
    <section id="demo" className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Try AI Issue Analysis</h2>
          <p className="text-muted-foreground mt-3">
            Enter a citizen complaint and watch AI process it in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="card-glow rounded-xl p-6"
        >
          {/* Sample chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sampleComplaints.map((c) => (
              <button
                key={c}
                onClick={() => setText(c)}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors truncate max-w-[220px]"
              >
                {c}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a citizen complaint here..."
            className="w-full bg-muted/50 border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze with AI
              </>
            )}
          </button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3"
            >
              {[
                { label: "Sentiment", value: result.sentiment, color: result.sentiment === "Positive" ? "text-green-400" : "text-red-400" },
                { label: "Category", value: result.category, color: "text-primary" },
                { label: "Location", value: result.location, color: "text-blue-400" },
                { label: "Priority", value: result.priority, color: result.priority === "High" ? "text-red-400" : result.priority === "Medium" ? "text-yellow-400" : "text-green-400" },
                { label: "Booth", value: result.booth, color: "text-primary" },
              ].map((item) => (
                <div key={item.label} className="pipeline-step rounded-lg p-3 text-center">
                  <span className="text-xs text-muted-foreground block">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AIDemoSection;
