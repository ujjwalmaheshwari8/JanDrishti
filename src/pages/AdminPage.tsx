import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Settings, Users, Database, Shield, Plus, Search, Edit2, Trash2,
  CheckCircle, XCircle, Clock, BarChart3, MapPin, Bell, Download,
  Upload, RefreshCw, Eye, ChevronDown
} from "lucide-react";

// Tabs
const tabs = ["Overview", "Complaints", "Users", "Booths", "Settings"] as const;
type Tab = typeof tabs[number];

// Mock data
const complaints = [
  { id: 1, text: "Road potholes near Booth Subhash Nagar", category: "Infrastructure", status: "Open", priority: "High", booth: "Subhash Nagar", date: "2026-03-18", citizen: "Ramesh K." },
  { id: 2, text: "Water supply disruption Prem Nagar", category: "Water Supply", status: "In Progress", priority: "High", booth: "Prem Nagar", date: "2026-03-17", citizen: "Priya S." },
  { id: 3, text: "Garbage not collected for 3 days", category: "Sanitation", status: "Open", priority: "Medium", booth: "Izzatnagar", date: "2026-03-17", citizen: "Amit V." },
  { id: 4, text: "Street light not working", category: "Electricity", status: "Resolved", priority: "Low", booth: "Nawabganj", date: "2026-03-16", citizen: "Sunita D." },
  { id: 5, text: "Drainage overflow in CB Ganj", category: "Sanitation", status: "Open", priority: "High", booth: "CB Ganj", date: "2026-03-15", citizen: "Manoj T." },
  { id: 6, text: "Broken water pipe on main road", category: "Water Supply", status: "In Progress", priority: "High", booth: "Delapeer", date:"2026-03-16", citizen: "Amit S." },
  { id: 7, text: "School building needs repair", category: "Education", status: "Open", priority: "Medium", booth: "302", date: "2026-03-14", citizen: "Deepak J." },
  { id: 8, text: "Health clinic understaffed", category: "Healthcare", status: "Resolved", priority: "Medium", booth: "201", date: "2026-03-13", citizen: "Neha P." },
];

const users = [
  { id: 1, name: "Vikram Singh", email: "vikram@gov.in", role: "Super Admin", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Anjali Sharma", email: "anjali@gov.in", role: "Admin", status: "Active", lastLogin: "5 hours ago" },
  { id: 3, name: "Ravi Kumar", email: "ravi@gov.in", role: "Operator", status: "Active", lastLogin: "1 day ago" },
  { id: 4, name: "Meera Patel", email: "meera@gov.in", role: "Viewer", status: "Inactive", lastLogin: "5 days ago" },
  { id: 5, name: "Suresh Yadav", email: "suresh@gov.in", role: "Operator", status: "Active", lastLogin: "3 hours ago" },
];

const booths = [
  { id: "101", block: "A", location: "Main Market Area", issues: 12, resolved: 7, operator: "Ravi Kumar" },
  { id: "102", block: "A", location: "School Road", issues: 8, resolved: 5, operator: "Ravi Kumar" },
  { id: "103", block: "A", location: "Station Road", issues: 15, resolved: 6, operator: "Suresh Yadav" },
  { id: "201", block: "B", location: "Hospital Lane", issues: 6, resolved: 4, operator: "Suresh Yadav" },
  { id: "202", block: "B", location: "Temple Street", issues: 10, resolved: 7, operator: "Ravi Kumar" },
  { id: "203", block: "B", location: "Park Colony", issues: 9, resolved: 6, operator: "Suresh Yadav" },
  { id: "301", block: "C", location: "Industrial Area", issues: 4, resolved: 3, operator: "Ravi Kumar" },
  { id: "302", block: "C", location: "New Housing", issues: 7, resolved: 4, operator: "Suresh Yadav" },
  { id: "303", block: "C", location: "River Side", issues: 11, resolved: 5, operator: "Ravi Kumar" },
];

const statusBadge = (s: string) => {
  if (s === "Open") return "text-red-400 bg-red-400/10 border-red-400/20";
  if (s === "In Progress") return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
  if (s === "Resolved") return "text-green-400 bg-green-400/10 border-green-400/20";
  if (s === "Active") return "text-green-400 bg-green-400/10 border-green-400/20";
  return "text-muted-foreground bg-muted/30 border-border";
};

const priorityBadge = (p: string) => {
  if (p === "High") return "text-red-400";
  if (p === "Medium") return "text-yellow-400";
  return "text-green-400";
};

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary" />
                Admin Panel
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Manage complaints, users, booths, and system settings</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors active:scale-[0.97]">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors active:scale-[0.97]">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all active:scale-[0.97]">
                <RefreshCw className="w-4 h-4" />
                Sync Data
              </button>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div {...fadeIn} transition={{ delay: 0.05 }} className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Tab content */}
          {activeTab === "Overview" && <OverviewTab />}
          {activeTab === "Complaints" && <ComplaintsTab search={searchQuery} setSearch={setSearchQuery} />}
          {activeTab === "Users" && <UsersTab />}
          {activeTab === "Booths" && <BoothsTab />}
          {activeTab === "Settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

const OverviewTab = () => {
  const overviewCards = [
    { label: "Total Complaints", value: "72", icon: BarChart3, sub: "+12 this week", accent: false },
    { label: "Open Issues", value: "34", icon: XCircle, sub: "47.2% of total", accent: false },
    { label: "Resolved", value: "38", icon: CheckCircle, sub: "52.8% resolution", accent: false },
    { label: "Active Booths", value: "9", icon: MapPin, sub: "3 blocks", accent: true },
    { label: "Active Users", value: "4", icon: Users, sub: "1 inactive", accent: false },
    { label: "Pending Alerts", value: "7", icon: Bell, sub: "3 critical", accent: false },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {overviewCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`card-glow rounded-xl p-5 transition-all duration-300 ${card.accent ? "border-primary/30" : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <card.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold tabular-nums">{card.value}</div>
            <span className="text-xs text-muted-foreground">{card.sub}</span>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-glow rounded-xl p-5"
      >
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { action: "New complaint filed", detail: "Road potholes near Booth Subhash Nagar", time: "2 hours ago", type: "complaint" },
            { action: "Complaint resolved", detail: "Street light fixed at Booth Nawabganj", time: "5 hours ago", type: "resolved" },
            { action: "User login", detail: "Vikram Singh accessed admin panel", time: "2 hours ago", type: "user" },
            { action: "Status updated", detail: "Water supply issue moved to In Progress", time: "8 hours ago", type: "update" },
            { action: "New booth added", detail: "Fatehganj registered in Block C", time: "1 day ago", type: "booth" },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                activity.type === "complaint" ? "bg-red-400" :
                activity.type === "resolved" ? "bg-green-400" :
                activity.type === "user" ? "bg-blue-400" : "bg-primary"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ComplaintsTab = ({ search, setSearch }: { search: string; setSearch: (v: string) => void }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const filtered = complaints.filter((c) => {
    const matchSearch = c.text.toLowerCase().includes(search.toLowerCase()) || c.citizen.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search complaints or citizens..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Open", "In Progress", "Resolved"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                statusFilter === s
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card-glow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Complaint</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Booth</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Citizen</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Priority</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground tabular-nums">#{c.id}</td>
                  <td className="py-3 px-4 max-w-[200px] truncate">{c.text}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.category}</td>
                  <td className="py-3 px-4 text-muted-foreground">{c.booth}</td>
                  <td className="py-3 px-4">{c.citizen}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${priorityBadge(c.priority)}`}>{c.priority}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{c.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {complaints.length} complaints</span>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 font-medium">1</button>
            <button className="px-2.5 py-1 rounded hover:bg-muted/50 transition-colors">2</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UsersTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">System Users</h3>
      <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all active:scale-[0.97]">
        <Plus className="w-4 h-4" />
        Add User
      </button>
    </div>

    <div className="grid gap-3">
      {users.map((u, i) => (
        <motion.div
          key={u.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="card-glow rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm">
              {u.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-medium text-sm">{u.name}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground block">Role</span>
              <span className="text-xs font-medium text-primary">{u.role}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground block">Status</span>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusBadge(u.status)}`}>
                {u.status}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground block">Last Login</span>
              <span className="text-xs text-muted-foreground">{u.lastLogin}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const BoothsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">Registered Booths</h3>
      <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all active:scale-[0.97]">
        <Plus className="w-4 h-4" />
        Add Booth
      </button>
    </div>

    <div className="card-glow rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Booth ID</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Block</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Location</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Total Issues</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Resolved</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Resolution %</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Operator</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {booths.map((b) => {
              const pct = Math.round((b.resolved / b.issues) * 100);
              return (
                <tr key={b.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 font-medium">Booth {b.id}</td>
                  <td className="py-3 px-4 text-muted-foreground">Block {b.block}</td>
                  <td className="py-3 px-4 text-muted-foreground">{b.location}</td>
                  <td className="py-3 px-4 tabular-nums">{b.issues}</td>
                  <td className="py-3 px-4 tabular-nums text-green-400">{b.resolved}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-muted/50 max-w-[80px]">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground">{pct}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{b.operator}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-red-400/10 text-muted-foreground hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

const SettingsTab = () => {
  const [aiModel, setAiModel] = useState("GPT-4 Turbo");
  const [notifications, setNotifications] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
      {/* AI Settings */}
      <div className="card-glow rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4 text-primary" />
          AI Configuration
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">AI Model</label>
            <div className="relative">
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-muted/30 border border-border text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                <option>GPT-4 Turbo</option>
                <option>GPT-3.5</option>
                <option>Custom NLP Model</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Confidence Threshold</label>
            <input
              type="range"
              min="50"
              max="100"
              defaultValue="80"
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>50%</span>
              <span>80% (Current)</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card-glow rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          Notifications
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Get notified about critical complaints</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-5 rounded-full transition-colors relative ${notifications ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${notifications ? "left-5.5 translate-x-0" : "left-0.5"}`}
                style={{ left: notifications ? "22px" : "2px" }}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Auto-Assign Complaints</p>
              <p className="text-xs text-muted-foreground">Automatically assign to booth operators</p>
            </div>
            <button
              onClick={() => setAutoAssign(!autoAssign)}
              className={`w-10 h-5 rounded-full transition-colors relative ${autoAssign ? "bg-primary" : "bg-muted"}`}
            >
              <span className="absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform"
                style={{ left: autoAssign ? "22px" : "2px" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card-glow rounded-xl p-5 border-red-400/20">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 text-red-400">
          <Shield className="w-4 h-4" />
          Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Reset All Data</p>
            <p className="text-xs text-muted-foreground">Permanently delete all complaints and analytics data</p>
          </div>
          <button className="px-3 py-2 rounded-lg border border-red-400/30 text-red-400 text-xs font-medium hover:bg-red-400/10 transition-colors active:scale-[0.97]">
            Reset Data
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPage;
