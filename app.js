const {
  useState,
  useRef
} = React;
const C = {
  bg: "#F9FAFB",
  card: "#FFF",
  border: "#EFEFEF",
  text: "#111318",
  sub: "#6B7280",
  mute: "#B0B8C8",
  violet: "#7C3AED",
  blue: "#2563EB",
  green: "#059669",
  amber: "#D97706",
  pink: "#DB2777",
  indigo: "#4F46E5",
  cyan: "#0891B2",
  lime: "#65A30D",
  teal: "#0F766E",
  slate: "#64748B",
  danger: "#EF4444",
  warn: "#F59E0B",
  ok: "#10B981"
};
const R = 12;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const SEC = {
  habits: {
    icon: "⚡",
    label: "Routines",
    c: C.violet
  },
  business: {
    icon: "💼",
    label: "Business",
    c: C.blue
  },
  health: {
    icon: "🏃",
    label: "Health",
    c: C.green
  },
  shopping: {
    icon: "🛒",
    label: "Shopping",
    c: C.amber
  },
  family: {
    icon: "👨‍👩‍👧",
    label: "Family",
    c: C.pink
  },
  finance: {
    icon: "💰",
    label: "Finance",
    c: C.indigo
  },
  travel: {
    icon: "✈️",
    label: "Travel",
    c: C.cyan
  },
  growth: {
    icon: "📚",
    label: "Growth",
    c: C.lime
  },
  calendar: {
    icon: "📅",
    label: "Calendar",
    c: C.teal
  },
  docs: {
    icon: "🗂",
    label: "Docs",
    c: C.slate
  },
  matrix: {
    icon: "🎯",
    label: "Matrix",
    c: "#DC2626"
  },
  review: {
    icon: "📊",
    label: "Review",
    c: "#7C3AED"
  },
  journal: {
    icon: "📓",
    label: "Journal",
    c: "#B45309"
  },
  notes: {
    icon: "⚡",
    label: "Quick Notes",
    c: "#0891B2"
  }
};
const FAM = [{
  id: "wife",
  label: "Wife",
  av: "👩",
  c: C.pink
}, {
  id: "daughter",
  label: "Daughter",
  av: "👧",
  c: C.amber
}, {
  id: "mom",
  label: "Mom",
  av: "👵",
  c: C.violet
}, {
  id: "dad",
  label: "Dad",
  av: "👴",
  c: C.blue
}];
const PRI = {
  high: {
    label: "High",
    c: C.danger
  },
  medium: {
    label: "Med",
    c: C.warn
  },
  low: {
    label: "Low",
    c: C.ok
  }
};
const TASK_CATS = [{
  id: "business",
  label: "Business",
  icon: "💼",
  color: C.blue
}, {
  id: "health",
  label: "Health",
  icon: "🏃",
  color: C.green
}, {
  id: "finance",
  label: "Finance",
  icon: "💰",
  color: C.indigo
}, {
  id: "personal",
  label: "Personal",
  icon: "👤",
  color: C.violet
}, {
  id: "family",
  label: "Family",
  icon: "👨‍👩‍👧",
  color: C.pink
}, {
  id: "travel",
  label: "Travel",
  icon: "✈️",
  color: C.cyan
}, {
  id: "shopping",
  label: "Shopping",
  icon: "🛒",
  color: C.amber
}, {
  id: "learning",
  label: "Learning",
  icon: "📚",
  color: C.lime
}];
function taskCat(id) {
  return TASK_CATS.find(c => c.id === id) || {
    id,
    label: id,
    icon: "📌",
    color: C.mute
  };
}

// ── SEED ─────────────────────────────────────────────────────────────────────
const SEED = {
  habitLog: {},
  // {habitId_YYYY-MM-DD: true/false}
  habits: [{
    id: "h1",
    name: "Wake up by 6 AM",
    icon: "🌅",
    time: "06:00",
    streak: 12,
    done: false,
    cat: "Morning",
    freq: "daily",
    days: [],
    note: ""
  }, {
    id: "h2",
    name: "Morning walk 30 min",
    icon: "🚶",
    time: "06:30",
    streak: 5,
    done: false,
    cat: "Fitness",
    freq: "daily",
    days: [],
    note: "30 min brisk walk"
  }, {
    id: "h3",
    name: "Exercise / Gym",
    icon: "💪",
    time: "07:30",
    streak: 3,
    done: false,
    cat: "Fitness",
    freq: "days",
    days: ["Mon", "Wed", "Fri"],
    note: ""
  }, {
    id: "h4",
    name: "Meditate 10 min",
    icon: "🧘",
    time: "06:15",
    streak: 0,
    done: false,
    cat: "Mind",
    freq: "daily",
    days: [],
    note: ""
  }, {
    id: "h5",
    name: "Brush teeth night",
    icon: "🦷",
    time: "22:00",
    streak: 20,
    done: true,
    cat: "Health",
    freq: "daily",
    days: [],
    note: ""
  }, {
    id: "h6",
    name: "Read 20 pages",
    icon: "📖",
    time: "21:00",
    streak: 7,
    done: false,
    cat: "Learning",
    freq: "daily",
    days: [],
    note: "Currently: Atomic Habits"
  }, {
    id: "h7",
    name: "No phone after 10PM",
    icon: "📵",
    time: "22:00",
    streak: 2,
    done: false,
    cat: "Mind",
    freq: "daily",
    days: [],
    note: ""
  }, {
    id: "h8",
    name: "Drink 3L water",
    icon: "💧",
    time: "",
    streak: 4,
    done: false,
    cat: "Health",
    freq: "daily",
    days: [],
    note: ""
  }, {
    id: "h9",
    name: "Take vitamins",
    icon: "💊",
    time: "08:00",
    streak: 0,
    done: false,
    cat: "Health",
    freq: "daily",
    days: [],
    note: "Vit D, Omega 3"
  }, {
    id: "h10",
    name: "Cold shower",
    icon: "🚿",
    time: "07:00",
    streak: 0,
    done: false,
    cat: "Fitness",
    freq: "weekdays",
    days: [],
    note: ""
  }],
  business: {
    goals: [{
      id: "bg1",
      title: "Automate invoicing",
      p: 30,
      dl: "2026-09-01",
      pri: "high"
    }, {
      id: "bg2",
      title: "Expand catalogue",
      p: 15,
      dl: "2026-12-01",
      pri: "medium"
    }, {
      id: "bg3",
      title: "Hire 2nd employee",
      p: 10,
      dl: "2027-01-01",
      pri: "low"
    }]
  },
  health: {
    goals: [{
      id: "hg1",
      title: "Lose 8 kg",
      p: 25,
      dl: "2026-12-31",
      pri: "high",
      note: "82kg → 74kg"
    }, {
      id: "hg2",
      title: "Annual health checkup",
      p: 0,
      dl: "2026-07-31",
      pri: "high",
      note: "Book with Dr. Sharma"
    }, {
      id: "hg3",
      title: "Daily vitamin routine",
      p: 60,
      dl: "",
      pri: "medium",
      note: "Vit D · Omega 3 · Multi"
    }, {
      id: "hg4",
      title: "Skin care routine",
      p: 40,
      dl: "",
      pri: "low",
      note: "Moisturiser AM & PM"
    }]
  },
  shopping: [{
    id: "s1",
    name: "Allen Solly shirts ×3",
    cat: "Wardrobe",
    pri: "medium",
    budget: "₹3,000",
    done: false
  }, {
    id: "s2",
    name: "Laptop stand",
    cat: "Electronics",
    pri: "high",
    budget: "₹1,500",
    done: false
  }, {
    id: "s3",
    name: "Mechanical keyboard",
    cat: "Electronics",
    pri: "medium",
    budget: "₹5,000",
    done: false
  }, {
    id: "s4",
    name: "Desk organiser",
    cat: "Decor",
    pri: "low",
    budget: "₹800",
    done: false
  }, {
    id: "s5",
    name: "Running shoes",
    cat: "Wardrobe",
    pri: "high",
    budget: "₹4,000",
    done: false
  }, {
    id: "s6",
    name: "Wireless mouse",
    cat: "Electronics",
    pri: "medium",
    budget: "₹2,000",
    done: true
  }],
  family: [{
    id: "f1",
    member: "wife",
    area: "English & AI",
    goals: [{
      id: "fg1",
      title: "English fluency",
      p: 20
    }, {
      id: "fg2",
      title: "Master AI tools",
      p: 10
    }],
    sessions: [{
      id: "fs1",
      activity: "English practice",
      minutes: 30,
      done: false
    }, {
      id: "fs2",
      activity: "AI tools walkthrough",
      minutes: 45,
      done: false
    }]
  }, {
    id: "f2",
    member: "daughter",
    area: "Academics",
    goals: [{
      id: "fg3",
      title: "Maths — Grade+1",
      p: 35
    }, {
      id: "fg4",
      title: "Science curiosity",
      p: 25
    }, {
      id: "fg5",
      title: "Coding basics",
      p: 15
    }],
    sessions: [{
      id: "fs3",
      activity: "Maths practice",
      minutes: 30,
      done: true
    }, {
      id: "fs4",
      activity: "Science activity",
      minutes: 45,
      done: false
    }]
  }, {
    id: "f3",
    member: "mom",
    area: "Health",
    goals: [{
      id: "fg6",
      title: "Regular health check",
      p: 50
    }],
    sessions: [{
      id: "fs5",
      activity: "BP & sugar reminder",
      minutes: 10,
      done: false
    }]
  }, {
    id: "f4",
    member: "dad",
    area: "Health",
    goals: [{
      id: "fg7",
      title: "Regular health check",
      p: 50
    }],
    sessions: [{
      id: "fs6",
      activity: "Evening walk together",
      minutes: 20,
      done: false
    }]
  }],
  finance: {
    goals: [{
      id: "fi1",
      title: "Emergency fund",
      target: 300000,
      saved: 120000,
      dl: "2027-06-01",
      pri: "high",
      icon: "🛡"
    }, {
      id: "fi2",
      title: "Gold — 50g",
      target: 250000,
      saved: 50000,
      dl: "2028-01-01",
      pri: "medium",
      icon: "🥇"
    }, {
      id: "fi3",
      title: "SIP — Nifty 50",
      target: 500000,
      saved: 180000,
      dl: "2030-01-01",
      pri: "high",
      icon: "📈"
    }, {
      id: "fi4",
      title: "House renovation",
      target: 800000,
      saved: 50000,
      dl: "2028-06-01",
      pri: "medium",
      icon: "🏠"
    }, {
      id: "fi5",
      title: "Property purchase",
      target: 5000000,
      saved: 200000,
      dl: "2032-01-01",
      pri: "low",
      icon: "🏢"
    }, {
      id: "fi6",
      title: "Retirement corpus",
      target: 10000000,
      saved: 500000,
      dl: "2045-01-01",
      pri: "high",
      icon: "🎯"
    }],
    tasks: [{
      id: "ft1",
      name: "Review monthly budget",
      done: false,
      freq: "monthly",
      dl: ""
    }, {
      id: "ft2",
      name: "Check SIP performance",
      done: false,
      freq: "monthly",
      dl: ""
    }, {
      id: "ft3",
      name: "Pay LIC premium",
      done: false,
      freq: "yearly",
      dl: "2026-07-15"
    }, {
      id: "ft4",
      name: "File advance tax",
      done: true,
      freq: "quarterly",
      dl: "2026-06-15"
    }]
  },
  travel: [{
    id: "t1",
    name: "Goa family trip",
    type: "India",
    status: "planning",
    budget: "₹40,000",
    when: "Dec 2026",
    p: 15
  }, {
    id: "t2",
    name: "Manali — winter",
    type: "India",
    status: "wishlist",
    budget: "₹30,000",
    when: "Jan 2027",
    p: 5
  }, {
    id: "t3",
    name: "Rajasthan heritage",
    type: "India",
    status: "planning",
    budget: "₹35,000",
    when: "Oct 2026",
    p: 20
  }, {
    id: "t4",
    name: "Andaman Islands",
    type: "India",
    status: "wishlist",
    budget: "₹60,000",
    when: "Apr 2027",
    p: 0
  }, {
    id: "t5",
    name: "Thailand — Bangkok+Phuket",
    type: "Intl",
    status: "wishlist",
    budget: "₹1.2L",
    when: "2027",
    p: 0
  }, {
    id: "t6",
    name: "Kedarnath trek",
    type: "India",
    status: "planning",
    budget: "₹20,000",
    when: "May 2027",
    p: 10
  }],
  growth: {
    books: [{
      id: "bk1",
      title: "Atomic Habits",
      by: "James Clear",
      status: "reading",
      p: 65
    }, {
      id: "bk2",
      title: "Psychology of Money",
      by: "Morgan Housel",
      status: "wishlist",
      p: 0
    }, {
      id: "bk3",
      title: "Deep Work",
      by: "Cal Newport",
      status: "done",
      p: 100
    }],
    watch: [{
      id: "w1",
      title: "Attack on Titan",
      info: "S1–S4",
      status: "done",
      p: 100
    }, {
      id: "w2",
      title: "Jujutsu Kaisen",
      info: "S1–S3",
      status: "watching",
      p: 70
    }, {
      id: "w3",
      title: "Demon Slayer",
      info: "S1–S4",
      status: "wishlist",
      p: 0
    }],
    skills: [{
      id: "sk1",
      title: "Prompt Engineering",
      via: "Self-study",
      p: 40,
      dl: "2026-09-01"
    }, {
      id: "sk2",
      title: "Excel advanced",
      via: "YouTube",
      p: 25,
      dl: "2026-08-01"
    }, {
      id: "sk3",
      title: "Build AI tools",
      via: "Claude",
      p: 20,
      dl: "2026-12-01"
    }]
  },
  // ── UNIFIED TASK LIST ──────────────────────────────────────────────────────
  tasks: [
  // Business
  {
    id: "t1",
    name: "Update ledger entries",
    cat: "business",
    pri: "high",
    date: "",
    time: "",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t2",
    name: "Check stock items",
    cat: "business",
    pri: "high",
    date: "",
    time: "",
    done: false,
    note: "",
    subs: [{
      id: "t2a",
      name: "Verify raw material count",
      done: false
    }, {
      id: "t2b",
      name: "Update low-stock list",
      done: false
    }, {
      id: "t2c",
      name: "Place reorder if needed",
      done: false
    }]
  }, {
    id: "t3",
    name: "Bank entries & reconcile",
    cat: "business",
    pri: "medium",
    date: "",
    time: "",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t4",
    name: "Follow up payments",
    cat: "business",
    pri: "high",
    date: "2026-07-10",
    time: "",
    done: false,
    note: "",
    subs: [{
      id: "t4a",
      name: "Call Ramesh — invoice #47",
      done: false
    }, {
      id: "t4b",
      name: "Reminder to Sharma Co.",
      done: false
    }]
  }, {
    id: "t5",
    name: "Confirm item dispatch",
    cat: "business",
    pri: "medium",
    date: "2026-06-30",
    time: "",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t6",
    name: "Reply to client messages",
    cat: "business",
    pri: "medium",
    date: "",
    time: "",
    done: true,
    note: "",
    subs: []
  },
  // Health
  {
    id: "t7",
    name: "Take vitamins",
    cat: "health",
    pri: "medium",
    date: "",
    time: "08:00",
    done: false,
    note: "Vit D, Omega 3",
    subs: []
  }, {
    id: "t8",
    name: "Apply sunscreen",
    cat: "health",
    pri: "low",
    date: "",
    time: "08:30",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t9",
    name: "Track weight",
    cat: "health",
    pri: "medium",
    date: "",
    time: "07:00",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t10",
    name: "Night skin care routine",
    cat: "health",
    pri: "low",
    date: "",
    time: "22:00",
    done: true,
    note: "",
    subs: []
  },
  // Finance
  {
    id: "t11",
    name: "Pay LIC premium",
    cat: "finance",
    pri: "high",
    date: "2026-07-15",
    time: "",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t12",
    name: "File GST return (GSTR-3B)",
    cat: "finance",
    pri: "high",
    date: "2026-07-20",
    time: "",
    done: false,
    note: "",
    subs: [{
      id: "t12a",
      name: "Gather all invoices",
      done: false
    }, {
      id: "t12b",
      name: "Reconcile with CA",
      done: false
    }, {
      id: "t12c",
      name: "File on portal",
      done: false
    }]
  }, {
    id: "t13",
    name: "Review monthly budget",
    cat: "finance",
    pri: "medium",
    date: "",
    time: "",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t14",
    name: "Check SIP performance",
    cat: "finance",
    pri: "medium",
    date: "",
    time: "",
    done: false,
    note: "",
    subs: []
  },
  // Personal
  {
    id: "t15",
    name: "Dentist appointment",
    cat: "personal",
    pri: "high",
    date: "2026-07-05",
    time: "10:00",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t16",
    name: "Update wardrobe — shopping",
    cat: "personal",
    pri: "low",
    date: "",
    time: "",
    done: false,
    note: "",
    subs: []
  },
  // Family
  {
    id: "t17",
    name: "Wife English class",
    cat: "family",
    pri: "medium",
    date: "2026-07-08",
    time: "18:00",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t18",
    name: "Daughter Science fair prep",
    cat: "family",
    pri: "high",
    date: "2026-07-15",
    time: "09:00",
    done: false,
    note: "",
    subs: []
  },
  // Travel
  {
    id: "t19",
    name: "Goa trip — book hotel",
    cat: "travel",
    pri: "medium",
    date: "2026-08-01",
    time: "",
    done: false,
    note: "",
    subs: []
  }, {
    id: "t20",
    name: "Review SIP portfolio",
    cat: "finance",
    pri: "medium",
    date: "2026-07-31",
    time: "",
    done: false,
    note: "",
    subs: []
  }],
  scheduled: [],
  // kept for calendar backward compat
  bills: [{
    id: "bl1",
    name: "Health Insurance Premium",
    amount: "₹18,500",
    due: "2026-08-15",
    freq: "yearly",
    paid: false,
    cat: "Insurance"
  }, {
    id: "bl2",
    name: "LIC Life Insurance",
    amount: "₹12,000",
    due: "2026-07-15",
    freq: "yearly",
    paid: false,
    cat: "Insurance"
  }, {
    id: "bl3",
    name: "Income Tax Advance",
    amount: "₹25,000",
    due: "2026-09-15",
    freq: "quarterly",
    paid: false,
    cat: "Tax"
  }, {
    id: "bl4",
    name: "GST Return (GSTR-3B)",
    amount: "",
    due: "2026-07-20",
    freq: "monthly",
    paid: false,
    cat: "Tax"
  }, {
    id: "bl5",
    name: "Internet & phone",
    amount: "₹2,200",
    due: "2026-07-05",
    freq: "monthly",
    paid: true,
    cat: "Utility"
  }, {
    id: "bl6",
    name: "Vehicle insurance",
    amount: "₹8,400",
    due: "2026-11-01",
    freq: "yearly",
    paid: false,
    cat: "Insurance"
  }, {
    id: "bl7",
    name: "Professional tax",
    amount: "₹2,500",
    due: "2026-07-31",
    freq: "yearly",
    paid: false,
    cat: "Tax"
  }],
  journal: [{
    id: "j1",
    date: "2026-06-28",
    title: "Weekly reflection",
    mood: "😊",
    body: "Good week overall. Gym 3 times, SIP done. Need to focus more on family sessions.",
    tags: ["reflection", "weekly"]
  }, {
    id: "j2",
    date: "2026-06-25",
    title: "Business idea",
    mood: "💡",
    body: "Thought of automating the invoice reminder system. Could save 2 hours/week. Explore Zoho or make a simple script.",
    tags: ["business", "idea"]
  }],
  quickNotes: [{
    id: "qn1",
    text: "Call Sharma about pending payment — ₹15,000",
    done: false,
    pinned: true,
    created: "2026-06-28"
  }, {
    id: "qn2",
    text: "Check daughter's school fee deadline",
    done: false,
    pinned: false,
    created: "2026-06-27"
  }, {
    id: "qn3",
    text: "Buy new running shoes before Sunday",
    done: true,
    pinned: false,
    created: "2026-06-26"
  }],
  focusGoal: {
    id: "fi3",
    title: "SIP — Nifty 50",
    section: "finance",
    note: "Stay consistent with monthly SIP"
  },
  contributions: [{
    id: "c1",
    goalId: "fi1",
    amount: 5000,
    date: "2026-06-01",
    note: "June savings"
  }, {
    id: "c2",
    goalId: "fi3",
    amount: 5000,
    date: "2026-06-01",
    note: "June SIP"
  }],
  habitLinks: {
    "hg1": ["h2", "h3"],
    "hg3": ["h8"]
  },
  timeBlocks: [{
    id: "tb1",
    date: "2026-06-29",
    block: "morning",
    taskId: "b1",
    taskName: "Update ledger entries",
    color: C.blue
  }, {
    id: "tb2",
    date: "2026-06-29",
    block: "morning",
    taskId: "ht1",
    taskName: "Take vitamins",
    color: C.green
  }, {
    id: "tb3",
    date: "2026-06-29",
    block: "afternoon",
    taskId: "b4",
    taskName: "Follow up payments",
    color: C.blue
  }, {
    id: "tb4",
    date: "2026-06-29",
    block: "evening",
    taskId: "fs1",
    taskName: "English practice – Wife",
    color: C.pink
  }],
  docs: [{
    id: "d1",
    name: "Aadhaar Card",
    cat: "Identity",
    expiry: "",
    reminder: "",
    note: "Both copies saved",
    fileName: "",
    fileData: ""
  }, {
    id: "d2",
    name: "PAN Card",
    cat: "Identity",
    expiry: "",
    reminder: "",
    note: "",
    fileName: "",
    fileData: ""
  }, {
    id: "d3",
    name: "Passport",
    cat: "Identity",
    expiry: "2029-05-10",
    reminder: "2029-02-10",
    note: "Renewal 3 months before",
    fileName: "",
    fileData: ""
  }, {
    id: "d4",
    name: "Health Insurance Policy",
    cat: "Insurance",
    expiry: "2026-08-15",
    reminder: "2026-07-15",
    note: "Policy no: HI-2024-891",
    fileName: "",
    fileData: ""
  }, {
    id: "d5",
    name: "Vehicle RC",
    cat: "Vehicle",
    expiry: "",
    reminder: "",
    note: "KA-01-MH-5678",
    fileName: "",
    fileData: ""
  }, {
    id: "d6",
    name: "Last ITR Filed",
    cat: "Tax",
    expiry: "",
    reminder: "2027-07-01",
    note: "FY 2025-26",
    fileName: "",
    fileData: ""
  }]
};

// ── UTILS ─────────────────────────────────────────────────────────────────────
function pct(v, t) {
  return t ? Math.min(100, Math.round(v / t * 100)) : 0;
}
function fmtL(n) {
  return n >= 100000 ? "₹" + (n / 100000).toFixed(1) + "L" : "₹" + n.toLocaleString("en-IN");
}
function dLeft(d) {
  if (!d) return null;
  return Math.ceil((new Date(d) - new Date()) / 86400000);
}
function fmtDate(d) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${day} ${MONTHS[+m - 1]} ${y}`;
}
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// ── ATOMS ─────────────────────────────────────────────────────────────────────
function Bar({
  v,
  color,
  h = 4
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      borderRadius: 99,
      background: "#ECEEF4",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 99,
      background: color,
      width: Math.min(v || 0, 100) + "%",
      transition: "width .4s"
    }
  }));
}
function Ring({
  v,
  color,
  sz = 44
}) {
  const sw = 3.5,
    r = (sz - sw * 2) / 2,
    ci = 2 * Math.PI * r,
    val = Math.min(v || 0, 100);
  return /*#__PURE__*/React.createElement("svg", {
    width: sz,
    height: sz,
    style: {
      transform: "rotate(-90deg)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: sz / 2,
    cy: sz / 2,
    r: r,
    fill: "none",
    stroke: "#ECEEF4",
    strokeWidth: sw
  }), /*#__PURE__*/React.createElement("circle", {
    cx: sz / 2,
    cy: sz / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: sw,
    strokeDasharray: ci,
    strokeDashoffset: ci * (1 - val / 100),
    strokeLinecap: "round",
    style: {
      transition: "stroke-dashoffset .4s"
    }
  }), /*#__PURE__*/React.createElement("text", {
    x: "50%",
    y: "50%",
    textAnchor: "middle",
    dominantBaseline: "middle",
    style: {
      transform: "rotate(90deg)",
      transformOrigin: "50% 50%",
      fontSize: sz * .2,
      fill: color,
      fontWeight: 700
    }
  }, val, "%"));
}
function Tick({
  on,
  toggle,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      toggle();
    },
    style: {
      width: 24,
      height: 24,
      borderRadius: 7,
      flexShrink: 0,
      cursor: "pointer",
      border: `2px solid ${on ? color : "#D1D5DB"}`,
      background: on ? color : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .15s"
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: 12,
    height: 10,
    viewBox: "0 0 12 10"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "1,5 4.5,8.5 11,1",
    stroke: "#fff",
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function Tag({
  label,
  color
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 600,
      padding: "1px 5px",
      borderRadius: 99,
      background: color + "18",
      color,
      whiteSpace: "nowrap"
    }
  }, label);
}
function Due({
  dl
}) {
  if (!dl) return null;
  const d = dLeft(dl),
    color = d < 0 ? C.danger : d <= 2 ? C.warn : d <= 7 ? "#0284C7" : C.mute;
  const txt = d < 0 ? "Overdue" : d === 0 ? "Today" : d === 1 ? "Tomorrow" : `${d}d`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color,
      background: color + "18",
      padding: "1px 6px",
      borderRadius: 99
    }
  }, txt);
}
function Card({
  children,
  style = {},
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: C.card,
      borderRadius: R,
      border: `1px solid ${C.border}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      ...style,
      cursor: onClick ? "pointer" : undefined
    }
  }, children);
}

// ── SHEET ─────────────────────────────────────────────────────────────────────
function Sheet({
  open,
  onClose,
  title,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "flex-end"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      background: "#fff",
      borderRadius: "20px 20px 0 0",
      maxHeight: "88vh",
      overflowY: "auto",
      boxShadow: "0 -8px 40px rgba(0,0,0,0.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "10px 0 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 3,
      borderRadius: 99,
      background: "#E5E7EB"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: C.text
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "#F3F4F6",
      border: "none",
      borderRadius: 99,
      width: 28,
      height: 28,
      cursor: "pointer",
      color: C.sub,
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 40px"
    }
  }, children)));
}

// ── FORM ──────────────────────────────────────────────────────────────────────
const iSt = {
  width: "100%",
  padding: "12px 14px",
  border: "1.5px solid #E5E7EB",
  borderRadius: R,
  fontSize: 15,
  outline: "none",
  background: "#fff",
  color: C.text,
  boxSizing: "border-box"
};
const Inp = ({
  v,
  set,
  ph,
  type = "text"
}) => /*#__PURE__*/React.createElement("input", {
  type: type,
  value: v,
  onChange: e => set(e.target.value),
  placeholder: ph,
  style: iSt
});
const Sel = ({
  v,
  set,
  children
}) => /*#__PURE__*/React.createElement("select", {
  value: v,
  onChange: e => set(e.target.value),
  style: iSt
}, children);
const Lbl = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    fontWeight: 600,
    color: C.sub,
    marginBottom: 5,
    letterSpacing: .3
  }
}, children);
const G2 = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10
  }
}, children);
function SBtn({
  label,
  onClick,
  color,
  ghost
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: "100%",
      padding: "13px",
      borderRadius: R,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
      marginTop: 4,
      background: ghost ? "#F3F4F6" : color || C.text,
      color: ghost ? C.sub : "#fff",
      boxShadow: ghost ? "none" : `0 2px 10px ${color || C.text}33`
    }
  }, label);
}
function Hdr({
  title,
  sub,
  color,
  onAdd
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      letterSpacing: -.5
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.sub,
      marginTop: 2
    }
  }, sub), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 2,
      borderRadius: 99,
      background: color,
      marginTop: 6
    }
  })), onAdd && /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    style: {
      background: C.text,
      color: "#fff",
      border: "none",
      borderRadius: R,
      padding: "8px 14px",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer",
      flexShrink: 0
    }
  }, "+ Add"));
}
function Stats({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${items.length},1fr)`,
      gap: 8,
      marginBottom: 18
    }
  }, items.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.label,
    style: {
      padding: "11px 10px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: s.color,
      lineHeight: 1
    }
  }, s.val), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: C.mute,
      marginTop: 3,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: .3
    }
  }, s.label))));
}
function Tabs({
  tabs,
  active,
  set,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: "#F3F4F6",
      borderRadius: 10,
      padding: 3,
      marginBottom: 16,
      gap: 2
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => set(t.id),
    style: {
      flex: 1,
      padding: "8px 4px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 12,
      transition: "all .15s",
      background: active === t.id ? color : "transparent",
      color: active === t.id ? "#fff" : C.sub
    }
  }, t.label)));
}

// ── SUB-GOALS ─────────────────────────────────────────────────────────────────
function SubGoals({
  subs,
  onToggle,
  onAdd,
  onDel,
  color
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const done = subs.filter(s => s.done).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: `1px dashed ${C.border}`
    }
  }, subs.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.sub
    }
  }, "Sub-tasks"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 99,
      background: "#ECEEF4",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 99,
      background: color,
      width: pct(done, subs.length) + "%",
      transition: "width .3s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: C.sub
    }
  }, done, "/", subs.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, subs.map(sg => /*#__PURE__*/React.createElement("div", {
    key: sg.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "5px 8px",
      borderRadius: 8,
      background: "#F9FAFB"
    }
  }, /*#__PURE__*/React.createElement(Tick, {
    on: sg.done,
    toggle: () => onToggle(sg.id),
    color: color
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 12,
      color: sg.done ? C.mute : C.text,
      textDecoration: sg.done ? "line-through" : "none"
    }
  }, sg.name), /*#__PURE__*/React.createElement("button", {
    onClick: () => onDel(sg.id),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 12,
      cursor: "pointer",
      padding: "2px 4px"
    }
  }, "✕")))), adding ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Sub-task…",
    autoFocus: true,
    onKeyDown: e => {
      if (e.key === "Enter" && name.trim()) {
        onAdd(name);
        setName("");
        setAdding(false);
      }
      if (e.key === "Escape") {
        setAdding(false);
        setName("");
      }
    },
    style: {
      ...iSt,
      padding: "7px 10px",
      fontSize: 13,
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (name.trim()) {
        onAdd(name);
        setName("");
        setAdding(false);
      }
    },
    style: {
      background: color,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "7px 12px",
      fontWeight: 700,
      fontSize: 12,
      cursor: "pointer"
    }
  }, "✓"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setAdding(false);
      setName("");
    },
    style: {
      background: "#F3F4F6",
      color: C.sub,
      border: "none",
      borderRadius: 8,
      padding: "7px 10px",
      fontWeight: 700,
      fontSize: 12,
      cursor: "pointer"
    }
  }, "✕")) : /*#__PURE__*/React.createElement("button", {
    onClick: () => setAdding(true),
    style: {
      marginTop: 6,
      background: "none",
      border: `1px dashed ${C.border}`,
      borderRadius: 8,
      width: "100%",
      padding: "6px",
      fontSize: 11,
      color: C.mute,
      cursor: "pointer"
    }
  }, "+ Add sub-task"));
}

// ── TASK CARD (expandable with sub-goals) ─────────────────────────────────────
function TCard({
  task,
  onToggle,
  onToggleSub,
  onAddSub,
  onDelSub,
  onDelete,
  color
}) {
  const [open, setOpen] = useState(false);
  const subDone = (task.subs || []).filter(s => s.done).length;
  const subTotal = (task.subs || []).length;
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tick, {
    on: task.done,
    toggle: onToggle,
    color: color
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    },
    onClick: () => setOpen(o => !o)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: task.done ? C.mute : C.text,
      textDecoration: task.done ? "line-through" : "none"
    }
  }, task.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      marginTop: 3,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, task.pri && /*#__PURE__*/React.createElement(Tag, {
    label: PRI[task.pri].label,
    color: PRI[task.pri].c
  }), task.dl && /*#__PURE__*/React.createElement(Due, {
    dl: task.dl
  }), task.time && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: C.mute
    }
  }, "⏰ ", task.time), subTotal > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: color
    }
  }, subDone, "/", subTotal, " subs"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.mute,
      fontSize: 13,
      padding: "2px 4px"
    }
  }, open ? "▲" : "▼"), /*#__PURE__*/React.createElement("button", {
    onClick: onDelete,
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 13,
      cursor: "pointer",
      padding: "2px 4px"
    }
  }, "✕")), task.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.sub,
      marginTop: 4,
      paddingLeft: 34
    }
  }, task.note)), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 14px 12px",
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement(SubGoals, {
    subs: task.subs || [],
    onToggle: sid => onToggleSub(task.id, sid),
    onAdd: n => onAddSub(task.id, n),
    onDel: sid => onDelSub(task.id, sid),
    color: color
  })));
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
// ── PROGRESS CONTROL (shared) ────────────────────────────────────────────────
function ProgCtl({
  value,
  onChange,
  color
}) {
  const v = Math.max(0, Math.min(100, value || 0));
  function step(d) {
    onChange(Math.max(0, Math.min(100, v + d)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => step(-5),
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      border: `1.5px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontWeight: 800,
      fontSize: 16,
      color: C.sub,
      flexShrink: 0
    }
  }, "−"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "100",
    step: "5",
    value: v,
    onChange: e => onChange(+e.target.value),
    style: {
      flex: 1,
      accentColor: color,
      height: 26
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => step(5),
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      border: `1.5px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontWeight: 800,
      fontSize: 16,
      color: C.sub,
      flexShrink: 0
    }
  }, "+"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color,
      width: 38,
      textAlign: "right",
      flexShrink: 0
    }
  }, v, "%"));
}
function Dashboard({
  data,
  go,
  goCalendar
}) {
  const h = data.habits,
    dH = h.filter(x => x.done).length;
  const b = (data.tasks || []).filter(t => t.cat === "business"),
    dB = b.filter(x => x.done).length;
  const now = new Date(),
    hr = now.getHours();
  const isMorning = hr < 10;
  const greet = hr < 12 ? "Good Morning ☀️" : hr < 17 ? "Good Afternoon" : "Good Evening 🌙";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const week = days.map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    const yr = d.getFullYear(),
      mo = String(d.getMonth() + 1).padStart(2, "0"),
      dy = String(d.getDate()).padStart(2, "0");
    return {
      d: d.getDate(),
      l: days[i][0],
      today: d.getDate() === now.getDate() && d.getMonth() === now.getMonth(),
      dateStr: `${yr}-${mo}-${dy}`
    };
  });
  const overdue = b.filter(t => !t.done && t.dl && dLeft(t.dl) < 0).length;
  const billsDue = data.bills.filter(b => !b.paid && b.due && dLeft(b.due) <= 7 && dLeft(b.due) >= 0).length;
  const totalSaved = data.finance.goals.reduce((s, g) => s + g.saved, 0);
  const todayEvts = data.scheduled.filter(t => t.date === todayStr());
  const [showBrief, setShowBrief] = useState(isMorning);

  // Life Balance Wheel data
  const areaScores = {
    habits: pct(dH, h.length),
    business: pct(dB, b.length),
    health: Math.round(data.health.goals.reduce((s, g) => s + g.p, 0) / Math.max(data.health.goals.length, 1)),
    family: Math.round(data.family.reduce((s, f) => s + f.sessions.filter(x => x.done).length, 0) / Math.max(data.family.reduce((s, f) => s + f.sessions.length, 0), 1) * 100),
    finance: pct(totalSaved, data.finance.goals.reduce((s, g) => s + g.target, 0)),
    travel: Math.round(data.travel.reduce((s, t) => s + t.p, 0) / Math.max(data.travel.length, 1)),
    growth: Math.round([...data.growth.books, ...data.growth.watch, ...data.growth.skills].reduce((s, i) => s + i.p, 0) / Math.max([...data.growth.books, ...data.growth.watch, ...data.growth.skills].length, 1)),
    shopping: pct(data.shopping.filter(s => s.done).length, data.shopping.length)
  };
  const dailyScore = Math.round(Object.values(areaScores).reduce((s, v) => s + v, 0) / Object.keys(areaScores).length);

  // SVG Life Balance Wheel
  function BalanceWheel() {
    const areas = Object.entries(areaScores);
    const n = areas.length,
      cx = 100,
      cy = 100,
      maxR = 80,
      minR = 10;
    const slices = areas.map(([key, score], i) => {
      const angle = 2 * Math.PI / n * i - Math.PI / 2;
      const nextAngle = 2 * Math.PI / n * (i + 1) - Math.PI / 2;
      const r = minR + (maxR - minR) * (score / 100);
      const x1 = cx + maxR * Math.cos(angle),
        y1 = cy + maxR * Math.sin(angle);
      const x2 = cx + maxR * Math.cos(nextAngle),
        y2 = cy + maxR * Math.sin(nextAngle);
      const ix1 = cx + r * Math.cos(angle),
        iy1 = cy + r * Math.sin(angle);
      const ix2 = cx + r * Math.cos(nextAngle),
        iy2 = cy + r * Math.sin(nextAngle);
      const col = SEC[key]?.c || C.blue;
      // Label position
      const midAngle = (angle + nextAngle) / 2;
      const lx = cx + (maxR + 14) * Math.cos(midAngle),
        ly = cy + (maxR + 14) * Math.sin(midAngle);
      return {
        key,
        score,
        col,
        ix1,
        iy1,
        ix2,
        iy2,
        x1,
        y1,
        x2,
        y2,
        lx,
        ly,
        midAngle,
        r,
        angle,
        nextAngle
      };
    });
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 200 200",
      style: {
        width: "100%",
        maxWidth: 200
      }
    }, [20, 40, 60, 80, 100].map(pct2 => {
      const r2 = minR + (maxR - minR) * (pct2 / 100);
      return /*#__PURE__*/React.createElement("circle", {
        key: pct2,
        cx: cx,
        cy: cy,
        r: r2,
        fill: "none",
        stroke: "#ECEEF4",
        strokeWidth: 0.5
      });
    }), slices.map(s => /*#__PURE__*/React.createElement("line", {
      key: s.key + "l",
      x1: cx,
      y1: cy,
      x2: cx + maxR * Math.cos(s.angle),
      y2: cy + maxR * Math.sin(s.angle),
      stroke: "#ECEEF4",
      strokeWidth: 0.5
    })), slices.map(s => {
      const large = s.nextAngle - s.angle > Math.PI ? 1 : 0;
      return /*#__PURE__*/React.createElement("path", {
        key: s.key,
        fill: s.col + "33",
        stroke: s.col,
        strokeWidth: 1.5,
        d: `M${cx},${cy} L${s.ix1},${s.iy1} A${s.r},${s.r} 0 ${large},1 ${s.ix2},${s.iy2} Z`
      });
    }), slices.map(s => /*#__PURE__*/React.createElement("text", {
      key: s.key + "t",
      x: s.lx,
      y: s.ly,
      textAnchor: "middle",
      dominantBaseline: "middle",
      fontSize: 7,
      fontWeight: 700,
      fill: s.col
    }, SEC[s.key]?.icon)), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy - 6,
      textAnchor: "middle",
      fontSize: 18,
      fontWeight: 900,
      fill: C.text
    }, dailyScore), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy + 8,
      textAnchor: "middle",
      fontSize: 7,
      fontWeight: 600,
      fill: C.mute
    }, "DAILY SCORE"));
  }

  // Morning Brief sheet
  const top3 = [...b.filter(t => !t.done && t.pri === "high").slice(0, 2).map(t => ({
    label: t.name,
    color: C.blue,
    icon: "💼"
  })), ...(data.tasks || []).filter(t => t.cat === "health" && !t.done).slice(0, 1).map(t => ({
    label: t.name,
    color: C.green,
    icon: "🏃"
  }))].slice(0, 3);
  return /*#__PURE__*/React.createElement("div", null, showBrief && /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.text,
      borderRadius: R,
      padding: 18,
      marginBottom: 16,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowBrief(false),
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      background: "rgba(255,255,255,.15)",
      border: "none",
      borderRadius: 99,
      width: 24,
      height: 24,
      cursor: "pointer",
      color: "#fff",
      fontSize: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "✕"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,.5)",
      marginBottom: 2,
      fontWeight: 700,
      letterSpacing: .5,
      textTransform: "uppercase"
    }
  }, "Morning Brief"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: "#fff",
      marginBottom: 12,
      letterSpacing: -.5
    }
  }, greet), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14
    }
  }, [{
    v: `${dH}/${h.length}`,
    l: "Habits",
    c: C.violet
  }, {
    v: todayEvts.length,
    l: "Scheduled",
    c: C.teal
  }, {
    v: billsDue,
    l: "Bills due",
    c: C.warn
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    style: {
      flex: 1,
      background: "rgba(255,255,255,.08)",
      borderRadius: 10,
      padding: "10px 8px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: s.c
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,.5)",
      marginTop: 2,
      fontWeight: 600
    }
  }, s.l)))), top3.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "rgba(255,255,255,.4)",
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 8
    }
  }, "Top priorities today"), top3.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 0",
      borderTop: i > 0 ? "1px solid rgba(255,255,255,.08)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, t.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "rgba(255,255,255,.85)"
    }
  }, t.label))))), !showBrief && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginBottom: 1
    }
  }, now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      letterSpacing: -.5
    }
  }, greet)), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "12px 8px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, week.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => goCalendar(w.dateStr),
    style: {
      flex: 1,
      textAlign: "center",
      padding: "5px 2px",
      borderRadius: 8,
      cursor: "pointer",
      background: w.today ? C.text : "transparent",
      transition: "opacity .15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 600,
      color: w.today ? "rgba(255,255,255,.6)" : C.mute,
      marginBottom: 2
    }
  }, w.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: w.today ? "#fff" : C.text
    }
  }, w.d))))), data.focusGoal && /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      marginBottom: 14,
      borderLeft: `3px solid ${C.indigo}`,
      borderRadius: `0 ${R}px ${R}px 0`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 4
    }
  }, "🎯 Focus of the Day"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: C.text
    }
  }, data.focusGoal.title), data.focusGoal.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.sub,
      marginTop: 3
    }
  }, data.focusGoal.note), /*#__PURE__*/React.createElement("button", {
    onClick: () => go("matrix"),
    style: {
      marginTop: 8,
      background: "#F3F4F6",
      border: "none",
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 11,
      fontWeight: 700,
      color: C.sub,
      cursor: "pointer"
    }
  }, "Open Matrix →")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 14
    }
  }, [{
    icon: "⚡",
    label: "Routines",
    val: `${dH}/${h.length}`,
    color: SEC.habits.c,
    p: pct(dH, h.length),
    tab: "habits"
  }, {
    icon: "💼",
    label: "Business",
    val: `${dB}/${b.length}`,
    color: SEC.business.c,
    p: pct(dB, b.length),
    tab: "business"
  }, {
    icon: "💳",
    label: "Bills due",
    val: billsDue,
    color: billsDue > 0 ? C.warn : C.ok,
    p: 0,
    tab: "docs"
  }, {
    icon: "⚠️",
    label: "Overdue",
    val: overdue,
    color: overdue > 0 ? C.danger : C.ok,
    p: 0,
    tab: "business"
  }].map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.label,
    style: {
      padding: 14
    },
    onClick: () => go(s.tab)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 3
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: s.color,
      letterSpacing: -.5
    }
  }, s.val)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, s.icon)), s.p > 0 && /*#__PURE__*/React.createElement(Bar, {
    v: s.p,
    color: s.color,
    h: 3
  })))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 16,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text
    }
  }, "Life Balance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.sub
    }
  }, "Score: ", dailyScore, "/100")), /*#__PURE__*/React.createElement("button", {
    onClick: () => go("review"),
    style: {
      background: "#F3F4F6",
      border: "none",
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 11,
      fontWeight: 700,
      color: C.sub,
      cursor: "pointer"
    }
  }, "Weekly Review →")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(BalanceWheel, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, Object.entries(areaScores).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: SEC[k]?.c || C.blue,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.sub,
      width: 48
    }
  }, SEC[k]?.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.text
    }
  }, v, "%")))))), todayEvts.length > 0 && /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, "📅 Today's Schedule"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go("calendar"),
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.sub,
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, "All →")), todayEvts.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 0",
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 3,
      height: 20,
      borderRadius: 99,
      background: t.color,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: C.text
    }
  }, t.name), t.time && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.mute
    }
  }, "⏰ ", t.time))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, "⚡ Today's Routines"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go("habits"),
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.sub,
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, "All →")), h.slice(0, 4).map((hb, i) => /*#__PURE__*/React.createElement("div", {
    key: hb.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 0",
      borderTop: i > 0 ? `1px solid ${C.border}` : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      width: 20,
      textAlign: "center"
    }
  }, hb.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 12,
      fontWeight: 500,
      color: hb.done ? C.mute : C.text,
      textDecoration: hb.done ? "line-through" : "none"
    }
  }, hb.name), hb.streak > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.warn,
      fontWeight: 700
    }
  }, "🔥", hb.streak), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 17,
      height: 17,
      borderRadius: 5,
      flexShrink: 0,
      background: hb.done ? SEC.habits.c : "transparent",
      border: `2px solid ${hb.done ? SEC.habits.c : C.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, hb.done && /*#__PURE__*/React.createElement("svg", {
    width: 9,
    height: 8,
    viewBox: "0 0 9 8"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: ".5,4 3,6.5 8.5,.5",
    stroke: "#fff",
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, "💰 Finance"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go("finance"),
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.sub,
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, "All →")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: C.indigo,
      marginBottom: 10,
      letterSpacing: -.5
    }
  }, fmtL(totalSaved)), data.finance.goals.slice(0, 2).map(g => {
    const p = pct(g.saved, g.target);
    return /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: C.text
      }
    }, g.icon, " ", g.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.sub
      }
    }, p, "%")), /*#__PURE__*/React.createElement(Bar, {
      v: p,
      color: C.indigo
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 10
    }
  }, "Sections"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 8
    }
  }, Object.entries(SEC).map(([id, s]) => /*#__PURE__*/React.createElement(Card, {
    key: id,
    style: {
      padding: 12,
      display: "flex",
      alignItems: "center",
      gap: 10
    },
    onClick: () => go(id)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, s.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.text
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 2,
      borderRadius: 99,
      background: s.c,
      marginTop: 3
    }
  }))))));
}

// ── UNIFIED TASKS ─────────────────────────────────────────────────────────────
function Tasks({
  tasks,
  setTasks,
  initialCat
}) {
  const [filter, setFilter] = useState(initialCat || "all");
  const [sortBy, setSortBy] = useState("priority");
  const [sheet, setSheet] = useState(false);
  const [editId, setEditId] = useState(null);
  const BLANK = {
    name: "",
    cat: "business",
    pri: "high",
    date: "",
    time: "",
    note: "",
    subs: []
  };
  const [f, setF] = useState(BLANK);
  const filtered = tasks.filter(t => filter === "all" ? true : filter === "done" ? t.done : !t.done && t.cat === filter).sort((a, b) => {
    if (sortBy === "priority") {
      const o = {
        high: 0,
        medium: 1,
        low: 2
      };
      return (o[a.pri] || 1) - (o[b.pri] || 1);
    }
    if (sortBy === "date") {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    }
    return (a.cat || "").localeCompare(b.cat || "");
  });
  const total = tasks.filter(t => !t.done).length;
  const doneCount = tasks.filter(t => t.done).length;
  const overdue = tasks.filter(t => !t.done && t.date && dLeft(t.date) < 0).length;
  const todayCount = tasks.filter(t => !t.done && t.date === todayStr()).length;
  function save() {
    if (!f.name.trim()) return;
    if (editId) {
      setTasks(p => p.map(t => t.id === editId ? {
        ...t,
        ...f
      } : t));
      setEditId(null);
    } else setTasks(p => [{
      ...f,
      id: "t" + Date.now(),
      done: false
    }, ...p]);
    setF(BLANK);
    setSheet(false);
  }
  function openEdit(t) {
    setEditId(t.id);
    setF({
      name: t.name,
      cat: t.cat,
      pri: t.pri,
      date: t.date || "",
      time: t.time || "",
      note: t.note || "",
      subs: t.subs || []
    });
    setSheet(true);
  }
  function toggleDone(id) {
    setTasks(p => p.map(t => t.id === id ? {
      ...t,
      done: !t.done
    } : t));
  }
  function del(id) {
    setTasks(p => p.filter(t => t.id !== id));
  }
  function toggleSub(tid, sid) {
    setTasks(p => p.map(t => t.id !== tid ? t : {
      ...t,
      subs: (t.subs || []).map(s => s.id === sid ? {
        ...s,
        done: !s.done
      } : s)
    }));
  }
  function addSub(tid, name) {
    setTasks(p => p.map(t => t.id !== tid ? t : {
      ...t,
      subs: [...(t.subs || []), {
        id: "sg" + Date.now(),
        name,
        done: false
      }]
    }));
  }
  function delSub(tid, sid) {
    setTasks(p => p.map(t => t.id !== tid ? t : {
      ...t,
      subs: (t.subs || []).filter(s => s.id !== sid)
    }));
  }
  function TaskItem({
    t
  }) {
    const [open, setOpen] = useState(false);
    const cat = taskCat(t.cat);
    const subDone = (t.subs || []).filter(s => s.done).length;
    const subTotal = (t.subs || []).length;
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 8,
        overflow: "hidden",
        borderLeft: `3px solid ${PRI[t.pri]?.c || C.mute}`,
        borderRadius: `0 ${R}px ${R}px 0`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Tick, {
      on: t.done,
      toggle: () => toggleDone(t.id),
      color: PRI[t.pri]?.c || C.mute
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      },
      onClick: () => setOpen(o => !o)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: t.done ? C.mute : C.text,
        textDecoration: t.done ? "line-through" : "none",
        lineHeight: 1.3
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5,
        marginTop: 4,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: cat.color,
        background: cat.color + "18",
        padding: "1px 6px",
        borderRadius: 99
      }
    }, cat.icon, " ", cat.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: PRI[t.pri]?.c,
        background: PRI[t.pri]?.c + "18",
        padding: "1px 6px",
        borderRadius: 99
      }
    }, t.pri === "high" ? "🔴 High" : t.pri === "medium" ? "🟡 Med" : "🟢 Low"), t.date && /*#__PURE__*/React.createElement(Due, {
      dl: t.date
    }), t.time && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.mute
      }
    }, "⏰", t.time), subTotal > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: C.sub
      }
    }, subDone, "/", subTotal, " subs")), t.note && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.sub,
        marginTop: 3
      }
    }, t.note)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 1,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        setOpen(o => !o);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.mute,
        fontSize: 11,
        padding: "4px 2px"
      }
    }, open ? "▲" : "▼"), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        openEdit(t);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.mute,
        fontSize: 13,
        padding: "4px 2px"
      }
    }, "✏️"), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        del(t.id);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.mute,
        fontSize: 13,
        padding: "4px 2px"
      }
    }, "✕")))), open && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px 12px",
        borderTop: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement(SubGoals, {
      subs: t.subs || [],
      onToggle: sid => toggleSub(t.id, sid),
      onAdd: n => addSub(t.id, n),
      onDel: sid => delSub(t.id, sid),
      color: taskCat(t.cat).color
    })));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      letterSpacing: -.5
    }
  }, "Tasks"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.sub,
      marginTop: 2
    }
  }, "All tasks · One place"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 2,
      borderRadius: 99,
      background: C.text,
      marginTop: 6
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setEditId(null);
      setF(BLANK);
      setSheet(true);
    },
    style: {
      background: C.text,
      color: "#fff",
      border: "none",
      borderRadius: R,
      padding: "8px 14px",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "+ Task")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 8,
      marginBottom: 16
    }
  }, [{
    v: total,
    l: "Active",
    c: C.text
  }, {
    v: todayCount,
    l: "Today",
    c: C.ok
  }, {
    v: overdue,
    l: "Overdue",
    c: overdue > 0 ? C.danger : C.mute
  }, {
    v: doneCount,
    l: "Done",
    c: C.mute
  }].map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.l,
    style: {
      padding: "10px 8px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: s.c,
      lineHeight: 1
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: C.mute,
      marginTop: 3,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: .3
    }
  }, s.l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: 10,
      paddingBottom: 4,
      scrollbarWidth: "none"
    }
  }, [{
    id: "all",
    label: "All",
    icon: "📋",
    color: C.text
  }, ...TASK_CATS, {
    id: "done",
    label: "Done",
    icon: "✓",
    color: C.ok
  }].map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    onClick: () => setFilter(c.id),
    style: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "6px 12px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11,
      transition: "all .15s",
      background: filter === c.id ? c.color : "#F3F4F6",
      color: filter === c.id ? "#fff" : C.sub
    }
  }, /*#__PURE__*/React.createElement("span", null, c.icon), /*#__PURE__*/React.createElement("span", null, c.label), c.id !== "all" && c.id !== "done" && /*#__PURE__*/React.createElement("span", {
    style: {
      background: filter === c.id ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.08)",
      borderRadius: 99,
      padding: "0 5px",
      fontSize: 10,
      fontWeight: 700
    }
  }, tasks.filter(t => !t.done && t.cat === c.id).length)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.mute,
      fontWeight: 600,
      flexShrink: 0
    }
  }, "Sort:"), [{
    id: "priority",
    l: "Priority"
  }, {
    id: "date",
    l: "Date"
  }, {
    id: "cat",
    l: "Category"
  }].map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    onClick: () => setSortBy(s.id),
    style: {
      padding: "5px 10px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 700,
      background: sortBy === s.id ? C.text : "#F3F4F6",
      color: sortBy === s.id ? "#fff" : C.sub,
      transition: "all .15s"
    }
  }, s.l))), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 8
    }
  }, filter === "done" ? "🏆" : filter === "all" ? "📋" : "📁"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, filter === "done" ? "No completed tasks yet" : filter === "all" ? "No tasks yet" : "No " + filter + " tasks"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 4
    }
  }, "Tap + Task to add one")), filtered.map(t => /*#__PURE__*/React.createElement(TaskItem, {
    key: t.id,
    t: t
  })), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => {
      setSheet(false);
      setF(BLANK);
      setEditId(null);
    },
    title: editId ? "Edit Task" : "New Task"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Task name"), /*#__PURE__*/React.createElement(Inp, {
    v: f.name,
    set: v => setF(p => ({
      ...p,
      name: v
    })),
    ph: "e.g. Call client about payment"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Category"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 6
    }
  }, TASK_CATS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    onClick: () => setF(p => ({
      ...p,
      cat: c.id
    })),
    style: {
      padding: "10px 4px",
      borderRadius: 10,
      border: `1.5px solid ${f.cat === c.id ? c.color : C.border}`,
      background: f.cat === c.id ? c.color + "15" : "#fff",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      transition: "all .15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, c.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: f.cat === c.id ? c.color : C.sub
    }
  }, c.label))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Priority"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, Object.entries(PRI).map(([k, v]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setF(p => ({
      ...p,
      pri: k
    })),
    style: {
      flex: 1,
      padding: "10px 4px",
      borderRadius: 10,
      border: `1.5px solid ${f.pri === k ? v.c : C.border}`,
      background: f.pri === k ? v.c + "15" : "#fff",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      transition: "all .15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, k === "high" ? "🔴" : k === "medium" ? "🟡" : "🟢"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: f.pri === k ? v.c : C.sub
    }
  }, v.label))))), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Date (opt)"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: f.date,
    set: v => setF(p => ({
      ...p,
      date: v
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Time (opt)"), /*#__PURE__*/React.createElement(Inp, {
    type: "time",
    v: f.time,
    set: v => setF(p => ({
      ...p,
      time: v
    }))
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Note (opt)"), /*#__PURE__*/React.createElement(Inp, {
    v: f.note,
    set: v => setF(p => ({
      ...p,
      note: v
    })),
    ph: "Any extra context…"
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: editId ? "Save Changes" : "Add Task",
    color: C.text,
    onClick: save
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => {
      setSheet(false);
      setF(BLANK);
      setEditId(null);
    }
  }))));
}

// ── HABIT FORM (top-level — stable identity across re-renders) ──────────────
function HabitForm({
  f,
  setF,
  col,
  CATS,
  ICON_MAP,
  ALL_DAYS,
  FREQ_OPTS,
  toggleFreqDay,
  onSave,
  onCancel,
  saveLabel
}) {
  const icons = ICON_MAP[f.cat] || ICON_MAP.Custom;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Category"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, CATS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setF(p => ({
      ...p,
      cat: c,
      icon: ICON_MAP[c]?.[0] || "⭐"
    })),
    style: {
      padding: "6px 10px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 700,
      background: f.cat === c ? col : "#F3F4F6",
      color: f.cat === c ? "#fff" : C.sub,
      transition: "all .15s"
    }
  }, c)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Icon"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, icons.map(ic => /*#__PURE__*/React.createElement("button", {
    key: ic,
    onClick: () => setF(p => ({
      ...p,
      icon: ic
    })),
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      border: `2px solid ${f.icon === ic ? col : C.border}`,
      background: f.icon === ic ? col + "15" : "#fff",
      cursor: "pointer",
      fontSize: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .15s"
    }
  }, ic)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Habit name"), /*#__PURE__*/React.createElement(Inp, {
    v: f.name,
    set: v => setF(p => ({
      ...p,
      name: v
    })),
    ph: "e.g. Morning walk 30 min"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Reminder time"), /*#__PURE__*/React.createElement(Inp, {
    type: "time",
    v: f.time,
    set: v => setF(p => ({
      ...p,
      time: v
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Frequency"), /*#__PURE__*/React.createElement(Sel, {
    v: f.freq,
    set: v => setF(p => ({
      ...p,
      freq: v
    }))
  }, FREQ_OPTS.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.v,
    value: o.v
  }, o.l))))), f.freq === "days" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Which days?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, ALL_DAYS.map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => toggleFreqDay(d),
    style: {
      flex: 1,
      padding: "8px 2px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 700,
      background: f.days.includes(d) ? col : "#F3F4F6",
      color: f.days.includes(d) ? "#fff" : C.sub,
      transition: "all .15s"
    }
  }, d.slice(0, 1))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Note (opt)"), /*#__PURE__*/React.createElement(Inp, {
    v: f.note,
    set: v => setF(p => ({
      ...p,
      note: v
    })),
    ph: "Any context…"
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: saveLabel,
    color: col,
    onClick: onSave
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: onCancel
  }));
}
function Habits({
  habits,
  set,
  habitLog,
  setHabitLog
}) {
  const col = SEC.habits.c;
  const [view, setView] = useState("today");
  const [sheet, setSheet] = useState(false);
  const [editSheet, setEditSheet] = useState(null); // habit being edited
  const BLANK = {
    name: "",
    icon: "🌟",
    time: "",
    freq: "daily",
    days: [],
    cat: "Health",
    note: ""
  };
  const [f, setF] = useState(BLANK);
  const CATS = ["Morning", "Night", "Fitness", "Health", "Mind", "Learning", "Finance", "Social", "Custom"];
  const ICON_MAP = {
    Morning: ["🌅", "☀️", "🌤", "🛏", "⏰", "🧴"],
    Night: ["🌙", "🦷", "📵", "😴", "🕯", "🌛"],
    Fitness: ["💪", "🚶", "🏃", "🚴", "🏋️", "🤸", "🧘", "🚿", "⚽", "🥊"],
    Health: ["💊", "💧", "🥗", "🍎", "🩺", "❤️", "🩻", "😤"],
    Mind: ["🧘", "📿", "🧠", "✍️", "🎯", "💭", "🕊", "☮️"],
    Learning: ["📖", "📚", "✏️", "🎓", "💡", "🔬", "🎨", "🎵", "💻"],
    Finance: ["💰", "💳", "📊", "📈", "🏦", "💵", "🪙"],
    Social: ["👨‍👩‍👧", "📞", "🤝", "💌", "🎉", "🫂"],
    Custom: ["⭐", "🌟", "✨", "🏆", "🎖", "🔥", "💫", "⚡", "🎯", "🛡"]
  };
  const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const FREQ_OPTS = [{
    v: "daily",
    l: "Every day"
  }, {
    v: "weekdays",
    l: "Weekdays (Mon–Fri)"
  }, {
    v: "weekends",
    l: "Weekends (Sat–Sun)"
  }, {
    v: "days",
    l: "Specific days"
  }];
  const done = habits.filter(h => h.done).length;
  const topStreak = habits.reduce((m, h) => h.streak > m ? h.streak : m, 0);

  // Weekly log helpers
  const now2 = new Date();
  const weekDays = Array.from({
    length: 7
  }, (_, i) => {
    const d = new Date(now2);
    d.setDate(now2.getDate() - 6 + i);
    const yr = d.getFullYear(),
      mo = String(d.getMonth() + 1).padStart(2, "0"),
      dy = String(d.getDate()).padStart(2, "0");
    return {
      ds: `${yr}-${mo}-${dy}`,
      label: ALL_DAYS[(d.getDay() + 6) % 7].slice(0, 2),
      date: d.getDate(),
      isToday: d.toISOString().slice(0, 10) === todayStr()
    };
  });
  function isDone(hid, ds) {
    if (ds === todayStr()) return habits.find(h => h.id === hid)?.done || false;
    return habitLog[hid + "_" + ds] || false;
  }
  function toggleDay(hid, ds) {
    if (ds === todayStr()) set(p => p.map(h => h.id === hid ? {
      ...h,
      done: !h.done,
      streak: !h.done ? h.streak + 1 : Math.max(0, h.streak - 1)
    } : h));else setHabitLog(p => ({
      ...p,
      [hid + "_" + ds]: !p[hid + "_" + ds]
    }));
  }
  function addHabit() {
    if (!f.name.trim()) return;
    set(p => [...p, {
      ...f,
      id: "h" + Date.now(),
      streak: 0,
      done: false
    }]);
    setF(BLANK);
    setSheet(false);
  }
  function saveEdit() {
    if (!f.name.trim()) return;
    set(p => p.map(h => h.id === editSheet ? {
      ...h,
      ...f
    } : h));
    setEditSheet(null);
    setF(BLANK);
  }
  function openEdit(h) {
    setEditSheet(h.id);
    setF({
      name: h.name,
      icon: h.icon,
      time: h.time || "",
      freq: h.freq || "daily",
      days: h.days || [],
      cat: h.cat || "Health",
      note: h.note || ""
    });
  }
  function toggleFreqDay(d) {
    setF(p => ({
      ...p,
      days: p.days.includes(d) ? p.days.filter(x => x !== d) : [...p.days, d]
    }));
  }

  // Group by category
  const cats = [...new Set(habits.map(h => h.cat || "Other"))];
  function FreqLabel({
    h
  }) {
    const freq = h.freq || "daily";
    if (freq === "daily") return /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.mute
      }
    }, "Every day");
    if (freq === "weekdays") return /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.mute
      }
    }, "Weekdays");
    if (freq === "weekends") return /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.mute
      }
    }, "Weekends");
    if (freq === "days" && h.days?.length) return /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.mute
      }
    }, h.days.join("·"));
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Routines",
    sub: "Build streaks · Stay consistent",
    color: col,
    onAdd: () => setSheet(true)
  }), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: `${done}/${habits.length}`,
      label: "Done today",
      color: col
    }, {
      val: `${Math.round(pct(done, habits.length))}%`,
      label: "Rate",
      color: C.ok
    }, {
      val: topStreak + "d",
      label: "Best streak",
      color: C.warn
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: "#F3F4F6",
      borderRadius: 10,
      padding: 3,
      marginBottom: 16,
      gap: 2
    }
  }, [{
    id: "today",
    l: "📋 Today"
  }, {
    id: "week",
    l: "📅 This Week"
  }].map(v => /*#__PURE__*/React.createElement("button", {
    key: v.id,
    onClick: () => setView(v.id),
    style: {
      flex: 1,
      padding: "9px 4px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 12,
      transition: "all .15s",
      background: view === v.id ? col : "transparent",
      color: view === v.id ? "#fff" : C.sub
    }
  }, v.l))), view === "week" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 12,
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 320
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr repeat(7,34px)",
      gap: 3,
      marginBottom: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase"
    }
  }, "HABIT"), weekDays.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.ds,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      fontWeight: 700,
      color: w.isToday ? col : C.mute
    }
  }, w.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: w.isToday ? 800 : 500,
      color: w.isToday ? col : C.text
    }
  }, w.date)))), habits.map(h => {
    const weekDone = weekDays.filter(w => isDone(h.id, w.ds)).length;
    return /*#__PURE__*/React.createElement("div", {
      key: h.id,
      style: {
        display: "grid",
        gridTemplateColumns: "1fr repeat(7,34px)",
        gap: 3,
        marginBottom: 6,
        alignItems: "center",
        padding: "5px 0",
        borderTop: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: "hidden",
        paddingRight: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, h.icon, " ", h.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.mute
      }
    }, weekDone, "/7")), weekDays.map(w => {
      const d2 = isDone(h.id, w.ds);
      return /*#__PURE__*/React.createElement("div", {
        key: w.ds,
        onClick: () => toggleDay(h.id, w.ds),
        style: {
          width: 30,
          height: 30,
          borderRadius: 8,
          cursor: "pointer",
          margin: "0 auto",
          background: d2 ? col : "#F3F4F6",
          border: `1.5px solid ${d2 ? col : C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all .15s"
        }
      }, d2 && /*#__PURE__*/React.createElement("svg", {
        width: 11,
        height: 9,
        viewBox: "0 0 11 9"
      }, /*#__PURE__*/React.createElement("polyline", {
        points: ".5,4.5 4,8 10.5,.5",
        stroke: "#fff",
        strokeWidth: 2,
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })));
    }));
  })))), view === "today" && /*#__PURE__*/React.createElement("div", null, cats.map(cat => {
    const items = habits.filter(h => (h.cat || "Other") === cat);
    if (!items.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: cat,
      style: {
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: C.mute,
        letterSpacing: .8,
        textTransform: "uppercase",
        marginBottom: 8
      }
    }, cat), items.map(h => /*#__PURE__*/React.createElement(Card, {
      key: h.id,
      style: {
        padding: "12px 14px",
        marginBottom: 8,
        opacity: h.done ? .75 : 1,
        transition: "opacity .2s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Tick, {
      on: h.done,
      toggle: () => set(p => p.map(x => x.id === h.id ? {
        ...x,
        done: !x.done,
        streak: !x.done ? x.streak + 1 : Math.max(0, x.streak - 1)
      } : x)),
      color: col
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: col + "15",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, h.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: h.done ? C.mute : C.text,
        textDecoration: h.done ? "line-through" : "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, h.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 2,
        alignItems: "center",
        flexWrap: "wrap"
      }
    }, h.time && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.mute
      }
    }, "⏰ ", h.time), /*#__PURE__*/React.createElement(FreqLabel, {
      h: h
    }), h.streak > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.warn,
        fontWeight: 700
      }
    }, "🔥", h.streak, "d")), h.note && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.sub,
        marginTop: 2,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, h.note)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(h),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 14,
        cursor: "pointer",
        padding: "4px 6px"
      }
    }, "✏️"), /*#__PURE__*/React.createElement("button", {
      onClick: () => set(p => p.filter(x => x.id !== h.id)),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 14,
        cursor: "pointer",
        padding: "4px 6px"
      }
    }, "✕"))))));
  })), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => {
      setSheet(false);
      setF(BLANK);
    },
    title: "New Routine"
  }, /*#__PURE__*/React.createElement(HabitForm, {
    f: f,
    setF: setF,
    col: col,
    CATS: CATS,
    ICON_MAP: ICON_MAP,
    ALL_DAYS: ALL_DAYS,
    FREQ_OPTS: FREQ_OPTS,
    toggleFreqDay: toggleFreqDay,
    onSave: addHabit,
    onCancel: () => {
      setSheet(false);
      setF(BLANK);
    },
    saveLabel: "Add Routine"
  })), /*#__PURE__*/React.createElement(Sheet, {
    open: !!editSheet,
    onClose: () => {
      setEditSheet(null);
      setF(BLANK);
    },
    title: "Edit Routine"
  }, /*#__PURE__*/React.createElement(HabitForm, {
    f: f,
    setF: setF,
    col: col,
    CATS: CATS,
    ICON_MAP: ICON_MAP,
    ALL_DAYS: ALL_DAYS,
    FREQ_OPTS: FREQ_OPTS,
    toggleFreqDay: toggleFreqDay,
    onSave: saveEdit,
    onCancel: () => {
      setEditSheet(null);
      setF(BLANK);
    },
    saveLabel: "Save Changes"
  })));
}

// ── BUSINESS ──────────────────────────────────────────────────────────────────
function Business({
  biz,
  set,
  tasks,
  setTasks
}) {
  const col = SEC.business.c;
  const [tab, setTab] = useState("tasks");
  const [sheet, setSheet] = useState(false);
  const [editId, setEditId] = useState(null);
  const BLANK = {
    title: "",
    pri: "high",
    dl: "",
    p: 0
  };
  const [f, setF] = useState(BLANK);
  const bizTasks = tasks.filter(t => t.cat === "business");
  const done = bizTasks.filter(t => t.done).length;
  function saveGoal() {
    if (!f.title.trim()) return;
    if (editId) {
      set(p => ({
        ...p,
        goals: p.goals.map(g => g.id === editId ? {
          ...g,
          ...f
        } : g)
      }));
      setEditId(null);
    } else set(p => ({
      ...p,
      goals: [...p.goals, {
        ...f,
        id: "bg" + Date.now()
      }]
    }));
    setF(BLANK);
    setSheet(false);
  }
  function openEdit(g) {
    setEditId(g.id);
    setF({
      title: g.title,
      pri: g.pri,
      dl: g.dl || "",
      p: g.p || 0
    });
    setSheet(true);
  }
  function setP(id, p) {
    set(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? {
        ...g,
        p
      } : g)
    }));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Business",
    sub: "Tasks · Goals · Growth",
    color: col,
    onAdd: tab === "goals" ? () => {
      setEditId(null);
      setF(BLANK);
      setSheet(true);
    } : undefined
  }), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: `${done}/${bizTasks.length}`,
      label: "Tasks done",
      color: col
    }, {
      val: bizTasks.filter(t => t.pri === "high" && !t.done).length,
      label: "High pri",
      color: C.danger
    }, {
      val: biz.goals.length ? Math.round(biz.goals.reduce((s, g) => s + (g.p || 0), 0) / biz.goals.length) + "%" : "—",
      label: "Goal avg",
      color: C.ok
    }]
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: "tasks",
      label: "📋 Tasks"
    }, {
      id: "goals",
      label: "📈 Goals"
    }],
    active: tab,
    set: setTab,
    color: col
  }), tab === "tasks" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#EFF6FF",
      borderRadius: R,
      padding: "10px 14px",
      marginBottom: 12,
      border: "1px solid #BFDBFE",
      display: "flex",
      alignItems: "flex-start",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      flexShrink: 0
    }
  }, "💡"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#1E40AF"
    }
  }, "Add or edit tasks in the ", /*#__PURE__*/React.createElement("strong", null, "Tasks"), " section with category Business — they appear here automatically.")), bizTasks.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 6
    }
  }, "💼"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, "No business tasks yet")) : [...bizTasks].sort((a, b) => ({
    high: 0,
    medium: 1,
    low: 2
  }[a.pri] || 1) - ({
    high: 0,
    medium: 1,
    low: 2
  }[b.pri] || 1)).map(t => {
    const subDone = (t.subs || []).filter(s => s.done).length,
      subTotal = (t.subs || []).length;
    return /*#__PURE__*/React.createElement(Card, {
      key: t.id,
      style: {
        padding: "12px 14px",
        marginBottom: 8,
        borderLeft: `3px solid ${PRI[t.pri]?.c || C.mute}`,
        borderRadius: `0 ${R}px ${R}px 0`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Tick, {
      on: t.done,
      toggle: () => setTasks(p => p.map(x => x.id === t.id ? {
        ...x,
        done: !x.done
      } : x)),
      color: col
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: t.done ? C.mute : C.text,
        textDecoration: t.done ? "line-through" : "none"
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5,
        marginTop: 3,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      label: PRI[t.pri]?.label,
      color: PRI[t.pri]?.c
    }), t.date && /*#__PURE__*/React.createElement(Due, {
      dl: t.date
    }), subTotal > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.sub,
        fontWeight: 600
      }
    }, subDone, "/", subTotal, " subs")))));
  })), tab === "goals" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, biz.goals.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 6
    }
  }, "📈"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, "No goals yet · Tap + Add")), biz.goals.map(g => /*#__PURE__*/React.createElement(Card, {
    key: g.id,
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.text,
      marginBottom: 5
    }
  }, g.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    label: PRI[g.pri].label,
    color: PRI[g.pri].c
  }), /*#__PURE__*/React.createElement(Due, {
    dl: g.dl
  }))), /*#__PURE__*/React.createElement(Ring, {
    v: g.p,
    color: col,
    sz: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openEdit(g),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "2px 4px"
    }
  }, "✏️"), /*#__PURE__*/React.createElement("button", {
    onClick: () => set(p => ({
      ...p,
      goals: p.goals.filter(x => x.id !== g.id)
    })),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "2px 4px"
    }
  }, "✕"))), /*#__PURE__*/React.createElement(ProgCtl, {
    value: g.p,
    onChange: p => setP(g.id, p),
    color: col
  })))), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    },
    title: editId ? "Edit Goal" : "New Business Goal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Goal"), /*#__PURE__*/React.createElement(Inp, {
    v: f.title,
    set: v => setF(p => ({
      ...p,
      title: v
    })),
    ph: "e.g. Automate invoicing"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Priority"), /*#__PURE__*/React.createElement(Sel, {
    v: f.pri,
    set: v => setF(p => ({
      ...p,
      pri: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "high"
  }, "High"), /*#__PURE__*/React.createElement("option", {
    value: "medium"
  }, "Medium"), /*#__PURE__*/React.createElement("option", {
    value: "low"
  }, "Low"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Target date"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: f.dl,
    set: v => setF(p => ({
      ...p,
      dl: v
    }))
  }))), /*#__PURE__*/React.createElement(SBtn, {
    label: editId ? "Save Changes" : "Add Goal",
    color: col,
    onClick: saveGoal
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    }
  }))));
}
function Health({
  health,
  set,
  tasks,
  setTasks,
  habitLinks,
  habits
}) {
  const col = SEC.health.c;
  const [tab, setTab] = useState("tasks");
  const [sheet, setSheet] = useState(false);
  const [editId, setEditId] = useState(null);
  const BLANK = {
    title: "",
    note: "",
    pri: "high",
    dl: "",
    p: 0
  };
  const [f, setF] = useState(BLANK);
  const healthTasks = tasks.filter(t => t.cat === "health");
  const done = healthTasks.filter(t => t.done).length;
  function saveGoal() {
    if (!f.title.trim()) return;
    if (editId) {
      set(p => ({
        ...p,
        goals: p.goals.map(g => g.id === editId ? {
          ...g,
          ...f
        } : g)
      }));
      setEditId(null);
    } else set(p => ({
      ...p,
      goals: [...p.goals, {
        ...f,
        id: "hg" + Date.now()
      }]
    }));
    setF(BLANK);
    setSheet(false);
  }
  function openEdit(g) {
    setEditId(g.id);
    setF({
      title: g.title,
      note: g.note || "",
      pri: g.pri,
      dl: g.dl || "",
      p: g.p || 0
    });
    setSheet(true);
  }
  function setP(id, p) {
    set(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? {
        ...g,
        p
      } : g)
    }));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Health",
    sub: "Body · Mind · Wellness",
    color: col,
    onAdd: tab === "goals" ? () => {
      setEditId(null);
      setF(BLANK);
      setSheet(true);
    } : undefined
  }), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: `${done}/${healthTasks.length}`,
      label: "Tasks done",
      color: col
    }, {
      val: health.goals.filter(g => g.pri === "high").length,
      label: "High pri",
      color: C.danger
    }, {
      val: health.goals.length ? Math.round(health.goals.reduce((s, g) => s + (g.p || 0), 0) / health.goals.length) + "%" : "—",
      label: "Goal avg",
      color: C.ok
    }]
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: "tasks",
      label: "Daily"
    }, {
      id: "goals",
      label: "Goals"
    }],
    active: tab,
    set: setTab,
    color: col
  }), tab === "tasks" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#ECFDF5",
      borderRadius: R,
      padding: "10px 14px",
      marginBottom: 12,
      border: "1px solid #A7F3D0",
      display: "flex",
      alignItems: "flex-start",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      flexShrink: 0
    }
  }, "💡"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#065F46"
    }
  }, "Add health tasks in the ", /*#__PURE__*/React.createElement("strong", null, "Tasks"), " section with category Health.")), healthTasks.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 6
    }
  }, "🏃"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, "No health tasks yet")) : healthTasks.map(t => /*#__PURE__*/React.createElement(Card, {
    key: t.id,
    style: {
      padding: "12px 14px",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tick, {
    on: t.done,
    toggle: () => setTasks(p => p.map(x => x.id === t.id ? {
      ...x,
      done: !x.done
    } : x)),
    color: col
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: t.done ? C.mute : C.text,
      textDecoration: t.done ? "line-through" : "none"
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      marginTop: 3
    }
  }, t.time && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: C.mute
    }
  }, "⏰", t.time), t.date && /*#__PURE__*/React.createElement(Due, {
    dl: t.date
  }))))))), tab === "goals" && health.goals.map(g => /*#__PURE__*/React.createElement(Card, {
    key: g.id,
    style: {
      padding: 16,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    v: g.p,
    color: col,
    sz: 50
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.text,
      marginBottom: 5
    }
  }, g.title), g.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.sub,
      padding: "5px 9px",
      background: "#F9FAFB",
      borderRadius: 8,
      marginBottom: 6
    }
  }, g.note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    label: PRI[g.pri].label,
    color: PRI[g.pri].c
  }), /*#__PURE__*/React.createElement(Due, {
    dl: g.dl
  })), habitLinks[g.id] && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      display: "flex",
      gap: 4,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: C.mute,
      fontWeight: 600
    }
  }, "Linked habits:"), habitLinks[g.id].map(hid => {
    const hb = habits?.find(h => h.id === hid);
    return hb ? /*#__PURE__*/React.createElement("span", {
      key: hid,
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: SEC.habits.c,
        background: SEC.habits.c + "18",
        padding: "1px 5px",
        borderRadius: 99
      }
    }, hb.icon, " ", hb.name) : null;
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openEdit(g),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "2px 4px"
    }
  }, "✏️"), /*#__PURE__*/React.createElement("button", {
    onClick: () => set(p => ({
      ...p,
      goals: p.goals.filter(x => x.id !== g.id)
    })),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "2px 4px"
    }
  }, "✕"))), /*#__PURE__*/React.createElement(ProgCtl, {
    value: g.p,
    onChange: p => setP(g.id, p),
    color: col
  }))), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    },
    title: editId ? "Edit Goal" : "New Health Goal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Goal"), /*#__PURE__*/React.createElement(Inp, {
    v: f.title,
    set: v => setF(p => ({
      ...p,
      title: v
    })),
    ph: "e.g. Lose 5 kg"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Notes"), /*#__PURE__*/React.createElement(Inp, {
    v: f.note,
    set: v => setF(p => ({
      ...p,
      note: v
    })),
    ph: "Doctor advice…"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Priority"), /*#__PURE__*/React.createElement(Sel, {
    v: f.pri,
    set: v => setF(p => ({
      ...p,
      pri: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "high"
  }, "High"), /*#__PURE__*/React.createElement("option", {
    value: "medium"
  }, "Medium"), /*#__PURE__*/React.createElement("option", {
    value: "low"
  }, "Low"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Target date"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: f.dl,
    set: v => setF(p => ({
      ...p,
      dl: v
    }))
  }))), /*#__PURE__*/React.createElement(SBtn, {
    label: editId ? "Save Changes" : "Add Goal",
    color: col,
    onClick: saveGoal
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    }
  }))));
}
function Shopping({
  items,
  set
}) {
  const [cat, setCat] = useState("All");
  const [sheet, setSheet] = useState(false);
  const [editId, setEditId] = useState(null);
  const [f, setF] = useState({
    name: "",
    cat: "Electronics",
    pri: "medium",
    budget: ""
  });
  function openEdit(item) {
    setEditId(item.id);
    setF({
      name: item.name,
      cat: item.cat,
      pri: item.pri,
      budget: item.budget || ""
    });
    setSheet(true);
  }
  const col = SEC.shopping.c;
  const cats = ["All", "Wardrobe", "Electronics", "Decor", "Other"];
  const list = cat === "All" ? items : items.filter(s => s.cat === cat);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Shopping",
    sub: "Wardrobe · Gadgets · Home",
    color: col,
    onAdd: () => setSheet(true)
  }), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: items.filter(s => !s.done).length,
      label: "To buy",
      color: col
    }, {
      val: items.filter(s => s.done).length,
      label: "Bought",
      color: C.ok
    }, {
      val: "₹" + items.filter(s => !s.done).reduce((sum, s) => sum + (parseInt((s.budget || "").replace(/[^0-9]/g, "")) || 0), 0).toLocaleString("en-IN"),
      label: "Est.",
      color: C.warn
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: 14,
      paddingBottom: 2,
      scrollbarWidth: "none"
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    style: {
      flexShrink: 0,
      padding: "6px 12px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11,
      background: cat === c ? C.text : "#F3F4F6",
      color: cat === c ? "#fff" : C.sub
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, list.map(item => /*#__PURE__*/React.createElement(Card, {
    key: item.id,
    style: {
      padding: "12px 14px",
      opacity: item.done ? .65 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tick, {
    on: item.done,
    toggle: () => set(p => p.map(x => x.id === item.id ? {
      ...x,
      done: !x.done
    } : x)),
    color: col
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: item.done ? C.mute : C.text,
      textDecoration: item.done ? "line-through" : "none"
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    label: item.cat,
    color: col
  }), /*#__PURE__*/React.createElement(Tag, {
    label: PRI[item.pri].label,
    color: PRI[item.pri].c
  }), item.budget && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: C.ok
    }
  }, item.budget))), /*#__PURE__*/React.createElement("button", {
    onClick: () => openEdit(item),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "4px 4px"
    }
  }, "✏️"), /*#__PURE__*/React.createElement("button", {
    onClick: () => set(p => p.filter(x => x.id !== item.id)),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "4px 6px"
    }
  }, "✕"))))), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => setSheet(false),
    title: editId ? "Edit Item" : "Add Item"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Item name"), /*#__PURE__*/React.createElement(Inp, {
    v: f.name,
    set: v => setF(p => ({
      ...p,
      name: v
    })),
    ph: "e.g. Running shoes"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Category"), /*#__PURE__*/React.createElement(Sel, {
    v: f.cat,
    set: v => setF(p => ({
      ...p,
      cat: v
    }))
  }, ["Wardrobe", "Electronics", "Decor", "Other"].map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Budget"), /*#__PURE__*/React.createElement(Inp, {
    v: f.budget,
    set: v => setF(p => ({
      ...p,
      budget: v
    })),
    ph: "₹2,000"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Priority"), /*#__PURE__*/React.createElement(Sel, {
    v: f.pri,
    set: v => setF(p => ({
      ...p,
      pri: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "high"
  }, "High"), /*#__PURE__*/React.createElement("option", {
    value: "medium"
  }, "Medium"), /*#__PURE__*/React.createElement("option", {
    value: "low"
  }, "Low"))), /*#__PURE__*/React.createElement(SBtn, {
    label: editId ? "Save Changes" : "Add Item",
    color: col,
    onClick: () => {
      if (!f.name.trim()) return;
      if (editId) {
        set(p => p.map(x => x.id === editId ? {
          ...x,
          ...f
        } : x));
        setEditId(null);
      } else set(p => [...p, {
        ...f,
        id: "s" + Date.now(),
        done: false
      }]);
      setF({
        name: "",
        cat: "Electronics",
        pri: "medium",
        budget: ""
      });
      setSheet(false);
    }
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setSheet(false)
  }))));
}

// ── FAMILY ────────────────────────────────────────────────────────────────────
function Family({
  family,
  set
}) {
  const [who, setWho] = useState("wife");
  const col = SEC.family.c;
  const fd = family.find(f => f.member === who);
  const mb = FAM.find(m => m.id === who);
  const [sessSheet, setSessSheet] = useState(false);
  const [goalSheet, setGoalSheet] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null);
  const [sf, setSf] = useState({
    activity: "",
    minutes: 30
  });
  const [gf, setGf] = useState({
    title: ""
  });
  function addSession() {
    if (!sf.activity.trim()) return;
    set(p => p.map(fm => fm.member !== who ? fm : {
      ...fm,
      sessions: [...fm.sessions, {
        id: "fs" + Date.now(),
        activity: sf.activity,
        minutes: parseInt(sf.minutes) || 30,
        done: false
      }]
    }));
    setSf({
      activity: "",
      minutes: 30
    });
    setSessSheet(false);
  }
  function saveGoal() {
    if (!gf.title.trim()) return;
    if (editGoalId) {
      set(p => p.map(fm => fm.member !== who ? fm : {
        ...fm,
        goals: fm.goals.map(g => g.id === editGoalId ? {
          ...g,
          title: gf.title
        } : g)
      }));
      setEditGoalId(null);
    } else {
      set(p => p.map(fm => fm.member !== who ? fm : {
        ...fm,
        goals: [...fm.goals, {
          id: "fg" + Date.now(),
          title: gf.title,
          p: 0
        }]
      }));
    }
    setGf({
      title: ""
    });
    setGoalSheet(false);
  }
  function setGoalP(gid, p) {
    set(prev => prev.map(fm => fm.member !== who ? fm : {
      ...fm,
      goals: fm.goals.map(g => g.id === gid ? {
        ...g,
        p
      } : g)
    }));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Family",
    sub: "Grow together · Learn together",
    color: col
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      overflowX: "auto",
      marginBottom: 16,
      paddingBottom: 2,
      scrollbarWidth: "none"
    }
  }, FAM.map(m => {
    const fd2 = family.find(f => f.member === m.id);
    const done = fd2 ? fd2.sessions.filter(s => s.done).length : 0;
    const tot = fd2 ? fd2.sessions.length : 0;
    const on = who === m.id;
    return /*#__PURE__*/React.createElement("button", {
      key: m.id,
      onClick: () => setWho(m.id),
      style: {
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 14px",
        borderRadius: R,
        border: `1.5px solid ${on ? m.c : C.border}`,
        cursor: "pointer",
        background: on ? m.c + "10" : "#fff",
        fontWeight: 700,
        fontSize: 12,
        color: on ? m.c : C.sub
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, m.av), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12
      }
    }, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        opacity: .7
      }
    }, done, "/", tot, " done")));
  })), fd && mb && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 14,
      background: mb.c + "12",
      borderRadius: R,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28
    }
  }, mb.av), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: C.text
    }
  }, mb.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.sub
    }
  }, fd.area))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .8
    }
  }, "Goals"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setEditGoalId(null);
      setGf({
        title: ""
      });
      setGoalSheet(true);
    },
    style: {
      background: mb.c,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 11,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "+ Goal")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 18
    }
  }, fd.goals.map(g => /*#__PURE__*/React.createElement(Card, {
    key: g.id,
    style: {
      padding: 14,
      borderLeft: `2px solid ${mb.c}`,
      borderRadius: `0 ${R}px ${R}px 0`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, g.title), /*#__PURE__*/React.createElement(Ring, {
    v: g.p,
    color: mb.c,
    sz: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setEditGoalId(g.id);
      setGf({
        title: g.title
      });
      setGoalSheet(true);
    },
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 13,
      cursor: "pointer",
      padding: "1px 3px"
    }
  }, "✏️"), /*#__PURE__*/React.createElement("button", {
    onClick: () => set(p => p.map(fm => fm.member !== who ? fm : {
      ...fm,
      goals: fm.goals.filter(x => x.id !== g.id)
    })),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 13,
      cursor: "pointer",
      padding: "1px 3px"
    }
  }, "✕"))), /*#__PURE__*/React.createElement(ProgCtl, {
    value: g.p,
    onChange: p => setGoalP(g.id, p),
    color: mb.c
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .8
    }
  }, "Sessions"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSessSheet(true),
    style: {
      background: mb.c,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 11,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "+ Session")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, fd.sessions.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.id,
    style: {
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tick, {
    on: s.done,
    toggle: () => set(p => p.map(fm => fm.member !== who ? fm : {
      ...fm,
      sessions: fm.sessions.map(x => x.id === s.id ? {
        ...x,
        done: !x.done
      } : x)
    })),
    color: mb.c
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: s.done ? C.mute : C.text,
      textDecoration: s.done ? "line-through" : "none"
    }
  }, s.activity), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.mute,
      marginTop: 2
    }
  }, "⏱ ", s.minutes, " min")), /*#__PURE__*/React.createElement("button", {
    onClick: () => set(p => p.map(fm => fm.member !== who ? fm : {
      ...fm,
      sessions: fm.sessions.filter(x => x.id !== s.id)
    })),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "4px 6px"
    }
  }, "✕")))))), /*#__PURE__*/React.createElement(Sheet, {
    open: sessSheet,
    onClose: () => setSessSheet(false),
    title: "New Session — " + (mb?.label || "")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Activity"), /*#__PURE__*/React.createElement(Inp, {
    v: sf.activity,
    set: v => setSf(p => ({
      ...p,
      activity: v
    })),
    ph: "e.g. Maths practice, English reading…"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Duration (minutes)"), /*#__PURE__*/React.createElement(Inp, {
    type: "number",
    v: sf.minutes,
    set: v => setSf(p => ({
      ...p,
      minutes: v
    })),
    ph: "30"
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: "Add Session",
    color: mb?.c || col,
    onClick: addSession
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setSessSheet(false)
  }))), /*#__PURE__*/React.createElement(Sheet, {
    open: goalSheet,
    onClose: () => {
      setGoalSheet(false);
      setEditGoalId(null);
    },
    title: (editGoalId ? "Edit Goal — " : "New Goal — ") + (mb?.label || "")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Goal"), /*#__PURE__*/React.createElement(Inp, {
    v: gf.title,
    set: v => setGf(p => ({
      ...p,
      title: v
    })),
    ph: "e.g. English fluency"
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: editGoalId ? "Save Changes" : "Add Goal",
    color: mb?.c || col,
    onClick: saveGoal
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => {
      setGoalSheet(false);
      setEditGoalId(null);
    }
  }))));
}
function Finance({
  finance,
  set,
  contributions,
  setContributions,
  tasks,
  setTasks
}) {
  const col = SEC.finance.c;
  const [tab, setTab] = useState("goals");
  const [sheet, setSheet] = useState(false);
  const [editId, setEditId] = useState(null);
  const BLANK = {
    title: "",
    target: "",
    saved: "",
    dl: "",
    pri: "high",
    icon: "💰"
  };
  const [f, setF] = useState(BLANK);
  const total = finance.goals.reduce((s, g) => s + (g.saved || 0), 0);
  const tAll = finance.goals.reduce((s, g) => s + (g.target || 0), 0);
  const finTasks = tasks.filter(t => t.cat === "finance");
  function saveGoal() {
    if (!f.title.trim()) return;
    const vals = {
      ...f,
      target: parseInt(f.target) || 0,
      saved: parseInt(f.saved) || 0
    };
    if (editId) {
      set(p => ({
        ...p,
        goals: p.goals.map(g => g.id === editId ? {
          ...g,
          ...vals
        } : g)
      }));
      setEditId(null);
    } else set(p => ({
      ...p,
      goals: [...p.goals, {
        ...vals,
        id: "fi" + Date.now()
      }]
    }));
    setF(BLANK);
    setSheet(false);
  }
  function openEdit(g) {
    setEditId(g.id);
    setF({
      title: g.title,
      target: String(g.target || ""),
      saved: String(g.saved || ""),
      dl: g.dl || "",
      pri: g.pri,
      icon: g.icon || "💰"
    });
    setSheet(true);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Finance",
    sub: "Savings · Investments · Future",
    color: col,
    onAdd: tab === "goals" ? () => {
      setEditId(null);
      setF(BLANK);
      setSheet(true);
    } : undefined
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 18,
      marginBottom: 16,
      background: C.text
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "rgba(255,255,255,.5)",
      marginBottom: 4,
      letterSpacing: .5,
      textTransform: "uppercase"
    }
  }, "Total Saved"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -.8
    }
  }, fmtL(total)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,.5)",
      marginTop: 2
    }
  }, "of ", fmtL(tAll), " · ", pct(total, tAll), "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      height: 4,
      borderRadius: 99,
      background: "rgba(255,255,255,.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 99,
      background: "rgba(255,255,255,.7)",
      width: pct(total, tAll) + "%"
    }
  }))), /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: "goals",
      label: "Goals"
    }, {
      id: "tasks",
      label: "Tasks"
    }],
    active: tab,
    set: setTab,
    color: col
  }), tab === "goals" && finance.goals.map(g => {
    const p = pct(g.saved, g.target);
    return /*#__PURE__*/React.createElement(Card, {
      key: g.id,
      style: {
        padding: 16,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 28,
        flexShrink: 0
      }
    }, g.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: C.text,
        marginBottom: 5
      }
    }, g.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      label: PRI[g.pri].label,
      color: PRI[g.pri].c
    }), /*#__PURE__*/React.createElement(Due, {
      dl: g.dl
    }))), /*#__PURE__*/React.createElement(Ring, {
      v: p,
      color: col,
      sz: 48
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(g),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 14,
        cursor: "pointer",
        padding: "2px 4px"
      }
    }, "✏️"), /*#__PURE__*/React.createElement("button", {
      onClick: () => set(prev => ({
        ...prev,
        goals: prev.goals.filter(x => x.id !== g.id)
      })),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 14,
        cursor: "pointer",
        padding: "2px 4px"
      }
    }, "✕"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.ok
      }
    }, fmtL(g.saved || 0)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.sub
      }
    }, fmtL(g.target || 0))), /*#__PURE__*/React.createElement(Bar, {
      v: p,
      color: col
    }), /*#__PURE__*/React.createElement(ContribLog, {
      goalId: g.id,
      goalTitle: g.title,
      contributions: contributions,
      setContributions: setContributions,
      color: col,
      onContribute: amt => set(prev => ({
        ...prev,
        goals: prev.goals.map(x => x.id === g.id ? {
          ...x,
          saved: (x.saved || 0) + amt
        } : x)
      }))
    }));
  }), tab === "tasks" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#EEF2FF",
      borderRadius: R,
      padding: "10px 14px",
      marginBottom: 12,
      border: "1px solid #C7D2FE",
      display: "flex",
      gap: 8,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      flexShrink: 0
    }
  }, "💡"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#3730A3"
    }
  }, "Finance tasks live in the ", /*#__PURE__*/React.createElement("strong", null, "Tasks"), " section. Set category to Finance when creating.")), finTasks.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "28px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      marginBottom: 6
    }
  }, "💰"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, "No finance tasks yet")) : [...finTasks].sort((a, b) => ({
    high: 0,
    medium: 1,
    low: 2
  }[a.pri] || 1) - ({
    high: 0,
    medium: 1,
    low: 2
  }[b.pri] || 1)).map(t => /*#__PURE__*/React.createElement(Card, {
    key: t.id,
    style: {
      padding: "12px 14px",
      marginBottom: 8,
      borderLeft: `3px solid ${PRI[t.pri]?.c || C.mute}`,
      borderRadius: `0 ${R}px ${R}px 0`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tick, {
    on: t.done,
    toggle: () => setTasks(p => p.map(x => x.id === t.id ? {
      ...x,
      done: !x.done
    } : x)),
    color: col
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: t.done ? C.mute : C.text,
      textDecoration: t.done ? "line-through" : "none"
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    label: PRI[t.pri]?.label || "",
    color: PRI[t.pri]?.c || C.mute
  }), t.date && /*#__PURE__*/React.createElement(Due, {
    dl: t.date
  }))))))), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    },
    title: editId ? "Edit Finance Goal" : "New Finance Goal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Icon"), /*#__PURE__*/React.createElement(Inp, {
    v: f.icon,
    set: v => setF(p => ({
      ...p,
      icon: v
    })),
    ph: "💰"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Priority"), /*#__PURE__*/React.createElement(Sel, {
    v: f.pri,
    set: v => setF(p => ({
      ...p,
      pri: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "high"
  }, "High"), /*#__PURE__*/React.createElement("option", {
    value: "medium"
  }, "Medium"), /*#__PURE__*/React.createElement("option", {
    value: "low"
  }, "Low")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Title"), /*#__PURE__*/React.createElement(Inp, {
    v: f.title,
    set: v => setF(p => ({
      ...p,
      title: v
    })),
    ph: "e.g. Emergency fund"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Target (₹)"), /*#__PURE__*/React.createElement(Inp, {
    type: "number",
    v: f.target,
    set: v => setF(p => ({
      ...p,
      target: v
    })),
    ph: "300000"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Saved (₹)"), /*#__PURE__*/React.createElement(Inp, {
    type: "number",
    v: f.saved,
    set: v => setF(p => ({
      ...p,
      saved: v
    })),
    ph: "0"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Target date"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: f.dl,
    set: v => setF(p => ({
      ...p,
      dl: v
    }))
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: editId ? "Save Changes" : "Add Goal",
    color: col,
    onClick: saveGoal
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    }
  }))));
}
function Travel({
  travel,
  set
}) {
  const col = SEC.travel.c;
  const [filter, setFilter] = useState("All");
  const [sheet, setSheet] = useState(false);
  const [editId, setEditId] = useState(null);
  const BLANK = {
    name: "",
    type: "India",
    status: "wishlist",
    budget: "",
    when: ""
  };
  const [f, setF] = useState(BLANK);
  const sColor = {
    wishlist: C.mute,
    planning: C.warn,
    booked: C.ok
  };
  const list = filter === "All" ? travel : travel.filter(t => t.type === filter || t.status === filter);
  function save() {
    if (!f.name.trim()) return;
    if (editId) {
      set(p => p.map(t => t.id === editId ? {
        ...t,
        ...f
      } : t));
      setEditId(null);
    } else set(p => [...p, {
      ...f,
      id: "t" + Date.now(),
      p: 0
    }]);
    setF(BLANK);
    setSheet(false);
  }
  function openEdit(t) {
    setEditId(t.id);
    setF({
      name: t.name,
      type: t.type,
      status: t.status,
      budget: t.budget || "",
      when: t.when || ""
    });
    setSheet(true);
  }
  function setP(id, p) {
    set(prev => prev.map(t => t.id === id ? {
      ...t,
      p
    } : t));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Travel",
    sub: "India first · World next",
    color: col,
    onAdd: () => {
      setEditId(null);
      setF(BLANK);
      setSheet(true);
    }
  }), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: travel.filter(t => t.status === "wishlist").length,
      label: "Wishlist",
      color: C.mute
    }, {
      val: travel.filter(t => t.status === "planning").length,
      label: "Planning",
      color: C.warn
    }, {
      val: travel.filter(t => t.status === "booked").length,
      label: "Booked",
      color: C.ok
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: 14,
      paddingBottom: 2,
      scrollbarWidth: "none"
    }
  }, ["All", "India", "Intl", "wishlist", "planning"].map(f2 => /*#__PURE__*/React.createElement("button", {
    key: f2,
    onClick: () => setFilter(f2),
    style: {
      flexShrink: 0,
      padding: "6px 12px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11,
      background: filter === f2 ? C.text : "#F3F4F6",
      color: filter === f2 ? "#fff" : C.sub
    }
  }, f2.charAt(0).toUpperCase() + f2.slice(1)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, list.map(trip => /*#__PURE__*/React.createElement(Card, {
    key: trip.id,
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.text,
      marginBottom: 5
    }
  }, trip.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    label: trip.type,
    color: col
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: sColor[trip.status] || C.mute,
      background: (sColor[trip.status] || C.mute) + "18",
      padding: "1px 6px",
      borderRadius: 99
    }
  }, trip.status), trip.budget && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: C.ok
    }
  }, trip.budget), trip.when && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: C.mute
    }
  }, "📅 ", trip.when))), /*#__PURE__*/React.createElement(Ring, {
    v: trip.p,
    color: col,
    sz: 42
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openEdit(trip),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "2px 4px"
    }
  }, "✏️"), /*#__PURE__*/React.createElement("button", {
    onClick: () => set(p => p.filter(t => t.id !== trip.id)),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "2px 4px"
    }
  }, "✕"))), /*#__PURE__*/React.createElement(ProgCtl, {
    value: trip.p,
    onChange: p => setP(trip.id, p),
    color: col
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      marginTop: 10
    }
  }, ["wishlist", "planning", "booked"].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => set(p => p.map(t => t.id === trip.id ? {
      ...t,
      status: s
    } : t)),
    style: {
      flex: 1,
      fontSize: 10,
      padding: "6px 4px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      background: trip.status === s ? C.text : "#F3F4F6",
      color: trip.status === s ? "#fff" : C.sub
    }
  }, s)))))), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    },
    title: editId ? "Edit Trip" : "Add Destination"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Destination"), /*#__PURE__*/React.createElement(Inp, {
    v: f.name,
    set: v => setF(p => ({
      ...p,
      name: v
    })),
    ph: "e.g. Goa family trip"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Type"), /*#__PURE__*/React.createElement(Sel, {
    v: f.type,
    set: v => setF(p => ({
      ...p,
      type: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "India"
  }, "🇮🇳 India"), /*#__PURE__*/React.createElement("option", {
    value: "Intl"
  }, "🌍 International"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Status"), /*#__PURE__*/React.createElement(Sel, {
    v: f.status,
    set: v => setF(p => ({
      ...p,
      status: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "wishlist"
  }, "Wishlist"), /*#__PURE__*/React.createElement("option", {
    value: "planning"
  }, "Planning"), /*#__PURE__*/React.createElement("option", {
    value: "booked"
  }, "Booked")))), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Budget"), /*#__PURE__*/React.createElement(Inp, {
    v: f.budget,
    set: v => setF(p => ({
      ...p,
      budget: v
    })),
    ph: "₹40,000"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "When"), /*#__PURE__*/React.createElement(Inp, {
    v: f.when,
    set: v => setF(p => ({
      ...p,
      when: v
    })),
    ph: "Dec 2026"
  }))), /*#__PURE__*/React.createElement(SBtn, {
    label: editId ? "Save Changes" : "Add Trip",
    color: col,
    onClick: save
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    }
  }))));
}
function Growth({
  growth,
  set
}) {
  const col = SEC.growth.c;
  const [tab, setTab] = useState("books");
  const [sheet, setSheet] = useState(false);
  const [editId, setEditId] = useState(null);
  const BLANK = {
    title: "",
    by: "",
    status: "wishlist",
    p: 0,
    type: "book"
  };
  const [f, setF] = useState(BLANK);
  const sC = {
    wishlist: C.mute,
    reading: C.blue,
    watching: C.blue,
    done: C.ok
  };
  const keyOf = t => t === "skill" ? "skills" : t === "watch" ? "watch" : "books";
  const tabKey = tab === "books" ? "books" : tab === "watch" ? "watch" : "skills";
  const list = growth[tabKey] || [];
  function save() {
    if (!f.title.trim()) return;
    const key = keyOf(f.type);
    const item = {
      ...f,
      p: parseInt(f.p) || 0
    };
    if (f.type === "skill") {
      item.via = f.by;
      delete item.by;
    }
    if (editId) {
      set(p => ({
        ...p,
        [key]: p[key].map(x => x.id === editId ? {
          ...x,
          ...item
        } : x)
      }));
      setEditId(null);
    } else {
      set(p => ({
        ...p,
        [key]: [...p[key], {
          ...item,
          id: f.type[0] + Date.now()
        }]
      }));
    }
    setF(BLANK);
    setSheet(false);
  }
  function openEdit(item) {
    const type = tabKey === "skills" ? "skill" : tabKey === "watch" ? "watch" : "book";
    setEditId(item.id);
    setF({
      title: item.title,
      by: item.by || item.via || "",
      status: item.status || "wishlist",
      p: item.p || 0,
      type
    });
    setSheet(true);
  }
  function setP(id, p) {
    set(prev => ({
      ...prev,
      [tabKey]: prev[tabKey].map(x => x.id === id ? {
        ...x,
        p
      } : x)
    }));
  }
  function GCard({
    item
  }) {
    const sc = sC[item.status] || C.mute;
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        padding: 14,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: C.text
      }
    }, item.title), (item.by || item.via) && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.sub,
        marginTop: 1
      }
    }, item.by || item.via), item.info && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.sub,
        marginTop: 1
      }
    }, "📺 ", item.info), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5,
        marginTop: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: sc,
        background: sc + "18",
        padding: "1px 6px",
        borderRadius: 99
      }
    }, item.status), item.dl && /*#__PURE__*/React.createElement(Due, {
      dl: item.dl
    }))), /*#__PURE__*/React.createElement(Ring, {
      v: item.p,
      color: col,
      sz: 44
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openEdit(item),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 14,
        cursor: "pointer",
        padding: "2px 4px"
      }
    }, "✏️"), /*#__PURE__*/React.createElement("button", {
      onClick: () => set(p => ({
        ...p,
        [tabKey]: p[tabKey].filter(x => x.id !== item.id)
      })),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 14,
        cursor: "pointer",
        padding: "2px 4px"
      }
    }, "✕"))), /*#__PURE__*/React.createElement(ProgCtl, {
      value: item.p,
      onChange: p => setP(item.id, p),
      color: col
    }));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Growth",
    sub: "Books · Anime · Skills",
    color: col,
    onAdd: () => {
      setEditId(null);
      setF({
        ...BLANK,
        type: tabKey === "skills" ? "skill" : tabKey === "watch" ? "watch" : "book"
      });
      setSheet(true);
    }
  }), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: growth.books.filter(b => b.status === "reading").length,
      label: "Reading",
      color: C.blue
    }, {
      val: growth.books.filter(b => b.status === "done").length,
      label: "Done",
      color: C.ok
    }, {
      val: growth.skills.length ? Math.round(growth.skills.reduce((s, sk) => s + (sk.p || 0), 0) / growth.skills.length) + "%" : "—",
      label: "Skills",
      color: col
    }]
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: "books",
      label: "📚 Books"
    }, {
      id: "watch",
      label: "🎌 Watch"
    }, {
      id: "skills",
      label: "🧠 Skills"
    }],
    active: tab,
    set: setTab,
    color: col
  }), list.map(item => /*#__PURE__*/React.createElement(GCard, {
    key: item.id,
    item: item
  })), !list.length && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      marginBottom: 6
    }
  }, "📭"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, "Nothing yet · Tap + Add")), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    },
    title: editId ? "Edit" : "Add to Growth"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, !editId && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Type"), /*#__PURE__*/React.createElement(Sel, {
    v: f.type,
    set: v => setF(p => ({
      ...p,
      type: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "book"
  }, "📚 Book"), /*#__PURE__*/React.createElement("option", {
    value: "watch"
  }, "🎌 Anime / Show"), /*#__PURE__*/React.createElement("option", {
    value: "skill"
  }, "🧠 Skill"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Title"), /*#__PURE__*/React.createElement(Inp, {
    v: f.title,
    set: v => setF(p => ({
      ...p,
      title: v
    })),
    ph: "Title"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, f.type === "skill" ? "Platform" : "Author / Episodes"), /*#__PURE__*/React.createElement(Inp, {
    v: f.by,
    set: v => setF(p => ({
      ...p,
      by: v
    })),
    ph: f.type === "skill" ? "YouTube…" : "Author or S1–S3"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Status"), /*#__PURE__*/React.createElement(Sel, {
    v: f.status,
    set: v => setF(p => ({
      ...p,
      status: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "wishlist"
  }, "Wishlist"), /*#__PURE__*/React.createElement("option", {
    value: "reading"
  }, "Reading"), /*#__PURE__*/React.createElement("option", {
    value: "watching"
  }, "Watching"), /*#__PURE__*/React.createElement("option", {
    value: "done"
  }, "Done ✓"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Progress %"), /*#__PURE__*/React.createElement(Inp, {
    type: "number",
    v: f.p,
    set: v => setF(p => ({
      ...p,
      p: v
    })),
    ph: "0"
  }))), /*#__PURE__*/React.createElement(SBtn, {
    label: editId ? "Save Changes" : "Add",
    color: col,
    onClick: save
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => {
      setSheet(false);
      setEditId(null);
      setF(BLANK);
    }
  }))));
}
function CalendarView({
  data,
  scheduled,
  setScheduled,
  habits,
  biz,
  health,
  finance,
  initSel,
  timeBlocks,
  setTimeBlocks
}) {
  const col = SEC.calendar.c;
  const now = new Date();
  const [yr, setYr] = useState(now.getFullYear());
  const [mo, setMo] = useState(now.getMonth());
  const [sel, setSel] = useState(initSel || todayStr());
  const [sheet, setSheet] = useState(false);
  const [f, setF] = useState({
    name: "",
    date: sel,
    time: "",
    cat: "Business",
    note: ""
  });
  const evtPanelRef = React.useRef(null);
  // Sync if parent passes a new initSel
  React.useEffect(() => {
    if (initSel && initSel !== sel) {
      setSel(initSel);
    }
  }, [initSel]);

  // Build all events fresh on every render so they stay in sync
  const evts = React.useMemo(() => {
    const arr = [];
    // All tasks with a date from unified task list
    data.tasks?.filter(t => t.date).forEach(t => {
      const cat = taskCat(t.cat);
      arr.push({
        date: t.date,
        label: t.name,
        color: cat.color,
        type: "task",
        id: t.id,
        done: t.done,
        time: t.time
      });
    });
    // Bills
    data.bills.filter(b => b.due).forEach(b => arr.push({
      date: b.due,
      label: b.name,
      color: C.danger,
      type: "bill",
      id: b.id,
      done: b.paid
    }));
    // Health goals with deadline
    health.goals.filter(g => g.dl).forEach(g => arr.push({
      date: g.dl,
      label: g.title,
      color: C.green,
      type: "goal",
      id: g.id,
      done: g.p === 100
    }));
    // Business goals with deadline
    biz.goals.filter(g => g.dl).forEach(g => arr.push({
      date: g.dl,
      label: g.title,
      color: C.blue,
      type: "goal",
      id: g.id,
      done: g.p === 100
    }));
    // Finance goals with deadline
    finance.goals?.filter(g => g.dl).forEach(g => arr.push({
      date: g.dl,
      label: g.title,
      color: C.indigo,
      type: "goal",
      id: g.id,
      done: pct(g.saved, g.target) === 100
    }));
    // Today's habits
    const t = todayStr();
    habits.forEach(h => arr.push({
      date: t,
      label: h.name,
      color: C.violet,
      type: "habit",
      id: h.id,
      done: h.done
    }));
    return arr;
  }, [data.tasks, data.bills, health, biz, finance, habits]);
  const firstDay = new Date(yr, mo, 1).getDay();
  const dim = new Date(yr, mo + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({
    length: dim
  }, (_, i) => i + 1)];
  function ds(d) {
    return `${yr}-${String(mo + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const selEvts = evts.filter(e => e.date === sel);
  const tIcon = {
    task: "📌",
    deadline: "⏰",
    bill: "💳",
    goal: "🎯",
    habit: "⚡"
  };
  const [calTab, setCalTab] = useState("month");
  function prevMo() {
    if (mo === 0) {
      setMo(11);
      setYr(y => y - 1);
    } else setMo(m => m - 1);
  }
  function nextMo() {
    if (mo === 11) {
      setMo(0);
      setYr(y => y + 1);
    } else setMo(m => m + 1);
  }
  function selectDay(dstr) {
    setSel(dstr);
    // Scroll to events panel after state update
    setTimeout(() => {
      if (evtPanelRef.current) {
        evtPanelRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 50);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Calendar",
    sub: "All tasks · Habits · Deadlines",
    color: col,
    onAdd: () => {
      setF(p => ({
        ...p,
        date: sel
      }));
      setSheet(true);
    }
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: "month",
      label: "📅 Month"
    }, {
      id: "blocks",
      label: "⏱ Time Blocks"
    }],
    active: calTab,
    set: setCalTab,
    color: col
  }), calTab === "blocks" && /*#__PURE__*/React.createElement(TimeBlockView, {
    timeBlocks: timeBlocks,
    setTimeBlocks: setTimeBlocks,
    tasks: data.tasks,
    biz: biz,
    health: health,
    scheduled: scheduled,
    selDate: sel
  }), calTab === "month" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 16,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: prevMo,
    style: {
      background: "#F3F4F6",
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      cursor: "pointer",
      fontWeight: 700,
      color: C.sub
    }
  }, "‹"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: C.text
    }
  }, MONTHS[mo], " ", yr), /*#__PURE__*/React.createElement("button", {
    onClick: nextMo,
    style: {
      background: "#F3F4F6",
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      cursor: "pointer",
      fontWeight: 700,
      color: C.sub
    }
  }, "›")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      marginBottom: 4
    }
  }, DAYS.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      textAlign: "center",
      fontSize: 10,
      fontWeight: 700,
      color: C.mute,
      padding: "3px 0"
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 2
    }
  }, cells.map((d, i) => {
    if (!d) return /*#__PURE__*/React.createElement("div", {
      key: `e${i}`
    });
    const dstr = ds(d);
    const dayEvts = evts.filter(e => e.date === dstr);
    const isToday = dstr === todayStr();
    const isSel = dstr === sel;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      onClick: () => selectDay(dstr),
      style: {
        textAlign: "center",
        padding: "6px 2px 4px",
        borderRadius: 8,
        cursor: "pointer",
        background: isSel ? col : isToday ? "#F0FDF9" : "transparent",
        border: `1px solid ${isSel ? col : isToday ? "#A7F3D0" : "transparent"}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: isSel || isToday ? 800 : 500,
        color: isSel ? "#fff" : isToday ? col : C.text
      }
    }, d), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        gap: 2,
        marginTop: 2,
        minHeight: 6
      }
    }, dayEvts.slice(0, 3).map((e, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: 4,
        height: 4,
        borderRadius: 99,
        background: isSel ? "rgba(255,255,255,.7)" : e.color,
        opacity: e.done ? .4 : 1
      }
    }))));
  }))), /*#__PURE__*/React.createElement("div", {
    ref: evtPanelRef,
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.sub,
      marginBottom: 10,
      paddingTop: 4
    }
  }, sel === todayStr() ? "Today " : "📅 ", sel === todayStr() ? "" : fmtDate(sel) + " · ", selEvts.length, " item", selEvts.length !== 1 ? "s" : ""), selEvts.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "28px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 6
    }
  }, "📭"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "Nothing scheduled"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 2
    }
  }, "Tap + Add to schedule something")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, selEvts.map(e => /*#__PURE__*/React.createElement(Card, {
    key: e.id + e.type,
    style: {
      padding: "12px 14px",
      borderLeft: `3px solid ${e.color}`,
      borderRadius: `0 ${R}px ${R}px 0`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, tIcon[e.type] || "📌"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: e.done ? C.mute : C.text,
      textDecoration: e.done ? "line-through" : "none"
    }
  }, e.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: e.color,
      background: e.color + "18",
      padding: "1px 5px",
      borderRadius: 99
    }
  }, e.type)), e.done && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.ok,
      fontWeight: 700
    }
  }, "✓"), e.type === "task" && /*#__PURE__*/React.createElement("button", {
    onClick: () => setScheduled(p => p.filter(t => t.id !== e.id)),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "4px 6px"
    }
  }, "✕")))))), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => setSheet(false),
    title: "Schedule Task"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Task name"), /*#__PURE__*/React.createElement(Inp, {
    v: f.name,
    set: v => setF(p => ({
      ...p,
      name: v
    })),
    ph: "e.g. Doctor appointment"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Date"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: f.date,
    set: v => setF(p => ({
      ...p,
      date: v
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Time (opt)"), /*#__PURE__*/React.createElement(Inp, {
    type: "time",
    v: f.time,
    set: v => setF(p => ({
      ...p,
      time: v
    }))
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Category"), /*#__PURE__*/React.createElement(Sel, {
    v: f.cat,
    set: v => setF(p => ({
      ...p,
      cat: v
    }))
  }, ["Business", "Health", "Finance", "Family", "Travel", "Personal"].map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Notes (opt)"), /*#__PURE__*/React.createElement(Inp, {
    v: f.note,
    set: v => setF(p => ({
      ...p,
      note: v
    })),
    ph: "Any details…"
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: "Schedule Task",
    color: col,
    onClick: () => {
      if (!f.name.trim()) return;
      const catColors = {
        Business: C.blue,
        Health: C.green,
        Finance: C.indigo,
        Family: C.pink,
        Travel: C.cyan,
        Personal: C.violet
      };
      setScheduled(p => [...p, {
        ...f,
        id: "sc" + Date.now(),
        color: catColors[f.cat] || col,
        done: false,
        subs: []
      }]);
      setF({
        name: "",
        date: sel,
        time: "",
        cat: "Business",
        note: ""
      });
      setSheet(false);
    }
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setSheet(false)
  }))));
}

// ── DOCS & BILLS ──────────────────────────────────────────────────────────────
function DocsAndBills({
  bills,
  setBills,
  docs,
  setDocs
}) {
  const col = SEC.docs.c;
  const [tab, setTab] = useState("bills");
  const [billSheet, setBillSheet] = useState(false);
  const [docSheet, setDocSheet] = useState(false);
  const [viewDoc, setViewDoc] = useState(null);
  const fileRef = useRef();
  const [editBillId, setEditBillId] = useState(null);
  const [bf, setBf] = useState({
    name: "",
    amount: "",
    due: "",
    freq: "monthly",
    cat: "Tax"
  });
  function openBillEdit(b) {
    setEditBillId(b.id);
    setBf({
      name: b.name,
      amount: b.amount || "",
      due: b.due || "",
      freq: b.freq,
      cat: b.cat
    });
    setBillSheet(true);
  }
  const [df, setDf] = useState({
    name: "",
    cat: "Identity",
    expiry: "",
    reminder: "",
    note: "",
    fileName: "",
    fileData: ""
  });
  const [bcat, setBcat] = useState("All");
  const [dcat, setDcat] = useState("All");
  const upcoming = bills.filter(b => !b.paid && b.due && dLeft(b.due) <= 30 && dLeft(b.due) >= 0).length;
  const overdue = bills.filter(b => !b.paid && b.due && dLeft(b.due) < 0).length;
  const billsShow = bcat === "All" ? bills : bills.filter(b => b.cat === bcat);
  const docsShow = dcat === "All" ? docs : docs.filter(d => d.cat === dcat);
  const freqC = {
    monthly: C.blue,
    quarterly: C.amber,
    yearly: C.violet,
    weekly: C.teal
  };
  const catC = {
    Identity: C.blue,
    Insurance: C.green,
    Tax: C.indigo,
    Vehicle: C.amber,
    Property: C.teal,
    Other: C.sub
  };
  const docIcon = {
    Identity: "🪪",
    Insurance: "🛡",
    Tax: "📋",
    Vehicle: "🚗",
    Property: "🏠",
    Other: "📄"
  };
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setDf(p => ({
      ...p,
      fileName: file.name,
      fileData: ev.target.result
    }));
    reader.readAsDataURL(file);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Docs & Bills",
    sub: "Reminders · Vault · Payments",
    color: col,
    onAdd: tab === "bills" ? () => setBillSheet(true) : () => setDocSheet(true)
  }), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: upcoming,
      label: "Due soon",
      color: C.warn
    }, {
      val: overdue,
      label: "Overdue",
      color: overdue > 0 ? C.danger : C.ok
    }, {
      val: docs.length,
      label: "Docs",
      color: col
    }]
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      id: "bills",
      label: "💳 Bills"
    }, {
      id: "docs",
      label: "🗂 Vault"
    }],
    active: tab,
    set: setTab,
    color: col
  }), tab === "bills" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: 14,
      paddingBottom: 2,
      scrollbarWidth: "none"
    }
  }, ["All", "Tax", "Insurance", "Utility", "Other"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setBcat(c),
    style: {
      flexShrink: 0,
      padding: "6px 12px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11,
      background: bcat === c ? C.text : "#F3F4F6",
      color: bcat === c ? "#fff" : C.sub
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, billsShow.map(b => {
    const d = b.due ? dLeft(b.due) : null;
    const urg = d !== null && d < 0 ? C.danger : d !== null && d <= 7 ? C.warn : null;
    return /*#__PURE__*/React.createElement(Card, {
      key: b.id,
      style: {
        padding: "13px 14px",
        borderLeft: `3px solid ${urg || freqC[b.freq] || col}`,
        borderRadius: `0 ${R}px ${R}px 0`,
        opacity: b.paid ? .6 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: b.paid ? C.mute : C.text,
        textDecoration: b.paid ? "line-through" : "none"
      }
    }, b.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5,
        marginTop: 4,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      label: b.cat,
      color: freqC[b.freq] || col
    }), /*#__PURE__*/React.createElement(Tag, {
      label: b.freq,
      color: C.mute
    }), b.amount && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: C.ok
      }
    }, b.amount), b.due && /*#__PURE__*/React.createElement(Due, {
      dl: b.due
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flexShrink: 0,
        alignItems: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setBills(p => p.map(x => x.id === b.id ? {
        ...x,
        paid: !x.paid
      } : x)),
      style: {
        background: b.paid ? C.ok : C.text,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "5px 10px",
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, b.paid ? "Paid" : "Mark paid"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openBillEdit(b),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 12,
        cursor: "pointer",
        padding: "2px 3px"
      }
    }, "✏️"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setBills(p => p.filter(x => x.id !== b.id)),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 12,
        cursor: "pointer",
        padding: "2px 3px"
      }
    }, "✕")))));
  }))), tab === "docs" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: 14,
      paddingBottom: 2,
      scrollbarWidth: "none"
    }
  }, ["All", "Identity", "Insurance", "Tax", "Vehicle", "Property", "Other"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setDcat(c),
    style: {
      flexShrink: 0,
      padding: "6px 12px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11,
      background: dcat === c ? C.text : "#F3F4F6",
      color: dcat === c ? "#fff" : C.sub
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, docsShow.map(d => {
    const expSoon = d.expiry && dLeft(d.expiry) <= 90;
    const remDue = d.reminder && dLeft(d.reminder) <= 7 && dLeft(d.reminder) >= 0;
    return /*#__PURE__*/React.createElement(Card, {
      key: d.id,
      style: {
        padding: "13px 14px"
      },
      onClick: () => setViewDoc(d)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        flexShrink: 0,
        background: (catC[d.cat] || col) + "18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18
      }
    }, docIcon[d.cat] || "📄"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: C.text
      }
    }, d.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5,
        marginTop: 4,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      label: d.cat,
      color: catC[d.cat] || col
    }), d.expiry && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: expSoon ? C.warn : C.mute,
        fontWeight: 600
      }
    }, "Exp: ", fmtDate(d.expiry)), d.fileName && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.blue,
        fontWeight: 600
      }
    }, "📎 file"), remDue && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.danger,
        fontWeight: 700,
        background: C.danger + "18",
        padding: "1px 5px",
        borderRadius: 99
      }
    }, "⏰ Remind soon")), d.note && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.sub,
        marginTop: 3
      }
    }, d.note)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.mute,
        fontSize: 14
      }
    }, "›")));
  }))), viewDoc && /*#__PURE__*/React.createElement(Sheet, {
    open: !!viewDoc,
    onClose: () => setViewDoc(null),
    title: viewDoc.name
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, [{
    l: "Category",
    v: viewDoc.cat
  }, {
    l: "Expiry",
    v: fmtDate(viewDoc.expiry) || "—"
  }, {
    l: "Reminder",
    v: fmtDate(viewDoc.reminder) || "—"
  }, {
    l: "File",
    v: viewDoc.fileName || "Not uploaded"
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.l,
    style: {
      background: "#F9FAFB",
      borderRadius: 10,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .4
    }
  }, r.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.text,
      marginTop: 2
    }
  }, r.v)))), viewDoc.note && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: 10,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .4,
      marginBottom: 4
    }
  }, "Notes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.text
    }
  }, viewDoc.note)), viewDoc.fileData && /*#__PURE__*/React.createElement("a", {
    href: viewDoc.fileData,
    download: viewDoc.fileName,
    style: {
      display: "block",
      background: C.text,
      color: "#fff",
      borderRadius: R,
      padding: "12px",
      textAlign: "center",
      fontWeight: 700,
      fontSize: 14,
      textDecoration: "none"
    }
  }, "⬇ Download ", viewDoc.fileName), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDocs(p => p.filter(d => d.id !== viewDoc.id));
      setViewDoc(null);
    },
    style: {
      background: "#FEF2F2",
      color: C.danger,
      border: "none",
      borderRadius: R,
      padding: "12px",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer"
    }
  }, "🗑 Remove Document"))), /*#__PURE__*/React.createElement(Sheet, {
    open: billSheet,
    onClose: () => setBillSheet(false),
    title: editBillId ? "Edit Bill" : "Add Bill / Reminder"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Bill name"), /*#__PURE__*/React.createElement(Inp, {
    v: bf.name,
    set: v => setBf(p => ({
      ...p,
      name: v
    })),
    ph: "e.g. Health Insurance"
  })), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Amount (opt)"), /*#__PURE__*/React.createElement(Inp, {
    v: bf.amount,
    set: v => setBf(p => ({
      ...p,
      amount: v
    })),
    ph: "₹18,000"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Due date"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: bf.due,
    set: v => setBf(p => ({
      ...p,
      due: v
    }))
  }))), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Frequency"), /*#__PURE__*/React.createElement(Sel, {
    v: bf.freq,
    set: v => setBf(p => ({
      ...p,
      freq: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "monthly"
  }, "Monthly"), /*#__PURE__*/React.createElement("option", {
    value: "quarterly"
  }, "Quarterly"), /*#__PURE__*/React.createElement("option", {
    value: "yearly"
  }, "Yearly"), /*#__PURE__*/React.createElement("option", {
    value: "weekly"
  }, "Weekly"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Category"), /*#__PURE__*/React.createElement(Sel, {
    v: bf.cat,
    set: v => setBf(p => ({
      ...p,
      cat: v
    }))
  }, ["Tax", "Insurance", "Utility", "Other"].map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c))))), /*#__PURE__*/React.createElement(SBtn, {
    label: editBillId ? "Save Changes" : "Add Bill",
    color: col,
    onClick: () => {
      if (!bf.name.trim()) return;
      if (editBillId) {
        setBills(p => p.map(x => x.id === editBillId ? {
          ...x,
          ...bf
        } : x));
        setEditBillId(null);
      } else setBills(p => [...p, {
        ...bf,
        id: "bl" + Date.now(),
        paid: false
      }]);
      setBf({
        name: "",
        amount: "",
        due: "",
        freq: "monthly",
        cat: "Tax"
      });
      setBillSheet(false);
    }
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setBillSheet(false)
  }))), /*#__PURE__*/React.createElement(Sheet, {
    open: docSheet,
    onClose: () => setDocSheet(false),
    title: "Add Document"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Document name"), /*#__PURE__*/React.createElement(Inp, {
    v: df.name,
    set: v => setDf(p => ({
      ...p,
      name: v
    })),
    ph: "e.g. Passport"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Category"), /*#__PURE__*/React.createElement(Sel, {
    v: df.cat,
    set: v => setDf(p => ({
      ...p,
      cat: v
    }))
  }, ["Identity", "Insurance", "Tax", "Vehicle", "Property", "Other"].map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c)))), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Expiry date (opt)"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: df.expiry,
    set: v => setDf(p => ({
      ...p,
      expiry: v
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Reminder date (opt)"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: df.reminder,
    set: v => setDf(p => ({
      ...p,
      reminder: v
    }))
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Notes"), /*#__PURE__*/React.createElement(Inp, {
    v: df.note,
    set: v => setDf(p => ({
      ...p,
      note: v
    })),
    ph: "Policy no, details…"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Upload file (PDF / image)"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "application/pdf,image/*",
    onChange: handleFile,
    style: {
      display: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => fileRef.current.click(),
    style: {
      width: "100%",
      padding: "12px",
      border: `1.5px dashed ${C.border}`,
      borderRadius: R,
      background: "#F9FAFB",
      cursor: "pointer",
      fontSize: 13,
      color: C.sub,
      fontWeight: 600
    }
  }, df.fileName ? "📎 " + df.fileName : "📤 Tap to upload file")), /*#__PURE__*/React.createElement(SBtn, {
    label: "Save Document",
    color: col,
    onClick: () => {
      if (!df.name.trim()) return;
      setDocs(p => [...p, {
        ...df,
        id: "d" + Date.now()
      }]);
      setDf({
        name: "",
        cat: "Identity",
        expiry: "",
        reminder: "",
        note: "",
        fileName: "",
        fileData: ""
      });
      setDocSheet(false);
    }
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setDocSheet(false)
  }))));
}

// ── EISENHOWER MATRIX ────────────────────────────────────────────────────────
function EisenhowerMatrix({
  biz,
  tasks,
  setTasks,
  health,
  go
}) {
  const col = SEC.matrix.c;
  const [sel, setSel] = useState(null);
  const [overrides, setOverrides] = useState({}); // taskId → "q1"|"q2"|"q3"|"q4"
  const [addSheet, setAddSheet] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    quadrant: "q1",
    section: "business",
    pri: "high",
    dl: ""
  });
  const quadrants = [{
    id: "q1",
    label: "Do First",
    sub: "Urgent + Important",
    color: "#DC2626",
    bg: "#FEF2F2",
    icon: "🔥",
    desc: "Do these today — high stakes, tight deadline"
  }, {
    id: "q2",
    label: "Schedule",
    sub: "Important, not urgent",
    color: "#2563EB",
    bg: "#EFF6FF",
    icon: "📅",
    desc: "Plan time for these — they grow your future"
  }, {
    id: "q3",
    label: "Delegate",
    sub: "Urgent, not important",
    color: "#D97706",
    bg: "#FFFBEB",
    icon: "↗️",
    desc: "Hand off or batch — don't let these steal focus"
  }, {
    id: "q4",
    label: "Eliminate",
    sub: "Neither",
    color: "#6B7280",
    bg: "#F9FAFB",
    icon: "🗑",
    desc: "Drop or defer — not worth your energy"
  }];

  // Auto-classify a task if no override
  function autoQ(task) {
    const d = task.dl || task.date || "";
    const days = d ? dLeft(d) : 99;
    const urgent = days !== null && days <= 3;
    const imp = task.pri === "high" || task.pri === "medium" && urgent;
    if (urgent && imp) return "q1";
    if (!urgent && imp) return "q2";
    if (urgent && !imp) return "q3";
    return "q4";
  }
  function getQ(task) {
    return overrides[task.id] || autoQ(task);
  }
  function setQ(taskId, q) {
    setOverrides(p => ({
      ...p,
      [taskId]: q
    }));
    setSel(null);
  }

  // Build from unified tasks + goals
  const allTasks = [...tasks.filter(t => !t.done).map(t => {
    const cat = taskCat(t.cat);
    return {
      ...t,
      name: t.name,
      section: cat.label,
      sectionColor: cat.color,
      type: "task",
      sectionId: t.cat,
      dl: t.date
    };
  }), ...biz.goals.map(g => ({
    ...g,
    id: g.id,
    name: g.title,
    pri: g.pri,
    dl: g.dl,
    section: "Biz Goal",
    sectionColor: C.blue,
    type: "goal",
    sectionId: "business",
    progress: g.p
  })), ...health.goals.map(g => ({
    ...g,
    id: g.id,
    name: g.title,
    pri: g.pri,
    dl: g.dl,
    section: "Health Goal",
    sectionColor: C.green,
    type: "goal",
    sectionId: "health",
    progress: g.p
  }))];
  const byQ = {
    q1: [],
    q2: [],
    q3: [],
    q4: []
  };
  allTasks.forEach(t => {
    const q = getQ(t);
    if (byQ[q]) byQ[q].push(t);
  });
  function toggleDone(task) {
    if (task.type === "task") {
      setTasks(p => p.map(t => t.id === task.id ? {
        ...t,
        done: !t.done
      } : t));
    }
  }
  function addNewTask() {
    if (!newTask.name.trim()) return;
    const t = {
      id: "t" + Date.now(),
      name: newTask.name,
      cat: newTask.cat || "business",
      pri: newTask.pri,
      date: newTask.dl || "",
      time: "",
      done: false,
      note: "",
      subs: []
    };
    setTasks(p => [t, ...p]);
    setOverrides(p => ({
      ...p,
      [t.id]: newTask.quadrant
    }));
    setNewTask({
      name: "",
      quadrant: "q1",
      cat: "business",
      pri: "high",
      dl: ""
    });
    setAddSheet(false);
  }
  function TaskCard2({
    task
  }) {
    const isSel = sel?.id === task.id;
    const qid = getQ(task);
    const qcfg = quadrants.find(q => q.id === qid);
    const isAuto = !overrides[task.id];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => setSel(isSel ? null : task),
      style: {
        padding: "8px 10px",
        borderRadius: 10,
        background: "#fff",
        border: `1.5px solid ${isSel ? qcfg.color : task.sectionColor + "44"}`,
        cursor: "pointer",
        boxShadow: isSel ? `0 0 0 2px ${qcfg.color}33` : "none",
        transition: "all .15s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Tick, {
      on: task.done,
      toggle: () => toggleDone(task),
      color: qcfg.color
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: task.done ? C.mute : C.text,
        textDecoration: task.done ? "line-through" : "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, task.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        marginTop: 2,
        alignItems: "center",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: task.sectionColor,
        background: task.sectionColor + "22",
        padding: "1px 5px",
        borderRadius: 99
      }
    }, task.section), task.type === "goal" && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.mute
      }
    }, "📊 ", task.progress || 0, "%"), task.dl && /*#__PURE__*/React.createElement(Due, {
      dl: task.dl
    }), isAuto && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        color: C.mute,
        fontStyle: "italic"
      }
    }, "auto"))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.mute
      }
    }, isSel ? "▲" : "▼"))), isSel && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#F9FAFB",
        borderRadius: "0 0 10px 10px",
        padding: "10px 12px",
        border: `1px solid ${qcfg.color}22`,
        borderTop: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: C.sub,
        marginBottom: 8
      }
    }, "Move to quadrant:"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 5,
        marginBottom: 8
      }
    }, quadrants.map(q => /*#__PURE__*/React.createElement("button", {
      key: q.id,
      onClick: () => setQ(task.id, q.id),
      style: {
        padding: "6px 4px",
        borderRadius: 8,
        border: `1.5px solid ${q.id === qid ? q.color : C.border}`,
        background: q.id === qid ? q.color + "15" : "#fff",
        cursor: "pointer",
        fontSize: 10,
        fontWeight: 700,
        color: q.id === qid ? q.color : C.sub,
        transition: "all .15s"
      }
    }, q.icon, " ", q.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => go(task.sectionId),
      style: {
        flex: 1,
        padding: "6px",
        background: C.text,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, "Open in ", task.section.replace(" Goal", ""), " →"), overrides[task.id] && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setOverrides(p => {
          const n = {
            ...p
          };
          delete n[task.id];
          return n;
        });
        setSel(null);
      },
      style: {
        padding: "6px 10px",
        background: "#F3F4F6",
        border: "none",
        borderRadius: 8,
        fontSize: 10,
        fontWeight: 700,
        color: C.sub,
        cursor: "pointer"
      }
    }, "Auto"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        if (task.type === "task") setTasks(p => p.filter(x => x.id !== task.id));
        setSel(null);
      },
      style: {
        padding: "6px 10px",
        background: "#FEF2F2",
        border: "none",
        borderRadius: 8,
        fontSize: 10,
        fontWeight: 700,
        color: C.danger,
        cursor: "pointer"
      }
    }, "🗑"))));
  }
  const totalTasks = allTasks.length;
  const doneTasks = allTasks.filter(t => t.done).length;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Eisenhower Matrix",
    sub: "Assign · Prioritise · Execute",
    color: col,
    onAdd: () => setAddSheet(true)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F9FAFB",
      borderRadius: R,
      padding: "10px 14px",
      marginBottom: 14,
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.text,
      marginBottom: 4
    }
  }, "How it works"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.sub,
      lineHeight: 1.5
    }
  }, "Tasks auto-sort by deadline + priority. Tap any task to ", /*#__PURE__*/React.createElement("strong", null, "manually move it"), " to any quadrant. Business goals, health goals, and scheduled tasks all appear here.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 6,
      marginBottom: 14
    }
  }, quadrants.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.id,
    style: {
      background: q.bg,
      borderRadius: 10,
      padding: "8px 6px",
      textAlign: "center",
      border: `1px solid ${q.color}22`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16
    }
  }, q.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: q.color,
      marginTop: 2
    }
  }, byQ[q.id].length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: q.color,
      fontWeight: 600,
      marginTop: 1
    }
  }, q.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, quadrants.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.id,
    style: {
      background: q.bg,
      borderRadius: R,
      padding: 12,
      border: `1px solid ${q.color}22`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, q.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: q.color
    }
  }, q.label, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: q.color + "99",
      marginLeft: 6
    }
  }, "(", byQ[q.id].length, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.mute
    }
  }, q.desc))), byQ[q.id].length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      textAlign: "center",
      padding: "10px 0"
    }
  }, "Nothing here ✓") : byQ[q.id].map(t => /*#__PURE__*/React.createElement(TaskCard2, {
    key: t.id,
    task: t
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.sub
    }
  }, "Overall completion"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.text
    }
  }, doneTasks, "/", totalTasks)), /*#__PURE__*/React.createElement(Bar, {
    v: pct(doneTasks, totalTasks),
    color: col
  })), /*#__PURE__*/React.createElement(Sheet, {
    open: addSheet,
    onClose: () => setAddSheet(false),
    title: "Add Task to Matrix"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Task name"), /*#__PURE__*/React.createElement(Inp, {
    v: newTask.name,
    set: v => setNewTask(p => ({
      ...p,
      name: v
    })),
    ph: "e.g. Call client about payment"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Place in quadrant"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 6
    }
  }, quadrants.map(q => /*#__PURE__*/React.createElement("button", {
    key: q.id,
    onClick: () => setNewTask(p => ({
      ...p,
      quadrant: q.id
    })),
    style: {
      padding: "8px",
      borderRadius: 10,
      border: `1.5px solid ${newTask.quadrant === q.id ? q.color : C.border}`,
      background: newTask.quadrant === q.id ? q.color + "15" : "#fff",
      cursor: "pointer",
      fontSize: 11,
      fontWeight: 700,
      color: newTask.quadrant === q.id ? q.color : C.sub
    }
  }, q.icon, " ", q.label)))), /*#__PURE__*/React.createElement(G2, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Category"), /*#__PURE__*/React.createElement(Sel, {
    v: newTask.cat || "business",
    set: v => setNewTask(p => ({
      ...p,
      cat: v
    }))
  }, TASK_CATS.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.icon, " ", c.label)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Priority"), /*#__PURE__*/React.createElement(Sel, {
    v: newTask.pri,
    set: v => setNewTask(p => ({
      ...p,
      pri: v
    }))
  }, /*#__PURE__*/React.createElement("option", {
    value: "high"
  }, "🔴 High"), /*#__PURE__*/React.createElement("option", {
    value: "medium"
  }, "🟡 Med"), /*#__PURE__*/React.createElement("option", {
    value: "low"
  }, "🟢 Low")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Deadline (opt)"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: newTask.dl,
    set: v => setNewTask(p => ({
      ...p,
      dl: v
    }))
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: "Add Task",
    color: col,
    onClick: addNewTask
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setAddSheet(false)
  }))));
}

// ── WEEKLY REVIEW ────────────────────────────────────────────────────────────
function WeeklyReview({
  data
}) {
  const col = SEC.review.c;
  const h = data.habits,
    dH = h.filter(x => x.done).length;
  const b = (data.tasks || []).filter(t => t.cat === "business"),
    dB = b.filter(x => x.done).length;
  const totalSaved = data.finance.goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = data.finance.goals.reduce((s, g) => s + g.target, 0);
  const topStreak = h.reduce((m, x) => x.streak > m ? x.streak : m, 0);
  const upcomingBills = data.bills.filter(b => !b.paid && b.due && dLeft(b.due) <= 14 && dLeft(b.due) >= 0);
  const familyTotal = data.family.reduce((s, f) => s + f.sessions.filter(x => x.done).length, 0);
  const familyAll = data.family.reduce((s, f) => s + f.sessions.length, 0);
  const areaScores = {
    habits: pct(dH, h.length),
    business: pct(dB, b.length),
    health: Math.round(data.health.goals.reduce((s, g) => s + g.p, 0) / Math.max(data.health.goals.length, 1)),
    family: pct(familyTotal, familyAll),
    finance: pct(totalSaved, totalTarget),
    travel: Math.round(data.travel.reduce((s, t) => s + t.p, 0) / Math.max(data.travel.length, 1)),
    growth: Math.round([...data.growth.books, ...data.growth.watch, ...data.growth.skills].reduce((s, i) => s + i.p, 0) / Math.max([...data.growth.books, ...data.growth.watch, ...data.growth.skills].length, 1)),
    shopping: pct(data.shopping.filter(s => s.done).length, data.shopping.length)
  };
  const overallScore = Math.round(Object.values(areaScores).reduce((s, v) => s + v, 0) / 8);
  const grade = overallScore >= 90 ? "A+" : overallScore >= 80 ? "A" : overallScore >= 70 ? "B" : overallScore >= 60 ? "C" : "D";
  const gradeColor = overallScore >= 80 ? C.ok : overallScore >= 60 ? C.warn : C.danger;
  const wins = [dH > 0 && `✅ Completed ${dH} habit${dH !== 1 ? "s" : ""} today`, topStreak > 0 && `🔥 Best streak: ${topStreak} days`, dB > 0 && `💼 ${dB} business task${dB !== 1 ? "s" : ""} done`, familyTotal > 0 && `👨‍👩‍👧 ${familyTotal} family session${familyTotal !== 1 ? "s" : ""} completed`].filter(Boolean);
  const improve = [h.filter(x => !x.done).length > 0 && `⚡ ${h.filter(x => !x.done).length} habit${h.filter(x => !x.done).length !== 1 ? "s" : ""} incomplete`, b.filter(t => !t.done && t.pri === "high").length > 0 && `💼 ${b.filter(t => !t.done && t.pri === "high").length} high priority task${b.filter(t => !t.done && t.pri === "high").length !== 1 ? "s" : ""} pending`, upcomingBills.length > 0 && `💳 ${upcomingBills.length} bill${upcomingBills.length !== 1 ? "s" : ""} due in 2 weeks`].filter(Boolean);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Weekly Review",
    sub: new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short"
    }),
    color: col
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 20,
      marginBottom: 14,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 56,
      fontWeight: 900,
      color: gradeColor,
      letterSpacing: -2,
      lineHeight: 1
    }
  }, grade), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.sub,
      marginTop: 4
    }
  }, "Overall score: ", overallScore, "/100"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute,
      marginTop: 2
    }
  }, overallScore >= 80 ? "Great week! Keep the momentum." : overallScore >= 60 ? "Solid effort. A few areas need attention." : "Room to grow. Focus on the basics.")), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 16,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text,
      marginBottom: 12
    }
  }, "Area Breakdown"), Object.entries(areaScores).map(([k, v]) => {
    const grade2 = v >= 80 ? "A" : v >= 60 ? "B" : v >= 40 ? "C" : "D";
    const gc = v >= 80 ? C.ok : v >= 60 ? C.warn : C.danger;
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, SEC[k]?.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: C.text
      }
    }, SEC[k]?.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: gc
      }
    }, grade2), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.mute
      }
    }, v, "%"))), /*#__PURE__*/React.createElement(Bar, {
      v: v,
      color: SEC[k]?.c || C.blue
    }));
  })), wins.length > 0 && /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      marginBottom: 14,
      background: "#F0FDF4",
      border: "1px solid #BBF7D0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.ok,
      marginBottom: 10
    }
  }, "This week's wins"), wins.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      color: "#065F46",
      padding: "3px 0"
    }
  }, w))), improve.length > 0 && /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      marginBottom: 14,
      background: "#FFFBEB",
      border: "1px solid #FDE68A"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.warn,
      marginBottom: 10
    }
  }, "Focus next week"), improve.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      color: "#78350F",
      padding: "3px 0"
    }
  }, w))), upcomingBills.length > 0 && /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.text,
      marginBottom: 10
    }
  }, "💳 Bills due soon"), upcomingBills.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "5px 0",
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: C.text
    }
  }, b.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      alignItems: "center"
    }
  }, b.amount && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.ok
    }
  }, b.amount), /*#__PURE__*/React.createElement(Due, {
    dl: b.due
  }))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      background: C.text,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "rgba(255,255,255,.5)",
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 4
    }
  }, "Finance Progress"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -.5
    }
  }, fmtL(totalSaved)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,.5)",
      marginTop: 2
    }
  }, "of ", fmtL(totalTarget), " · ", pct(totalSaved, totalTarget), "% of total goals"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      height: 4,
      borderRadius: 99,
      background: "rgba(255,255,255,.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 99,
      background: "rgba(255,255,255,.7)",
      width: pct(totalSaved, totalTarget) + "%"
    }
  }))));
}

// ── TIME BLOCKING VIEW ───────────────────────────────────────────────────────
function TimeBlockView({
  timeBlocks,
  setTimeBlocks,
  tasks,
  biz,
  health,
  scheduled,
  selDate
}) {
  const col = SEC.calendar.c;
  const blocks = ["morning", "afternoon", "evening", "night"];
  const blockLabels = {
    morning: "🌅 Morning (6–12)",
    afternoon: "☀️ Afternoon (12–17)",
    evening: "🌆 Evening (17–21)",
    night: "🌙 Night (21–24)"
  };
  const [addSheet, setAddSheet] = useState(false);
  const [f, setF] = useState({
    block: "morning",
    taskName: "",
    color: C.blue
  });
  const dayBlocks = timeBlocks.filter(tb => tb.date === selDate);
  const availTasks = [...(tasks || []).filter(t => !t.done && t.cat === "business").map(t => ({
    id: t.id,
    name: t.name,
    color: C.blue
  })), ...(tasks || []).filter(t => !t.done && t.cat === "health").map(t => ({
    id: t.id,
    name: t.name,
    color: C.green
  })), ...scheduled.filter(t => t.date === selDate).map(t => ({
    id: t.id,
    name: t.name,
    color: t.color || col
  }))];
  function addBlock() {
    if (!f.taskName.trim()) return;
    setTimeBlocks(p => [...p, {
      id: "tb" + Date.now(),
      date: selDate,
      block: f.block,
      taskName: f.taskName,
      color: f.color,
      done: false
    }]);
    setF({
      block: "morning",
      taskName: "",
      color: C.blue
    });
    setAddSheet(false);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, "⏱ Time Blocks — ", fmtDate(selDate) || "Today"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAddSheet(true),
    style: {
      background: C.text,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      fontWeight: 700,
      fontSize: 12,
      cursor: "pointer"
    }
  }, "+ Block")), blocks.map(block => {
    const items = dayBlocks.filter(tb => tb.block === block);
    return /*#__PURE__*/React.createElement("div", {
      key: block,
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: C.mute,
        letterSpacing: .8,
        textTransform: "uppercase",
        marginBottom: 6
      }
    }, blockLabels[block]), /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 44,
        background: "#F9FAFB",
        borderRadius: R,
        padding: items.length ? 8 : 0,
        border: `1px dashed ${C.border}`
      }
    }, items.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 0",
        textAlign: "center",
        fontSize: 11,
        color: C.mute
      }
    }, "Empty — tap + Block to add") : items.map(tb => /*#__PURE__*/React.createElement("div", {
      key: tb.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        background: "#fff",
        borderRadius: 8,
        marginBottom: 5,
        borderLeft: `3px solid ${tb.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 12,
        fontWeight: 600,
        color: C.text
      }
    }, tb.taskName), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTimeBlocks(p => p.filter(x => x.id !== tb.id)),
      style: {
        background: "none",
        border: "none",
        color: C.mute,
        fontSize: 12,
        cursor: "pointer"
      }
    }, "✕")))));
  }), /*#__PURE__*/React.createElement(Sheet, {
    open: addSheet,
    onClose: () => setAddSheet(false),
    title: "Add Time Block"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Task name"), /*#__PURE__*/React.createElement(Inp, {
    v: f.taskName,
    set: v => setF(p => ({
      ...p,
      taskName: v
    })),
    ph: "e.g. Update ledger"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Time block"), /*#__PURE__*/React.createElement(Sel, {
    v: f.block,
    set: v => setF(p => ({
      ...p,
      block: v
    }))
  }, blocks.map(b => /*#__PURE__*/React.createElement("option", {
    key: b,
    value: b
  }, blockLabels[b])))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Category colour"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 4
    }
  }, [C.blue, C.green, C.indigo, C.pink, C.cyan, C.amber].map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    onClick: () => setF(p => ({
      ...p,
      color: c
    })),
    style: {
      width: 28,
      height: 28,
      borderRadius: 99,
      background: c,
      cursor: "pointer",
      border: f.color === c ? "3px solid #111" : "3px solid transparent"
    }
  })))), /*#__PURE__*/React.createElement(SBtn, {
    label: "Add Block",
    color: col,
    onClick: addBlock
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setAddSheet(false)
  }))));
}

// ── CONTRIBUTION LOG (injected into Finance) ──────────────────────────────────
function ContribLog({
  goalId,
  goalTitle,
  contributions,
  setContributions,
  color,
  onContribute
}) {
  const [sheet, setSheet] = useState(false);
  const [f, setF] = useState({
    amount: "",
    note: "",
    date: todayStr()
  });
  const goalContribs = contributions.filter(c => c.goalId === goalId);
  const totalAdded = goalContribs.reduce((s, c) => s + (parseInt(c.amount) || 0), 0);
  function add() {
    const amt = parseInt(f.amount) || 0;
    if (!amt) return;
    setContributions(p => [...p, {
      ...f,
      id: "c" + Date.now(),
      goalId,
      amount: amt
    }]);
    if (onContribute) onContribute(amt); // ← updates goal.saved
    setF({
      amount: "",
      note: "",
      date: todayStr()
    });
    setSheet(false);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: `1px dashed ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.sub
    }
  }, "Contributions · ", fmtL(totalAdded), " logged"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSheet(true),
    style: {
      background: color,
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 10,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "+ Log ₹")), goalContribs.slice(-3).reverse().map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 0",
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: C.text
    }
  }, "+", fmtL(c.amount)), c.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.mute
    }
  }, c.note)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.mute
    }
  }, fmtDate(c.date)))), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => setSheet(false),
    title: `Log contribution — ${goalTitle}`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Amount (₹)"), /*#__PURE__*/React.createElement(Inp, {
    type: "number",
    v: f.amount,
    set: v => setF(p => ({
      ...p,
      amount: v
    })),
    ph: "5000"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Note (opt)"), /*#__PURE__*/React.createElement(Inp, {
    v: f.note,
    set: v => setF(p => ({
      ...p,
      note: v
    })),
    ph: "June SIP, bonus savings…"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Date"), /*#__PURE__*/React.createElement(Inp, {
    type: "date",
    v: f.date,
    set: v => setF(p => ({
      ...p,
      date: v
    }))
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: "Log Contribution",
    color: color,
    onClick: add
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setSheet(false)
  }))));
}
function JournalPage({
  journal,
  setJournal
}) {
  const col = SEC.journal.c;
  const [sheet, setSheet] = useState(false);
  const [view, setView] = useState(null); // viewing a single entry
  const [editId, setEditId] = useState(null);
  const [f, setF] = useState({
    title: "",
    mood: "😊",
    body: "",
    tags: ""
  });
  function openEdit(j) {
    setEditId(j.id);
    setF({
      title: j.title || "",
      mood: j.mood || "😊",
      body: j.body || "",
      tags: (j.tags || []).join(", ")
    });
    setView(null);
    setSheet(true);
  }
  const [filter, setFilter] = useState("All");
  const tags = ["All", ...new Set(journal.flatMap(j => j.tags || []))];
  function add() {
    if (!f.body.trim()) return;
    const tags = f.tags ? f.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
    if (editId) {
      setJournal(p => p.map(j => j.id === editId ? {
        ...j,
        title: f.title,
        mood: f.mood,
        body: f.body,
        tags
      } : j));
      setEditId(null);
    } else {
      setJournal(p => [{
        ...f,
        id: "j" + Date.now(),
        date: todayStr(),
        tags
      }, ...p]);
    }
    setF({
      title: "",
      mood: "😊",
      body: "",
      tags: ""
    });
    setSheet(false);
  }
  const list = filter === "All" ? journal : journal.filter(j => (j.tags || []).includes(filter));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Journal",
    sub: "Reflect · Record · Review",
    color: col,
    onAdd: () => setSheet(true)
  }), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: journal.length,
      label: "Entries",
      color: col
    }, {
      val: [...new Set(journal.map(j => j.date))].length,
      label: "Days written",
      color: C.ok
    }, {
      val: [...new Set(journal.flatMap(j => j.tags || []))].length,
      label: "Topics",
      color: C.warn
    }]
  }), tags.length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: 14,
      paddingBottom: 2,
      scrollbarWidth: "none"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setFilter(t),
    style: {
      flexShrink: 0,
      padding: "6px 12px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11,
      background: filter === t ? col : "#F3F4F6",
      color: filter === t ? "#fff" : C.sub,
      transition: "all .15s"
    }
  }, t))), list.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 8
    }
  }, "📓"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, "Start journalling"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 4
    }
  }, "Tap + Add to write your first entry")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, list.map(j => /*#__PURE__*/React.createElement(Card, {
    key: j.id,
    style: {
      padding: 16
    },
    onClick: () => setView(j)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      lineHeight: 1,
      flexShrink: 0
    }
  }, j.mood), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, j.title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.text,
      marginBottom: 3
    }
  }, j.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.sub,
      lineHeight: 1.5,
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical"
    }
  }, j.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 8,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.mute
    }
  }, fmtDate(j.date)), (j.tags || []).map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: 9,
      background: "#F3F4F6",
      color: C.sub,
      padding: "1px 6px",
      borderRadius: 99,
      fontWeight: 600
    }
  }, "#", t)))), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setJournal(p => p.filter(x => x.id !== j.id));
    },
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "4px 6px",
      flexShrink: 0
    }
  }, "✕"))))), /*#__PURE__*/React.createElement(Sheet, {
    open: !!view,
    onClose: () => setView(null),
    title: view?.title || "Journal Entry"
  }, view && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 32
    }
  }, view.mood), /*#__PURE__*/React.createElement("div", null, view.title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: C.text
    }
  }, view.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.mute
    }
  }, fmtDate(view.date)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: C.text,
      lineHeight: 1.7,
      whiteSpace: "pre-wrap",
      padding: "14px",
      background: "#F9FAFB",
      borderRadius: R,
      marginBottom: 14
    }
  }, view.body), (view.tags || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, view.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: 11,
      background: "#F3F4F6",
      color: C.sub,
      padding: "2px 8px",
      borderRadius: 99,
      fontWeight: 600
    }
  }, "#", t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openEdit(view),
    style: {
      flex: 1,
      padding: "13px",
      borderRadius: R,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
      background: col,
      color: "#fff"
    }
  }, "✏️ Edit"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setView(null),
    style: {
      flex: 1,
      padding: "13px",
      borderRadius: R,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
      background: "#F3F4F6",
      color: C.sub
    }
  }, "Close")))), /*#__PURE__*/React.createElement(Sheet, {
    open: sheet,
    onClose: () => setSheet(false),
    title: editId ? "Edit Entry" : "New Journal Entry"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "How are you feeling?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, MOODS.map(m => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => setF(p => ({
      ...p,
      mood: m
    })),
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      border: `2px solid ${f.mood === m ? col : C.border}`,
      background: f.mood === m ? col + "15" : "#fff",
      cursor: "pointer",
      fontSize: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, m)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Title (optional)"), /*#__PURE__*/React.createElement(Inp, {
    v: f.title,
    set: v => setF(p => ({
      ...p,
      title: v
    })),
    ph: "e.g. Weekly reflection"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Entry"), /*#__PURE__*/React.createElement("textarea", {
    value: f.body,
    onChange: e => setF(p => ({
      ...p,
      body: e.target.value
    })),
    placeholder: "What's on your mind? Reflect, record ideas, note wins…",
    rows: 6,
    style: {
      ...{
        width: "100%",
        padding: "12px 14px",
        border: "1.5px solid #E5E7EB",
        borderRadius: R,
        fontSize: 15,
        outline: "none",
        background: "#fff",
        color: C.text,
        boxSizing: "border-box",
        resize: "vertical",
        fontFamily: "inherit"
      },
      lineHeight: 1.6
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Tags (comma-separated)"), /*#__PURE__*/React.createElement(Inp, {
    v: f.tags,
    set: v => setF(p => ({
      ...p,
      tags: v
    })),
    ph: "reflection, business, idea…"
  })), /*#__PURE__*/React.createElement(SBtn, {
    label: editId ? "Save Changes" : "Save Entry",
    color: col,
    onClick: add
  }), /*#__PURE__*/React.createElement(SBtn, {
    label: "Cancel",
    ghost: true,
    onClick: () => setSheet(false)
  }))));
}

// ── QUICK NOTES ────────────────────────────────────────────────────────────────
// ── NOTE ITEM (top-level — stable identity across re-renders) ───────────────
function NoteItem({
  n,
  col,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  setEditId,
  toggle,
  pin,
  del
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "12px 14px",
      marginBottom: 8,
      borderLeft: n.pinned ? `3px solid ${C.warn}` : "none",
      borderRadius: n.pinned ? `0 ${R}px ${R}px 0` : `${R}px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tick, {
    on: n.done,
    toggle: () => toggle(n.id),
    color: col
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, editId === n.id ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: editText,
    onChange: e => setEditText(e.target.value),
    autoFocus: true,
    onKeyDown: e => {
      if (e.key === "Enter") saveEdit();
      if (e.key === "Escape") {
        setEditId(null);
        setEditText("");
      }
    },
    style: {
      flex: 1,
      padding: "8px 10px",
      border: `1.5px solid ${col}`,
      borderRadius: 8,
      fontSize: 14,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: saveEdit,
    style: {
      background: col,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "6px 10px",
      fontWeight: 700,
      fontSize: 12,
      cursor: "pointer"
    }
  }, "✓")) : /*#__PURE__*/React.createElement("div", {
    onClick: () => startEdit(n),
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: n.done ? C.mute : C.text,
      textDecoration: n.done ? "line-through" : "none",
      lineHeight: 1.4,
      cursor: "pointer"
    }
  }, n.text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.mute,
      marginTop: 3
    }
  }, fmtDate(n.created))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => pin(n.id),
    style: {
      background: "none",
      border: "none",
      color: n.pinned ? C.warn : C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "4px 5px"
    }
  }, n.pinned ? "📌" : "📍"), /*#__PURE__*/React.createElement("button", {
    onClick: () => del(n.id),
    style: {
      background: "none",
      border: "none",
      color: C.mute,
      fontSize: 14,
      cursor: "pointer",
      padding: "4px 5px"
    }
  }, "✕"))));
}
function QuickNotes({
  quickNotes,
  setQuickNotes
}) {
  const col = SEC.notes.c;
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  function startEdit(n) {
    setEditId(n.id);
    setEditText(n.text);
  }
  function saveEdit() {
    if (editText.trim()) setQuickNotes(p => p.map(n => n.id === editId ? {
      ...n,
      text: editText.trim()
    } : n));
    setEditId(null);
    setEditText("");
  }
  function add() {
    if (!text.trim()) return;
    setQuickNotes(p => [{
      id: "qn" + Date.now(),
      text: text.trim(),
      done: false,
      pinned: false,
      created: todayStr()
    }, ...p]);
    setText("");
  }
  function toggle(id) {
    setQuickNotes(p => p.map(n => n.id === id ? {
      ...n,
      done: !n.done
    } : n));
  }
  function pin(id) {
    setQuickNotes(p => p.map(n => n.id === id ? {
      ...n,
      pinned: !n.pinned
    } : n));
  }
  function del(id) {
    setQuickNotes(p => p.filter(n => n.id !== id));
  }
  const pinned = quickNotes.filter(n => n.pinned && !n.done);
  const active = quickNotes.filter(n => !n.pinned && !n.done);
  const done = quickNotes.filter(n => n.done);
  const show = filter === "all" ? [...pinned, ...active] : filter === "done" ? done : pinned;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hdr, {
    title: "Quick Notes",
    sub: "Capture ideas instantly",
    color: col
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: text,
    onChange: e => setText(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && text.trim()) {
        add();
      }
    },
    placeholder: "Type a note and press Enter…",
    style: {
      flex: 1,
      padding: "11px 14px",
      border: `1.5px solid ${C.border}`,
      borderRadius: R,
      fontSize: 15,
      outline: "none",
      background: "#fff",
      color: C.text
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      background: col,
      color: "#fff",
      border: "none",
      borderRadius: R,
      padding: "11px 16px",
      fontWeight: 800,
      fontSize: 18,
      cursor: "pointer",
      flexShrink: 0
    }
  }, "+"))), /*#__PURE__*/React.createElement(Stats, {
    items: [{
      val: active.length + pinned.length,
      label: "Active",
      color: col
    }, {
      val: pinned.length,
      label: "Pinned",
      color: C.warn
    }, {
      val: done.length,
      label: "Done",
      color: C.ok
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 14
    }
  }, [{
    id: "all",
    l: "All"
  }, {
    id: "pinned",
    l: "📌 Pinned"
  }, {
    id: "done",
    l: "✓ Done"
  }].map(f2 => /*#__PURE__*/React.createElement("button", {
    key: f2.id,
    onClick: () => setFilter(f2.id),
    style: {
      padding: "7px 14px",
      borderRadius: 99,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 12,
      background: filter === f2.id ? col : "#F3F4F6",
      color: filter === f2.id ? "#fff" : C.sub,
      transition: "all .15s"
    }
  }, f2.l))), show.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 16px",
      color: C.mute
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 6
    }
  }, "💭"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, "No notes here"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 3
    }
  }, "Type above and press Enter to capture a thought")), filter === "all" && pinned.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 8
    }
  }, "📌 Pinned"), pinned.map(n => /*#__PURE__*/React.createElement(NoteItem, {
    key: n.id,
    n: n,
    col: col,
    editId: editId,
    editText: editText,
    setEditText: setEditText,
    startEdit: startEdit,
    saveEdit: saveEdit,
    setEditId: setEditId,
    toggle: toggle,
    pin: pin,
    del: del
  }))), filter === "all" && active.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.mute,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 8
    }
  }, "Recent"), active.map(n => /*#__PURE__*/React.createElement(NoteItem, {
    key: n.id,
    n: n,
    col: col,
    editId: editId,
    editText: editText,
    setEditText: setEditText,
    startEdit: startEdit,
    saveEdit: saveEdit,
    setEditId: setEditId,
    toggle: toggle,
    pin: pin,
    del: del
  }))), (filter === "done" || filter === "pinned") && show.map(n => /*#__PURE__*/React.createElement(NoteItem, {
    key: n.id,
    n: n,
    col: col,
    editId: editId,
    editText: editText,
    setEditText: setEditText,
    startEdit: startEdit,
    saveEdit: saveEdit,
    setEditId: setEditId,
    toggle: toggle,
    pin: pin,
    del: del
  })));
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
const NAV = [{
  id: "dashboard",
  icon: "⊞",
  label: "Home"
}, {
  id: "habits",
  icon: "⚡",
  label: "Habits"
}, {
  id: "notes",
  icon: "📝",
  label: "Notes"
}, {
  id: "tasks",
  icon: "☑️",
  label: "Tasks"
}, {
  id: "calendar",
  icon: "📅",
  label: "Calendar"
}, {
  id: "more",
  icon: "···",
  label: "More"
}];
const ALL_NAV = [{
  id: "habits",
  icon: "⚡",
  label: "Routines",
  c: SEC.habits.c
}, {
  id: "business",
  icon: "💼",
  label: "Business",
  c: SEC.business.c
}, {
  id: "health",
  icon: "🏃",
  label: "Health",
  c: SEC.health.c
}, {
  id: "shopping",
  icon: "🛒",
  label: "Shopping",
  c: SEC.shopping.c
}, {
  id: "family",
  icon: "👨‍👩‍👧",
  label: "Family",
  c: SEC.family.c
}, {
  id: "finance",
  icon: "💰",
  label: "Finance",
  c: SEC.finance.c
}, {
  id: "travel",
  icon: "✈️",
  label: "Travel",
  c: SEC.travel.c
}, {
  id: "growth",
  icon: "📚",
  label: "Growth",
  c: SEC.growth.c
}, {
  id: "calendar",
  icon: "📅",
  label: "Calendar",
  c: SEC.calendar.c
}, {
  id: "docs",
  icon: "🗂",
  label: "Docs",
  c: SEC.docs.c
}, {
  id: "matrix",
  icon: "🎯",
  label: "Matrix",
  c: SEC.matrix.c
}, {
  id: "review",
  icon: "📊",
  label: "Review",
  c: SEC.review.c
}, {
  id: "tasks",
  icon: "☑️",
  label: "Tasks",
  c: C.text
}, {
  id: "journal",
  icon: "📓",
  label: "Journal",
  c: SEC.journal.c
}, {
  id: "notes",
  icon: "📝",
  label: "Quick Notes",
  c: SEC.notes.c
}];
function App() {
  const [tab, setTab] = useState("dashboard");
  const [more, setMore] = useState(false);
  const [habits, setHabits] = useState(SEED.habits);
  const [biz, setBiz] = useState(SEED.business);
  const [health, setHealth] = useState(SEED.health);
  const [shopping, setShopping] = useState(SEED.shopping);
  const [family, setFamily] = useState(SEED.family);
  const [finance, setFinance] = useState(SEED.finance);
  const [travel, setTravel] = useState(SEED.travel);
  const [growth, setGrowth] = useState(SEED.growth);
  const [scheduled, setScheduled] = useState(SEED.scheduled);
  const [bills, setBills] = useState(SEED.bills);
  const [docs, setDocs] = useState(SEED.docs);
  const [contributions, setContributions] = useState(SEED.contributions || []);
  const [habitLinks, setHabitLinks] = useState(SEED.habitLinks || {});
  const [timeBlocks, setTimeBlocks] = useState(SEED.timeBlocks || []);
  const [focusGoal, setFocusGoal] = useState(SEED.focusGoal || null);
  const [habitLog, setHabitLog] = useState(SEED.habitLog || {});
  const data = {
    habits,
    biz,
    health,
    shopping,
    family,
    finance,
    travel,
    growth,
    scheduled,
    bills,
    docs,
    focusGoal,
    contributions,
    habitLinks,
    timeBlocks
  };
  const [calSel, setCalSel] = useState(null);
  // Hardware back button support
  React.useEffect(() => {
    if (tab !== "dashboard") window.history.pushState({
      tab
    }, "", "");
  }, [tab]);
  React.useEffect(() => {
    function onPop() {
      setTab("dashboard");
      setMore(false);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  function go(id) {
    setTab(id);
    setMore(false);
  }
  function goCalendar(dateStr) {
    setCalSel(dateStr);
    setTab("calendar");
    setMore(false);
  }
  const cur = ALL_NAV.find(n => n.id === tab);
  function renderPage() {
    switch (tab) {
      case "dashboard":
        return /*#__PURE__*/React.createElement(Dashboard, {
          data: data,
          go: go,
          goCalendar: goCalendar
        });
      case "tasks":
        return /*#__PURE__*/React.createElement(Tasks, {
          tasks: tasks,
          setTasks: setTasks
        });
      case "habits":
        return /*#__PURE__*/React.createElement(Habits, {
          habits: habits,
          set: setHabits,
          habitLog: habitLog,
          setHabitLog: setHabitLog
        });
      case "business":
        return /*#__PURE__*/React.createElement(Business, {
          biz: biz,
          set: setBiz,
          tasks: tasks,
          setTasks: setTasks
        });
      case "health":
        return /*#__PURE__*/React.createElement(Health, {
          health: health,
          set: setHealth,
          tasks: tasks,
          setTasks: setTasks,
          habitLinks: habitLinks,
          habits: habits
        });
      case "shopping":
        return /*#__PURE__*/React.createElement(Shopping, {
          items: shopping,
          set: setShopping
        });
      case "family":
        return /*#__PURE__*/React.createElement(Family, {
          family: family,
          set: setFamily
        });
      case "finance":
        return /*#__PURE__*/React.createElement(Finance, {
          finance: finance,
          set: setFinance,
          contributions: contributions,
          setContributions: setContributions,
          tasks: tasks,
          setTasks: setTasks
        });
      case "travel":
        return /*#__PURE__*/React.createElement(Travel, {
          travel: travel,
          set: setTravel
        });
      case "growth":
        return /*#__PURE__*/React.createElement(Growth, {
          growth: growth,
          set: setGrowth
        });
      case "calendar":
        return /*#__PURE__*/React.createElement(CalendarView, {
          data: data,
          scheduled: scheduled,
          setScheduled: setScheduled,
          habits: habits,
          biz: biz,
          health: health,
          finance: finance,
          initSel: calSel,
          timeBlocks: timeBlocks,
          setTimeBlocks: setTimeBlocks
        });
      case "docs":
        return /*#__PURE__*/React.createElement(DocsAndBills, {
          bills: bills,
          setBills: setBills,
          docs: docs,
          setDocs: setDocs
        });
      case "matrix":
        return /*#__PURE__*/React.createElement(EisenhowerMatrix, {
          biz: biz,
          tasks: tasks,
          setTasks: setTasks,
          health: health,
          go: go
        });
      case "review":
        return /*#__PURE__*/React.createElement(WeeklyReview, {
          data: data
        });
      case "journal":
        return /*#__PURE__*/React.createElement(JournalPage, {
          journal: journal,
          setJournal: setJournal
        });
      case "notes":
        return /*#__PURE__*/React.createElement(QuickNotes, {
          quickNotes: quickNotes,
          setQuickNotes: setQuickNotes
        });
      default:
        return null;
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Inter',system-ui,sans-serif",
      background: C.bg,
      minHeight: "100vh",
      maxWidth: 430,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderBottom: `1px solid ${C.border}`,
      padding: "13px 16px 11px",
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, tab !== "dashboard" && /*#__PURE__*/React.createElement("button", {
    onClick: () => go("dashboard"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.sub,
      fontSize: 22,
      lineHeight: 1,
      padding: "0 6px 0 0",
      fontWeight: 300
    }
  }, "‹"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: C.text,
      letterSpacing: -.3
    }
  }, tab === "dashboard" ? "Forge" : cur?.icon + " " + cur?.label), tab === "dashboard" && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.mute
    }
  }, new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F3F4F6",
      borderRadius: 8,
      padding: "5px 10px",
      fontSize: 11,
      fontWeight: 700,
      color: C.sub
    }
  }, "⚡", habits.filter(h => h.done).length, "/", habits.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "16px 14px 96px"
    }
  }, renderPage()), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      background: "rgba(255,255,255,.96)",
      backdropFilter: "blur(12px)",
      borderTop: `1px solid ${C.border}`,
      display: "flex",
      zIndex: 100
    }
  }, NAV.map(n => {
    const on = tab === n.id || n.id === "more" && more;
    const c2 = ["dashboard", "more"].includes(n.id) ? C.text : SEC[n.id]?.c || C.text;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => {
        if (n.id === "more") {
          setMore(v => !v);
        } else {
          go(n.id);
          setMore(false);
        }
      },
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 4px 12px",
        border: "none",
        cursor: "pointer",
        background: "transparent",
        gap: 3,
        position: "relative"
      }
    }, on && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 20,
        height: 2,
        borderRadius: "0 0 3px 3px",
        background: c2
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: n.id === "more" ? 13 : 19,
        fontWeight: n.id === "more" ? 800 : 400,
        lineHeight: 1,
        color: on ? c2 : C.mute,
        letterSpacing: n.id === "more" ? 2 : 0
      }
    }, n.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: on ? 700 : 400,
        color: on ? c2 : C.mute,
        letterSpacing: .2
      }
    }, n.label));
  })), /*#__PURE__*/React.createElement(Sheet, {
    open: more,
    onClose: () => setMore(false),
    title: "All Sections"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, ALL_NAV.map(n => {
    const on = tab === n.id;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => go(n.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "13px",
        borderRadius: R,
        border: `1.5px solid ${on ? n.c : C.border}`,
        cursor: "pointer",
        background: on ? n.c + "0F" : "#fff",
        fontWeight: 700,
        fontSize: 13,
        color: on ? n.c : C.text,
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20
      }
    }, n.icon), /*#__PURE__*/React.createElement("span", null, n.label));
  }))));
}

function useLS(key,initial){
  const [val,setVal]=React.useState(()=>{
    try{const s=localStorage.getItem('lifeos_'+key);return s?JSON.parse(s):initial;}catch(e){return initial;}
  });
  function set(v){setVal(prev=>{const next=typeof v==='function'?v(prev):v;
    try{localStorage.setItem('lifeos_'+key,JSON.stringify(next));}catch(e){}return next;});}
  return[val,set];
}
function InstallBanner(){
  const [show,setShow]=React.useState(false);
  React.useEffect(()=>{const h=()=>setShow(true);window.addEventListener('beforeinstallprompt',h);
    return()=>window.removeEventListener('beforeinstallprompt',h);},[]);
  if(!show)return null;
  return React.createElement('div',{style:{position:'fixed',bottom:100,left:16,right:16,zIndex:500,
    background:'#111318',borderRadius:16,padding:'14px 16px',display:'flex',alignItems:'center',
    gap:12,boxShadow:'0 8px 32px rgba(0,0,0,0.25)'}},
    React.createElement('span',{style:{fontSize:24}},'📱'),
    React.createElement('div',{style:{flex:1}},
      React.createElement('div',{style:{fontSize:13,fontWeight:700,color:'#fff'}},'Install Forge'),
      React.createElement('div',{style:{fontSize:11,color:'rgba(255,255,255,.6)'}},'Add to home screen')
    ),
    React.createElement('button',{onClick:()=>{window.installApp&&window.installApp();setShow(false);},
      style:{background:'#fff',color:'#111318',border:'none',borderRadius:8,padding:'8px 14px',
        fontWeight:800,fontSize:12,cursor:'pointer',flexShrink:0}},'Install'),
    React.createElement('button',{onClick:()=>setShow(false),
      style:{background:'none',border:'none',color:'rgba(255,255,255,.5)',fontSize:18,cursor:'pointer',padding:'4px'}},'✕')
  );
}
function PersistentApp(){
  const [habits,       setHabits      ]=useLS('habits',       SEED.habits);
  const [biz,          setBiz         ]=useLS('biz',          SEED.business);
  const [health,       setHealth      ]=useLS('health',       SEED.health);
  const [shopping,     setShopping    ]=useLS('shopping',     SEED.shopping);
  const [family,       setFamily      ]=useLS('family',       SEED.family);
  const [finance,      setFinance     ]=useLS('finance',      SEED.finance);
  const [travel,       setTravel      ]=useLS('travel',       SEED.travel);
  const [growth,       setGrowth      ]=useLS('growth',       SEED.growth);
  const [tasks,        setTasks       ]=useLS('tasks',        SEED.tasks||[]);
  const [scheduled,    setScheduled   ]=useLS('scheduled',    SEED.scheduled||[]);
  const [bills,        setBills       ]=useLS('bills',        SEED.bills);
  const [docs,         setDocs        ]=useLS('docs',         SEED.docs);
  const [contributions,setContributions]=useLS('contributions',SEED.contributions||[]);
  const [habitLinks,   setHabitLinks  ]=useLS('habitLinks',   SEED.habitLinks||{});
  const [timeBlocks,   setTimeBlocks  ]=useLS('timeBlocks',   SEED.timeBlocks||[]);
  const [focusGoal,    setFocusGoal   ]=useLS('focusGoal',    SEED.focusGoal||null);
  const [habitLog,     setHabitLog    ]=useLS('habitLog',     SEED.habitLog||{});
  const [journal,      setJournal     ]=useLS('journal',      SEED.journal||[]);
  const [quickNotes,   setQuickNotes  ]=useLS('quickNotes',   SEED.quickNotes||[]);
  const [tab,          setTab         ]=useLS('tab',          'dashboard');
  const [more,         setMore        ]=React.useState(false);
  const [calSel,       setCalSel      ]=React.useState(null);

  React.useEffect(()=>{
    if(tab!=='dashboard') window.history.pushState({tab},'','');
  },[tab]);
  React.useEffect(()=>{
    function onPop(){setTab('dashboard');setMore(false);}
    window.addEventListener('popstate',onPop);
    return()=>window.removeEventListener('popstate',onPop);
  },[]);

  const data={habits,biz,health,shopping,family,finance,travel,growth,scheduled,tasks,bills,docs,
    focusGoal,contributions,habitLinks,timeBlocks};
  function go(id){setTab(id);setMore(false);}
  function goCalendar(dateStr){setCalSel(dateStr);setTab('calendar');setMore(false);}
  const cur=ALL_NAV.find(n=>n.id===tab);

  function renderPage(){
    switch(tab){
      case'dashboard': return React.createElement(Dashboard,{data,go,goCalendar});
      case'tasks':     return React.createElement(Tasks,{tasks,setTasks});
      case'habits':    return React.createElement(Habits,{habits,set:setHabits,habitLog,setHabitLog});
      case'business':  return React.createElement(Business,{biz,set:setBiz,tasks,setTasks});
      case'health':    return React.createElement(Health,{health,set:setHealth,tasks,setTasks,habitLinks,habits});
      case'shopping':  return React.createElement(Shopping,{items:shopping,set:setShopping});
      case'family':    return React.createElement(Family,{family,set:setFamily});
      case'finance':   return React.createElement(Finance,{finance,set:setFinance,contributions,setContributions,tasks,setTasks});
      case'travel':    return React.createElement(Travel,{travel,set:setTravel});
      case'growth':    return React.createElement(Growth,{growth,set:setGrowth});
      case'calendar':  return React.createElement(CalendarView,{data,scheduled,setScheduled,habits,biz,health,finance,initSel:calSel,timeBlocks,setTimeBlocks});
      case'docs':      return React.createElement(DocsAndBills,{bills,setBills,docs,setDocs});
      case'matrix':    return React.createElement(EisenhowerMatrix,{biz,tasks,setTasks,health,go});
      case'review':    return React.createElement(WeeklyReview,{data});
      case'journal':   return React.createElement(JournalPage,{journal,setJournal});
      case'notes':     return React.createElement(QuickNotes,{quickNotes,setQuickNotes});
      default:         return null;
    }
  }

  return React.createElement('div',{style:{fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,
    minHeight:'100vh',maxWidth:430,margin:'0 auto',display:'flex',flexDirection:'column',position:'relative'}},
    React.createElement('div',{style:{background:'#fff',borderBottom:`1px solid ${C.border}`,
      padding:'13px 16px 11px',position:'sticky',top:0,zIndex:50,
      display:'flex',alignItems:'center',justifyContent:'space-between'}},
      React.createElement('div',{style:{display:'flex',alignItems:'center',gap:8}},
        tab!=='dashboard'&&React.createElement('button',{onClick:()=>go('dashboard'),
          style:{background:'none',border:'none',cursor:'pointer',color:C.sub,fontSize:22,
            lineHeight:1,padding:'0 6px 0 0',fontWeight:300}},'‹'),
        React.createElement('div',null,
          React.createElement('div',{style:{fontSize:16,fontWeight:800,color:C.text,letterSpacing:-.3}},
            tab==='dashboard'?'Forge':((cur?.icon||'')+' '+(cur?.label||''))),
          tab==='dashboard'&&React.createElement('div',{style:{fontSize:10,color:C.mute}},
            new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'short'}))
        )
      ),
      React.createElement('div',{style:{display:'flex',gap:6,alignItems:'center'}},
        React.createElement('div',{style:{background:'#F3F4F6',borderRadius:8,padding:'5px 10px',
          fontSize:11,fontWeight:700,color:C.sub}},
          '⚡'+habits.filter(h=>h.done).length+'/'+habits.length),
        React.createElement('button',{onClick:()=>go('notes'),
          style:{background:'#E0F2FE',border:'none',borderRadius:8,
            padding:'5px 8px',fontSize:16,cursor:'pointer'}},'📝')
      )
    ),
    React.createElement('div',{style:{flex:1,overflowY:'auto',padding:'16px 14px 96px'}},renderPage()),
    React.createElement('div',{style:{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',
      width:'100%',maxWidth:430,background:'rgba(255,255,255,.96)',backdropFilter:'blur(12px)',
      borderTop:`1px solid ${C.border}`,display:'flex',zIndex:100}},
      NAV.map(n=>{
        const on=tab===n.id||(n.id==='more'&&more);
        const c2=['dashboard','more'].includes(n.id)?C.text:SEC[n.id]?.c||C.text;
        return React.createElement('button',{key:n.id,
          onClick:()=>{if(n.id==='more'){setMore(v=>!v);}else{go(n.id);setMore(false);}},
          style:{flex:1,display:'flex',flexDirection:'column',alignItems:'center',
            padding:'10px 4px 12px',border:'none',cursor:'pointer',background:'transparent',
            gap:3,position:'relative'}},
          on&&React.createElement('div',{style:{position:'absolute',top:0,left:'50%',
            transform:'translateX(-50%)',width:20,height:2,borderRadius:'0 0 3px 3px',background:c2}}),
          React.createElement('span',{style:{fontSize:n.id==='more'?13:19,fontWeight:n.id==='more'?800:400,
            lineHeight:1,color:on?c2:C.mute,letterSpacing:n.id==='more'?2:0}},n.icon),
          React.createElement('span',{style:{fontSize:9,fontWeight:on?700:400,color:on?c2:C.mute,letterSpacing:.2}},n.label)
        );
      })
    ),
    React.createElement(Sheet,{open:more,onClose:()=>setMore(false),title:'All Sections'},
      React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}},
        ALL_NAV.map(n=>{const on=tab===n.id;
          return React.createElement('button',{key:n.id,onClick:()=>go(n.id),
            style:{display:'flex',alignItems:'center',gap:10,padding:'13px',borderRadius:R,
              border:`1.5px solid ${on?n.c:C.border}`,cursor:'pointer',background:on?n.c+'0F':'#fff',
              fontWeight:700,fontSize:13,color:on?n.c:C.text,textAlign:'left'}},
            React.createElement('span',{style:{fontSize:20}},n.icon),
            React.createElement('span',null,n.label)
          );})
      )
    )
  );
}
function Root(){
  return React.createElement(React.Fragment,null,
    React.createElement(PersistentApp,null),
    React.createElement(InstallBanner,null)
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Root,null));
