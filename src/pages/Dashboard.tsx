import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const categoryData = [
  { name: "Infrastructure", count: 18, fill: "hsl(30, 100%, 50%)" },
  { name: "Water Supply", count: 14, fill: "hsl(200, 80%, 50%)" },
  { name: "Sanitation", count: 12, fill: "hsl(140, 70%, 45%)" },
  { name: "Electricity", count: 10, fill: "hsl(0, 80%, 55%)" },
  { name: "Healthcare", count: 8, fill: "hsl(280, 60%, 55%)" },
  { name: "Education", count: 5, fill: "hsl(50, 90%, 50%)" },
];

const trendData = [
  { day: "Mon", complaints: 8 },
  { day: "Tue", complaints: 12 },
  { day: "Wed", complaints: 15 },
  { day: "Thu", complaints: 9 },
  { day: "Fri", complaints: 18 },
  { day: "Sat", complaints: 11 },
  { day: "Sun", complaints: 6 },
];

const boothData = [
  { booth: "Civil Lines", issues: 12 },
  { booth: "Izzatnagar", issues: 8 },
  { booth: "Subhash Nagar", issues: 15 },
  { booth: "Prem Nagar", issues: 6 },
  { booth: "Delapeer", issues: 10 },
  { booth: "Bhojipura", issues: 9 },
  { booth: "Nawabganj", issues: 4 },
  { booth: "CB Ganj", issues: 7 },
  { booth: "Fatehganj", issues: 11 },
];

const recentComplaints = [
  { id: 1, text: "Road potholes near Booth Subhash Nagar", category: "Infrastructure", status: "Open", priority: "High", booth: "Subhash Nagar" },
  { id: 2, text: "Water supply disruption Prem Nagar", category: "Water Supply", status: "In Progress", priority: "High", booth: "Prem Nagar" },
  { id: 3, text: "Garbage not collected for 3 days", category: "Sanitation", status: "Open", priority: "Medium", booth: "Izzatnagar" },
  { id: 4, text: "Street light not working", category: "Electricity", status: "Resolved", priority: "Low", booth: "Nawabganj" },
  { id: 5, text: "Drainage overflow in CB Ganj", category: "Sanitation", status: "Open", priority: "High", booth: "CB Ganj" },
];

const summaryCards = [
  { label: "Total Complaints", value: "72", icon: BarChart3, change: "+12 this week" },
  { label: "Resolved", value: "38", icon: CheckCircle, change: "52.7% rate" },
  { label: "Pending", value: "24", icon: Clock, change: "8 high priority" },
  { label: "Critical", value: "10", icon: AlertTriangle, change: "3 booths affected" },
];

const statusColor = (s: string) => {
  if (s === "Open") return "text-red-400 bg-red-400/10";
  if (s === "In Progress") return "text-yellow-400 bg-yellow-400/10";
  return "text-green-400 bg-green-400/10";
};

const priorityColor = (p: string) => {
  if (p === "High") return "text-red-400";
  if (p === "Medium") return "text-yellow-400";
  return "text-green-400";
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-8"
          >
            Governance Dashboard
          </motion.h1>

          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {summaryCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card-glow rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{card.label}</span>
                  <card.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold tabular-nums">{card.value}</div>
                <span className="text-xs text-muted-foreground">{card.change}</span>
              </motion.div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Trend line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-glow rounded-xl p-5 lg:col-span-2"
            >
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Weekly Complaint Trend
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 22%)" />
                  <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: "hsl(217, 33%, 17%)", border: "1px solid hsl(215, 28%, 25%)", borderRadius: "8px", color: "#fff", fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="complaints" stroke="hsl(30, 100%, 50%)" strokeWidth={2} dot={{ fill: "hsl(30, 100%, 50%)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Category pie */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-glow rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold mb-4">Issue Categories</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={categoryData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={0}>
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(217, 33%, 17%)",
                      border: "1px solid hsl(215, 28%, 25%)",
                      borderRadius: "8px",
                      padding: "8px"
                    }}
                    itemStyle={{
                      color: "#ffffff",      // This forces the text to be white
                      fontSize: "14px",     // Makes it easier to read
                      fontWeight: "600"
                    }}
                    cursor={{ fill: 'transparent' }} // Removes any gray background highlight
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2">
                {categoryData.map((c) => (
                  <span key={c.name} className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: c.fill }} />
                    {c.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booth bar + complaints table */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card-glow rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Issues by Booth
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={boothData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 22%)" />
                  {/* <XAxis dataKey="booth" stroke="hsl(215, 20%, 65%)" fontSize={12} /> */}
                  <XAxis
                    dataKey="booth"
                    stroke="hsl(215, 20%, 65%)"
                    fontSize={11}
                    interval={0}        // This forces all names (Izzatnagar, etc.) to show
                    angle={-45}         // Tilts them so they don't overlap
                    textAnchor="end"    // Aligns the tilted text properly
                    height={70}         // Adds space at the bottom so the names aren't cut off
                  />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: "hsl(217, 33%, 17%)", border: "1px solid hsl(215, 28%, 25%)", borderRadius: "8px", color: "#fff", fontSize: 12 }}
                  />
                  <Bar dataKey="issues" fill="hsl(30, 100%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card-glow rounded-xl p-5"
            >
              <h3 className="text-sm font-semibold mb-4">Recent Complaints</h3>
              <div className="space-y-3 overflow-auto max-h-[280px]">
                {recentComplaints.map((c) => (
                  <div key={c.id} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{c.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground">{c.category}</span>
                        <span className="text-[10px] text-muted-foreground">• Booth {c.booth}</span>
                        <span className={`text-[10px] font-medium ${priorityColor(c.priority)}`}>{c.priority}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
