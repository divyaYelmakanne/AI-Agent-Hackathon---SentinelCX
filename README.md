# SentinelCX – Interactive Sentiment Intelligence Dashboard for Customer Support (Lightweight Build)

## Problem Statement
Customer support teams often fail to detect early signs of rising frustration or satisfaction across chats, emails, and tickets due to scattered data and lack of real-time emotional insight. This leads to delayed interventions, poor customer experience, and lower retention.

## Proposed Solution
SentinelCX is an AI-powered watchdog that continuously monitors support interactions across multiple channels in real time, detects emotional tones (anger, joy, confusion, disappointment), and displays each insight as a live, responsive module in a centralized dashboard. The system is built without MongoDB, using simplified file-based storage (JSON/CSV) or SQLite — ideal for small-scale use or demos.

Each feature in the dashboard is independent, interactive, and performs its own activity in real time, giving teams full visibility and control over customer sentiment.

---

## Key Features (All Interactive & Live on Dashboard)

- 🎯 **Real-Time Sentiment Analysis Module**
  - Tags incoming support messages with emotion labels.
  - Auto-refreshes in the dashboard with new sentiment breakdowns.
- 🌐 **Multi-Channel Aggregation Module**
  - Displays data separately for each platform (Email, Live Chat, Tickets).
  - Filters allow team to drill down into specific channels.
- 📈 **Trend Detection & Alert System**
  - Live graph showing emotion spikes over time.
  - Auto-alerts on screen if negative emotion crosses a threshold.
- 🧑‍💼 **Agent Performance Insight Panel**
  - Shows agent-wise sentiment impact scores.
  - Clicking on an agent shows emotional history of their interactions.
- 🗺️ **Customer Frustration Heatmap**
  - Interactive product/module heatmap.
  - Clickable areas show complaints linked to product features.
- 🚨 **Auto-Triage Recommendation Widget**
  - Lists recent high-priority conversations.
  - Color-coded for emotion + urgency. Click to view full ticket/chat.
- 📊 **Sentiment Analytics Reports**
  - Dashboard tab to generate instant sentiment summaries.
  - Trend comparison by date, channel, or product module.
- 🗣️ **Language & Tone Intelligence**
  - Real-time alerts for sarcasm/passive-aggression.
  - Suggests alternate response tone (empathy, clarity, urgency).
- 🤖 **Chatbot Tone Monitor (Optional)**
  - Monitors chatbot responses for tone drift.
  - Live guidance display for improving bot empathy in real time.

---

## ✅ 🔥 Advanced Dashboard Features for SentinelCX

### 1. 🧠 AI Insights & Smart Suggestions
| Feature | Description |
|---------|-------------|
| 🔍 Emotion Insights Panel | Shows most common emotions this week/month with % trends |
| 💡 Smart Response Suggestions | Suggest empathetic or calming reply drafts for angry/confused tickets |
| 📌 Root Cause Analyzer | Auto-summarizes recurring complaint topics using NLP (like "delay", "bug", "UI confusion") |
| 📊 Sentiment-to-CSAT Correlation | Compares sentiment trends to customer satisfaction scores if available |

### 2. 📈 Data Visualization & Filtering
| Feature | Description |
|---------|-------------|
| 📅 Time-Range Selector | View sentiment data by hour/day/week/month |
| 📊 Interactive Charts | Filterable pie/line/bar graphs by channel, emotion, product, agent |
| 🧵 Conversation Drill-Down | Click any spike on the graph → view the actual messages that caused it |
| 📤 Export to CSV/PDF | Download reports for presentation or internal review |

### 3. 🔔 Live Alerts & Notifications
| Feature | Description |
|---------|-------------|
| 🚨 Live Spike Alert Banner | Show real-time alert at top of dashboard if negative emotions spike |
| 📬 Slack/Email Alerts Integration | Send alert messages to Slack/Email when sentiment drops rapidly |
| 🎛️ Threshold Config Panel | Allow CX manager to set when to trigger alerts (e.g., 30% anger = alert) |

### 4. 🧑‍💼 Team/Agent Control Features
| Feature | Description |
|---------|-------------|
| 📋 Agent Leaderboard | Ranks agents by best sentiment scores / resolved with positive emotion |
| 💬 Agent Feedback Suggestions | Auto-generate tips to improve tone based on past messages |
| 🗂️ Agent Profile Modal | Shows agent’s sentiment history, average score, top emotion handled |

### 5. 🧭 User Experience Enhancements
| Feature | Description |
|---------|-------------|
| 🌐 Multi-language Support | Translate UI + incoming messages before analysis |
| 📱 Mobile Responsive UI | Fully mobile-friendly version of dashboard for on-the-go managers |
| 📥 Drag & Drop File Upload | Easier way to upload support logs for analysis |

---

## 🛠️ Tech Stack
- **Backend:** Python Flask or Node.js Express (no MongoDB; uses JSON/CSV or SQLite for storage)
- **NLP:** VADER, TextBlob, or HuggingFace models for sentiment analysis
- **Frontend:** React.js (with Tailwind CSS for styling)
- **Charts:** Chart.js or Recharts
- **Data Storage:** JSON/CSV files or SQLite

---

## 🗂️ Project Folder Structure (Example)
```
SentinelCX/
│
├── backend/
│   ├── app.py / index.js
│   ├── routes/
│   ├── services/
│   ├── storage/
│   ├── utils/
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   ├── tailwind.config.js
│   └── package.json
│
├── data-samples/
│   └── sample_tickets.json
│
├── README.md
└── .gitignore
```

---

## 🔐 User Authentication
- User login and registration with email and password.
- Secure authentication for dashboard access.

---

## ℹ️ About Section (in Main Dashboard)
SentinelCX is designed to empower customer support teams with actionable, real-time sentiment intelligence. Built for CX managers and support leads, it provides a unified view of customer emotions, agent performance, and product feedback, all in a modern, modular dashboard.

---

## 📞 Contact Us
**Name:** Divya Yelmakanne  
**Email:** divyayelmakanne@gmail.com

---

## 🚀 Getting Started
1. Clone the repository.
2. Install backend and frontend dependencies.
3. Start backend and frontend servers.
4. Access the dashboard at `http://localhost:3000` (or specified port).

---

## 📌 Notes
- uses file-based storage (JSON/CSV) or SQLite.
- Clean API separation between frontend and backend.
- Use sample ticket data in `data-samples/` for testing.
- Bonus: Upload Data feature to simulate uploading support logs (JSON format).

---

Here the site is live at : https://ai-agent-hackathon-sentinel-cx.vercel.app/
