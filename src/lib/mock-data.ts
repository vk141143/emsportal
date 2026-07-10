export const employees = [
  { id: "E-1042", name: "Alex Morgan", email: "alex.morgan@acme.com", department: "Engineering", jobTitle: "Sr. Software Engineer", status: "Active", location: "Bengaluru", joined: "2022-03-14", manager: "Priya Nair" },
  { id: "E-1043", name: "Priya Nair", email: "priya.nair@acme.com", department: "Engineering", jobTitle: "Engineering Manager", status: "Active", location: "Bengaluru", joined: "2019-08-01", manager: "David Chen" },
  { id: "E-1044", name: "Jordan Blake", email: "jordan.blake@acme.com", department: "People Ops", jobTitle: "HR Business Partner", status: "Active", location: "Austin", joined: "2021-01-10", manager: "Rachel Kim" },
  { id: "E-1045", name: "Sam Rivera", email: "sam.rivera@acme.com", department: "Platform", jobTitle: "Super Admin", status: "Active", location: "Remote", joined: "2018-05-22", manager: "—" },
  { id: "E-1046", name: "Nina Patel", email: "nina.patel@acme.com", department: "Design", jobTitle: "Product Designer", status: "Active", location: "London", joined: "2023-06-18", manager: "Marcus Wei" },
  { id: "E-1047", name: "Marcus Wei", email: "marcus.wei@acme.com", department: "Design", jobTitle: "Design Lead", status: "Active", location: "London", joined: "2020-02-04", manager: "Priya Nair" },
  { id: "E-1048", name: "Elena Volkova", email: "elena.v@acme.com", department: "Sales", jobTitle: "Account Executive", status: "On Leave", location: "Berlin", joined: "2022-11-01", manager: "Tom Larsen" },
  { id: "E-1049", name: "Tom Larsen", email: "tom.larsen@acme.com", department: "Sales", jobTitle: "Sales Director", status: "Active", location: "New York", joined: "2017-09-12", manager: "David Chen" },
  { id: "E-1050", name: "Aisha Rahman", email: "aisha.r@acme.com", department: "Engineering", jobTitle: "Backend Engineer", status: "Active", location: "Bengaluru", joined: "2024-01-15", manager: "Priya Nair" },
  { id: "E-1051", name: "David Chen", email: "david.chen@acme.com", department: "Executive", jobTitle: "CTO", status: "Active", location: "San Francisco", joined: "2016-04-01", manager: "—" },
  { id: "E-1052", name: "Sofia Rossi", email: "sofia.rossi@acme.com", department: "Marketing", jobTitle: "Content Strategist", status: "Probation", location: "Milan", joined: "2025-08-01", manager: "Rachel Kim" },
  { id: "E-1053", name: "Kenji Tanaka", email: "kenji.t@acme.com", department: "Engineering", jobTitle: "iOS Engineer", status: "Active", location: "Tokyo", joined: "2023-04-20", manager: "Priya Nair" },
];

export const leaveRequests = [
  { id: "LR-201", employee: "Alex Morgan", type: "Casual Leave", from: "2026-07-14", to: "2026-07-16", days: 3, status: "Pending", reason: "Family event" },
  { id: "LR-202", employee: "Nina Patel", type: "Sick Leave", from: "2026-07-11", to: "2026-07-12", days: 2, status: "Approved", reason: "Flu" },
  { id: "LR-203", employee: "Aisha Rahman", type: "Work From Home", from: "2026-07-13", to: "2026-07-13", days: 1, status: "Pending", reason: "Home internet install" },
  { id: "LR-204", employee: "Kenji Tanaka", type: "Annual Leave", from: "2026-07-20", to: "2026-07-27", days: 6, status: "Pending", reason: "Vacation" },
  { id: "LR-205", employee: "Elena Volkova", type: "Sick Leave", from: "2026-07-08", to: "2026-07-15", days: 6, status: "Approved", reason: "Medical" },
  { id: "LR-206", employee: "Marcus Wei", type: "Casual Leave", from: "2026-07-30", to: "2026-07-31", days: 2, status: "Rejected", reason: "Personal" },
];

export const attendance = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(2026, 6, i + 1);
  return {
    date: d.toISOString().slice(0, 10),
    checkIn: "09:0" + (i % 6) + " AM",
    checkOut: "0" + (5 + (i % 4)) + ":45 PM",
    hours: 8 + ((i % 3) * 0.25),
    status: i % 7 === 6 ? "Weekend" : i === 5 ? "Leave" : "Present",
  };
});

export const payslips = [
  { period: "June 2026", gross: 9500, deductions: 1820, net: 7680, status: "Paid", date: "2026-06-30" },
  { period: "May 2026", gross: 9500, deductions: 1820, net: 7680, status: "Paid", date: "2026-05-30" },
  { period: "April 2026", gross: 9500, deductions: 1820, net: 7680, status: "Paid", date: "2026-04-30" },
  { period: "March 2026", gross: 9200, deductions: 1750, net: 7450, status: "Paid", date: "2026-03-30" },
  { period: "February 2026", gross: 9200, deductions: 1750, net: 7450, status: "Paid", date: "2026-02-28" },
  { period: "January 2026", gross: 9200, deductions: 1750, net: 7450, status: "Paid", date: "2026-01-30" },
];

export const candidates = [
  { id: "C-01", name: "Riya Shah", role: "Frontend Engineer", stage: "Interview", source: "LinkedIn", rating: 4.5, applied: "2026-06-20" },
  { id: "C-02", name: "Mohamed Ali", role: "Product Manager", stage: "Offer", source: "Referral", rating: 4.8, applied: "2026-06-14" },
  { id: "C-03", name: "Emma Watson", role: "UX Designer", stage: "Screening", source: "Careers Site", rating: 4.2, applied: "2026-07-01" },
  { id: "C-04", name: "Carlos Ruiz", role: "Data Scientist", stage: "Assessment", source: "Indeed", rating: 4.6, applied: "2026-06-28" },
  { id: "C-05", name: "Yuki Sato", role: "Backend Engineer", stage: "Interview", source: "LinkedIn", rating: 4.4, applied: "2026-06-22" },
  { id: "C-06", name: "Fatima Khan", role: "DevOps Engineer", stage: "Hired", source: "Referral", rating: 4.9, applied: "2026-05-30" },
  { id: "C-07", name: "James Miller", role: "Sales Rep", stage: "Rejected", source: "Careers Site", rating: 3.1, applied: "2026-06-05" },
];

export const tenants = [
  { id: "T-01", name: "Acme Corp", plan: "Enterprise", seats: 1240, mrr: 24800, region: "US", status: "Active", since: "2019" },
  { id: "T-02", name: "Globex Ltd", plan: "Business", seats: 320, mrr: 4800, region: "EU", status: "Active", since: "2021" },
  { id: "T-03", name: "Initech", plan: "Growth", seats: 88, mrr: 1320, region: "US", status: "Trial", since: "2026" },
  { id: "T-04", name: "Umbrella Inc", plan: "Enterprise", seats: 2100, mrr: 42000, region: "APAC", status: "Active", since: "2018" },
  { id: "T-05", name: "Soylent Co", plan: "Business", seats: 210, mrr: 3150, region: "US", status: "Past Due", since: "2022" },
  { id: "T-06", name: "Hooli", plan: "Enterprise", seats: 3400, mrr: 68000, region: "US", status: "Active", since: "2017" },
  { id: "T-07", name: "Pied Piper", plan: "Growth", seats: 44, mrr: 660, region: "US", status: "Active", since: "2024" },
  { id: "T-08", name: "Wayne Enterprises", plan: "Enterprise", seats: 5200, mrr: 104000, region: "US", status: "Active", since: "2015" },
];

export const auditLogs = [
  { time: "10:42:11", actor: "sam.rivera@acme.com", action: "Rotated API key", target: "tenant:acme", severity: "High" },
  { time: "10:38:02", actor: "jordan.blake@acme.com", action: "Approved leave request LR-202", target: "employee:nina.patel", severity: "Low" },
  { time: "10:12:44", actor: "system", action: "Payroll run completed", target: "cycle:2026-06", severity: "Medium" },
  { time: "09:58:20", actor: "priya.nair@acme.com", action: "Updated goal weights", target: "team:engineering", severity: "Low" },
  { time: "09:41:07", actor: "sam.rivera@acme.com", action: "Suspended tenant", target: "tenant:soylent", severity: "High" },
  { time: "09:14:33", actor: "jordan.blake@acme.com", action: "Created offer letter", target: "candidate:C-02", severity: "Medium" },
  { time: "08:52:11", actor: "system", action: "Backup snapshot created", target: "db:primary", severity: "Low" },
];

export const goals = [
  { title: "Ship auth v2 to GA", owner: "Alex Morgan", progress: 82, due: "2026-08-15", status: "On Track" },
  { title: "Reduce p95 latency <200ms", owner: "Aisha Rahman", progress: 55, due: "2026-09-01", status: "At Risk" },
  { title: "Design system 3.0", owner: "Marcus Wei", progress: 40, due: "2026-10-10", status: "On Track" },
  { title: "Sales pipeline +30%", owner: "Tom Larsen", progress: 68, due: "2026-09-30", status: "On Track" },
  { title: "Hire 5 senior engineers", owner: "Priya Nair", progress: 60, due: "2026-08-30", status: "On Track" },
];

export const announcements = [
  { title: "Company all-hands — Friday 4pm", body: "Q3 kickoff with the exec team. Zoom link in your calendar.", tag: "Company", date: "2026-07-10" },
  { title: "New wellness benefit live", body: "Reimburse up to $80/month for fitness memberships.", tag: "Benefits", date: "2026-07-08" },
  { title: "Security training due July 20", body: "Complete the mandatory training in the Learning tab.", tag: "Compliance", date: "2026-07-05" },
];

export const monthlyHeadcount = [
  { month: "Jan", hires: 12, exits: 3 }, { month: "Feb", hires: 9, exits: 4 },
  { month: "Mar", hires: 14, exits: 2 }, { month: "Apr", hires: 18, exits: 5 },
  { month: "May", hires: 22, exits: 6 }, { month: "Jun", hires: 17, exits: 4 },
  { month: "Jul", hires: 24, exits: 3 },
];

export const attendanceTrend = [
  { day: "Mon", present: 1180, absent: 22, leave: 38 },
  { day: "Tue", present: 1192, absent: 18, leave: 30 },
  { day: "Wed", present: 1170, absent: 26, leave: 44 },
  { day: "Thu", present: 1201, absent: 14, leave: 25 },
  { day: "Fri", present: 1145, absent: 30, leave: 65 },
];

export const departmentSplit = [
  { name: "Engineering", value: 420 },
  { name: "Sales", value: 260 },
  { name: "Marketing", value: 140 },
  { name: "Design", value: 90 },
  { name: "People Ops", value: 70 },
  { name: "Finance", value: 60 },
];

export const revenueTrend = [
  { month: "Jan", mrr: 182 }, { month: "Feb", mrr: 195 }, { month: "Mar", mrr: 210 },
  { month: "Apr", mrr: 228 }, { month: "May", mrr: 244 }, { month: "Jun", mrr: 261 },
  { month: "Jul", mrr: 278 },
];

export const projects = [
  { id: "P-01", name: "Auth v2", status: "In Progress", priority: "High", assignees: ["Alex Morgan", "Aisha Rahman"], due: "2026-08-15", progress: 72 },
  { id: "P-02", name: "Design System 3.0", status: "In Progress", priority: "Medium", assignees: ["Marcus Wei", "Nina Patel"], due: "2026-10-10", progress: 40 },
  { id: "P-03", name: "Mobile App v4", status: "Planning", priority: "High", assignees: ["Kenji Tanaka"], due: "2026-09-30", progress: 15 },
  { id: "P-04", name: "API Gateway Refactor", status: "Review", priority: "Low", assignees: ["Aisha Rahman", "Alex Morgan"], due: "2026-07-25", progress: 90 },
  { id: "P-05", name: "Onboarding Flow", status: "Completed", priority: "Medium", assignees: ["Nina Patel"], due: "2026-07-01", progress: 100 },
];

export const tasks = [
  { id: "T-101", title: "Fix login redirect bug", assignee: "Alex Morgan", project: "Auth v2", priority: "High", due: "2026-07-12", status: "In Progress" },
  { id: "T-102", title: "Write unit tests for auth module", assignee: "Aisha Rahman", project: "Auth v2", priority: "Medium", due: "2026-07-14", status: "Todo" },
  { id: "T-103", title: "Token component design", assignee: "Marcus Wei", project: "Design System 3.0", priority: "High", due: "2026-07-13", status: "In Progress" },
  { id: "T-104", title: "iOS push notifications", assignee: "Kenji Tanaka", project: "Mobile App v4", priority: "Medium", due: "2026-07-20", status: "Todo" },
  { id: "T-105", title: "API rate limiting", assignee: "Aisha Rahman", project: "API Gateway Refactor", priority: "High", due: "2026-07-11", status: "Review" },
  { id: "T-106", title: "Update API docs", assignee: "Alex Morgan", project: "API Gateway Refactor", priority: "Low", due: "2026-07-18", status: "Todo" },
];

export const oneOnOneMeetings = [
  { id: "M-01", employee: "Alex Morgan", date: "2026-07-08", duration: "30 min", notes: "Discussed auth v2 blockers. Alex needs access to staging DB. Follow up on promotion timeline.", nextDate: "2026-07-22", mood: "Good" },
  { id: "M-02", employee: "Aisha Rahman", date: "2026-07-07", duration: "45 min", notes: "Onboarding check-in. Comfortable with codebase. Wants more ownership on backend services.", nextDate: "2026-07-21", mood: "Great" },
  { id: "M-03", employee: "Kenji Tanaka", date: "2026-07-06", duration: "30 min", notes: "Mobile app timeline concern. Needs design specs earlier. Flagged dependency on Nina.", nextDate: "2026-07-20", mood: "Neutral" },
  { id: "M-04", employee: "Marcus Wei", date: "2026-07-05", duration: "30 min", notes: "Design system progress on track. Wants to present at all-hands. Approved.", nextDate: "2026-07-19", mood: "Good" },
];

export const recentActivities = [
  { id: 1, actor: "Alex Morgan", action: "submitted attendance correction", time: "10 min ago", type: "attendance" },
  { id: 2, actor: "Aisha Rahman", action: "completed task: API rate limiting", time: "1 hr ago", type: "task" },
  { id: 3, actor: "Kenji Tanaka", action: "applied for Annual Leave (Jul 20–27)", time: "2 hr ago", type: "leave" },
  { id: 4, actor: "Marcus Wei", action: "updated Design System 3.0 progress to 40%", time: "3 hr ago", type: "project" },
  { id: 5, actor: "Nina Patel", action: "completed Onboarding Flow project", time: "Yesterday", type: "project" },
];

export const departments = [
  { id: "D-01", name: "Engineering", head: "Priya Nair", employees: 42, budget: 420000, location: "Bengaluru" },
  { id: "D-02", name: "Sales", head: "Tom Larsen", employees: 26, budget: 260000, location: "New York" },
  { id: "D-03", name: "Marketing", head: "Rachel Kim", employees: 14, budget: 140000, location: "Remote" },
  { id: "D-04", name: "Design", head: "Marcus Wei", employees: 9, budget: 90000, location: "London" },
  { id: "D-05", name: "People Ops", head: "Jordan Blake", employees: 7, budget: 70000, location: "Austin" },
  { id: "D-06", name: "Finance", head: "David Chen", employees: 6, budget: 60000, location: "San Francisco" },
];

export const designations = [
  { id: "DG-01", title: "Software Engineer", department: "Engineering", level: "L3", employees: 18 },
  { id: "DG-02", title: "Senior Software Engineer", department: "Engineering", level: "L4", employees: 12 },
  { id: "DG-03", title: "Engineering Manager", department: "Engineering", level: "L6", employees: 4 },
  { id: "DG-04", title: "Product Designer", department: "Design", level: "L3", employees: 5 },
  { id: "DG-05", title: "Design Lead", department: "Design", level: "L5", employees: 2 },
  { id: "DG-06", title: "Account Executive", department: "Sales", level: "L3", employees: 14 },
  { id: "DG-07", title: "Sales Director", department: "Sales", level: "L6", employees: 2 },
  { id: "DG-08", title: "HR Business Partner", department: "People Ops", level: "L4", employees: 4 },
];

export const assets = [
  { id: "A-001", name: "MacBook Pro 16", type: "Laptop", assignedTo: "Alex Morgan", serial: "C02XG2JHJGH5", status: "In Use", assigned: "2022-03-14" },
  { id: "A-002", name: "Dell Monitor 27", type: "Monitor", assignedTo: "Priya Nair", serial: "CN-0T2HR0", status: "In Use", assigned: "2021-01-10" },
  { id: "A-003", name: "iPhone 15 Pro", type: "Mobile", assignedTo: "Kenji Tanaka", serial: "DNQVW2XKPF", status: "In Use", assigned: "2023-04-20" },
  { id: "A-004", name: "MacBook Air M2", type: "Laptop", assignedTo: "Aisha Rahman", serial: "C02ZK1ABMD6T", status: "In Use", assigned: "2024-01-15" },
  { id: "A-005", name: "Logitech MX Keys", type: "Keyboard", assignedTo: "Marcus Wei", serial: "2248-LMX-001", status: "In Use", assigned: "2020-02-04" },
  { id: "A-006", name: "ThinkPad X1", type: "Laptop", assignedTo: "—", serial: "PF2XABCD", status: "Available", assigned: "—" },
  { id: "A-007", name: "iPad Pro 12.9", type: "Tablet", assignedTo: "Nina Patel", serial: "DLXPQ9ABCD", status: "In Use", assigned: "2023-06-18" },
];

export const hrDocuments = [
  { id: "DOC-01", name: "Alex Morgan — Offer Letter", type: "Offer Letter", employee: "Alex Morgan", date: "2022-03-10", expiry: "—", status: "Active" },
  { id: "DOC-02", name: "Priya Nair — Appointment Letter", type: "Appointment Letter", employee: "Priya Nair", date: "2019-08-01", expiry: "—", status: "Active" },
  { id: "DOC-03", name: "Elena Volkova — Experience Letter", type: "Experience Letter", employee: "Elena Volkova", date: "2026-07-01", expiry: "—", status: "Active" },
  { id: "DOC-04", name: "Marcus Wei — Relieving Letter", type: "Relieving Letter", employee: "Marcus Wei", date: "2026-06-30", expiry: "—", status: "Draft" },
  { id: "DOC-05", name: "Aisha Rahman — Offer Letter", type: "Offer Letter", employee: "Aisha Rahman", date: "2024-01-10", expiry: "—", status: "Active" },
  { id: "DOC-06", name: "Kenji Tanaka — Passport", type: "ID Proof", employee: "Kenji Tanaka", date: "2020-04-01", expiry: "2026-04-01", status: "Expired" },
];

export const holidays = [
  { id: "H-01", name: "New Year's Day", date: "2026-01-01", type: "National", applicable: "All" },
  { id: "H-02", name: "Republic Day", date: "2026-01-26", type: "National", applicable: "India" },
  { id: "H-03", name: "Holi", date: "2026-03-14", type: "Festival", applicable: "India" },
  { id: "H-04", name: "Good Friday", date: "2026-04-03", type: "National", applicable: "All" },
  { id: "H-05", name: "Independence Day (US)", date: "2026-07-04", type: "National", applicable: "US" },
  { id: "H-06", name: "Independence Day (IN)", date: "2026-08-15", type: "National", applicable: "India" },
  { id: "H-07", name: "Diwali", date: "2026-10-20", type: "Festival", applicable: "India" },
  { id: "H-08", name: "Christmas Day", date: "2026-12-25", type: "National", applicable: "All" },
];

export const hrAnnouncements = [
  { id: "HA-01", title: "Q3 Performance Review Cycle Opens", body: "All managers must complete reviews by August 31. Login to the performance module to begin.", tag: "Performance", date: "2026-07-10", pinned: true },
  { id: "HA-02", title: "Updated Leave Policy — Effective Aug 1", body: "Casual leave increased from 12 to 15 days. Sick leave now requires medical certificate after 3 days.", tag: "Policy", date: "2026-07-08", pinned: true },
  { id: "HA-03", title: "New Joiners Orientation — July 15", body: "5 new employees joining this month. Orientation scheduled at 10am in Conference Room B.", tag: "Onboarding", date: "2026-07-07", pinned: false },
  { id: "HA-04", title: "Payroll Cutoff — July 25", body: "All attendance corrections and expense claims must be submitted before July 25 for July payroll.", tag: "Payroll", date: "2026-07-05", pinned: false },
  { id: "HA-05", title: "Mandatory Security Training Due", body: "Complete the annual security awareness training by July 20. Non-compliance will be escalated.", tag: "Compliance", date: "2026-07-03", pinned: false },
];

export const teamCalendarEvents = [
  { id: "CE-01", title: "Sprint Planning", date: "2026-07-14", type: "Meeting", attendees: ["All Team"] },
  { id: "CE-02", title: "Alex Morgan — Leave", date: "2026-07-14", type: "Leave", attendees: ["Alex Morgan"] },
  { id: "CE-03", title: "1:1 Aisha Rahman", date: "2026-07-15", type: "1:1", attendees: ["Aisha Rahman"] },
  { id: "CE-04", title: "Design Review", date: "2026-07-16", type: "Meeting", attendees: ["Marcus Wei", "Nina Patel"] },
  { id: "CE-05", title: "Sprint Demo", date: "2026-07-18", type: "Meeting", attendees: ["All Team"] },
  { id: "CE-06", title: "Kenji Tanaka — Leave", date: "2026-07-20", type: "Leave", attendees: ["Kenji Tanaka"] },
  { id: "CE-07", title: "Monthly Report Due", date: "2026-07-31", type: "Deadline", attendees: [] },
];

export const apiKeys = [
  { id: "AK-001", name: "Production API", key: "sk_live_acme_••••••••••••4f2a", tenant: "Acme Corp", created: "2026-01-10", lastUsed: "2 min ago", status: "Active" },
  { id: "AK-002", name: "Staging API", key: "sk_test_acme_••••••••••••9b1c", tenant: "Acme Corp", created: "2026-03-22", lastUsed: "1 hr ago", status: "Active" },
  { id: "AK-003", name: "Hooli Integration", key: "sk_live_hooli_••••••••••••7d3e", tenant: "Hooli", created: "2025-11-05", lastUsed: "Yesterday", status: "Active" },
  { id: "AK-004", name: "Globex Webhook", key: "sk_live_globex_••••••••••••2a8f", tenant: "Globex Ltd", created: "2026-02-14", lastUsed: "3 days ago", status: "Revoked" },
];

export const loginHistory = [
  { user: "sam.rivera@acme.com", ip: "192.168.1.42", location: "San Francisco, US", device: "Chrome / macOS", time: "2026-07-10 10:40", status: "Success" },
  { user: "jordan.blake@acme.com", ip: "10.0.0.88", location: "Austin, US", device: "Firefox / Windows", time: "2026-07-10 09:22", status: "Success" },
  { user: "elena.v@globex.com", ip: "85.214.132.117", location: "Berlin, DE", device: "Chrome / Linux", time: "2026-07-10 08:15", status: "Failed" },
  { user: "tom@hooli.com", ip: "74.125.224.72", location: "New York, US", device: "Safari / iOS", time: "2026-07-09 22:10", status: "Success" },
  { user: "priya.nair@acme.com", ip: "192.168.1.55", location: "Bengaluru, IN", device: "Chrome / macOS", time: "2026-07-09 18:44", status: "Success" },
  { user: "unknown", ip: "45.33.32.156", location: "Unknown", device: "curl/7.68", time: "2026-07-09 14:02", status: "Blocked" },
];

export const adminRoles = [
  { id: "R-01", name: "Super Admin", users: 8, permissions: 42, description: "Full platform access including billing and security" },
  { id: "R-02", name: "HR Admin", users: 34, permissions: 28, description: "Manage employees, payroll, leaves and recruitment" },
  { id: "R-03", name: "Manager", users: 210, permissions: 12, description: "Team management, approvals and performance reviews" },
  { id: "R-04", name: "Employee", users: 12440, permissions: 6, description: "Self-service access to personal data and requests" },
  { id: "R-05", name: "Auditor", users: 4, permissions: 18, description: "Read-only access to audit logs and reports" },
  { id: "R-06", name: "Finance Admin", users: 6, permissions: 22, description: "Payroll, billing and financial reports access" },
];

export const permissionMatrix = [
  { module: "Employees", superAdmin: true, hrAdmin: true, manager: false, employee: false, auditor: true },
  { module: "Payroll", superAdmin: true, hrAdmin: true, manager: false, employee: false, auditor: true },
  { module: "Leave Management", superAdmin: true, hrAdmin: true, manager: true, employee: true, auditor: false },
  { module: "Recruitment", superAdmin: true, hrAdmin: true, manager: false, employee: false, auditor: false },
  { module: "Performance", superAdmin: true, hrAdmin: true, manager: true, employee: true, auditor: false },
  { module: "Billing", superAdmin: true, hrAdmin: false, manager: false, employee: false, auditor: true },
  { module: "Audit Logs", superAdmin: true, hrAdmin: false, manager: false, employee: false, auditor: true },
  { module: "Settings", superAdmin: true, hrAdmin: false, manager: false, employee: false, auditor: false },
];

export const integrationsList = [
  { id: "INT-01", name: "Okta SSO", category: "Identity", status: "Connected", lastSync: "2 min ago", logo: "🔐" },
  { id: "INT-02", name: "Slack", category: "Communication", status: "Connected", lastSync: "5 min ago", logo: "💬" },
  { id: "INT-03", name: "Google Workspace", category: "Productivity", status: "Connected", lastSync: "10 min ago", logo: "📧" },
  { id: "INT-04", name: "Stripe", category: "Billing", status: "Connected", lastSync: "1 hr ago", logo: "💳" },
  { id: "INT-05", name: "ADP Payroll", category: "Payroll", status: "Disconnected", lastSync: "Never", logo: "💰" },
  { id: "INT-06", name: "Workday HCM", category: "HRIS", status: "Disconnected", lastSync: "Never", logo: "🏢" },
  { id: "INT-07", name: "Zoom", category: "Communication", status: "Connected", lastSync: "30 min ago", logo: "📹" },
  { id: "INT-08", name: "Jira", category: "Project Management", status: "Connected", lastSync: "15 min ago", logo: "📋" },
];

export const emailTemplates = [
  { id: "ET-01", name: "Welcome Email", type: "Onboarding", subject: "Welcome to {{company_name}}!", lastEdited: "2026-07-01", status: "Active" },
  { id: "ET-02", name: "Offer Letter Email", type: "Recruitment", subject: "Your Offer from {{company_name}}", lastEdited: "2026-06-15", status: "Active" },
  { id: "ET-03", name: "Leave Approved", type: "Leave", subject: "Your leave request has been approved", lastEdited: "2026-05-20", status: "Active" },
  { id: "ET-04", name: "Payslip Ready", type: "Payroll", subject: "Your payslip for {{month}} is ready", lastEdited: "2026-06-30", status: "Active" },
  { id: "ET-05", name: "Password Reset", type: "Security", subject: "Reset your password", lastEdited: "2026-04-10", status: "Active" },
  { id: "ET-06", name: "Birthday Wish", type: "Engagement", subject: "Happy Birthday, {{first_name}}! 🎂", lastEdited: "2026-03-01", status: "Draft" },
];

export const adminStorageData = [
  { tenant: "Wayne Enterprises", used: 420, total: 500, percent: 84 },
  { tenant: "Hooli", used: 310, total: 400, percent: 78 },
  { tenant: "Umbrella Inc", used: 280, total: 400, percent: 70 },
  { tenant: "Acme Corp", used: 195, total: 300, percent: 65 },
  { tenant: "Globex Ltd", used: 88, total: 200, percent: 44 },
  { tenant: "Soylent Co", used: 62, total: 100, percent: 62 },
];
