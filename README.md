# SkillForge

### AI-Powered Labour Market Intelligence & Skill Alignment Platform

SkillForge is a data-driven platform designed to help governments and training institutions align skill-development programs with **real industry requirements and emerging job-market demand**.

It analyzes job-market signals, employer inputs, sector trends, course curricula and placement outcomes to identify **skill gaps**, recommend **curriculum updates**, and generate **district-level training plans**.

> **Smart India Hackathon 2026 — Problem Statement 26134**

---

## 🎯 Problem

Skill-development programs can become disconnected from rapidly changing industry requirements.

Common challenges include:

* Training programs not matching current industry demand
* Emerging skills taking time to appear in curricula
* Lack of district-level visibility into skill demand
* Difficulty identifying obsolete or oversupplied courses
* Limited employer validation of training programs
* Training capacity not matching local demand
* Students lacking clear, industry-relevant career pathways

---

## 💡 Our Solution

SkillForge creates an intelligence pipeline:

```text
Industry Data
     ↓
Demand Intelligence
     ↓
Skill Extraction & Normalization
     ↓
Skill Knowledge Graph
     ↓
Skill Gap Detection
     ↓
Curriculum Alignment
     ↓
Training Optimization
     ↓
Explainable Recommendations
```

The platform connects:

**Jobs ↔ Skills ↔ Courses ↔ Qualifications ↔ Districts ↔ Employers**

This allows decision-makers to understand not only **what skills are in demand**, but also whether existing training programs actually teach those skills.

---

## 🚀 Key Features

### 1. Industry Demand Radar

Analyze labour-market demand by:

* District
* Sector
* Job role
* Skill
* Proficiency level
* Time period

Provides demand trends and identifies rapidly growing skills.

### 2. Skill Intelligence Engine

Uses NLP to extract and normalize skills from job-market data.

```text
React
ReactJS
React.js
React JS
        ↓
     REACT
```

### 3. Skill Knowledge Graph

Connects:

```text
Job Role
    ↕
Skills
    ↕
Courses
    ↕
Qualifications
    ↕
Districts
    ↕
Employers
```

### 4. Skill Gap Simulator

Compares **industry demand** against **curriculum coverage**.

| Skill          | Industry Demand | Curriculum Coverage |      Gap |
| -------------- | --------------: | ------------------: | -------: |
| Linux          |             86% |                 35% |     High |
| Networking     |             91% |                 45% |     High |
| SIEM           |             78% |                 10% | Critical |
| Cloud Security |             72% |                 20% |     High |
| Git            |             64% |                 60% |      Low |

### 5. Curriculum Alignment Engine

Recommends:

* New modules to add
* Existing modules to update
* Skills requiring greater coverage
* Potentially obsolete or oversupplied content
* Industry-relevant curriculum changes

### 6. Employer Validation

Employers can provide feedback on:

* Required skills
* Skill proficiency
* Missing competencies
* Curriculum relevance
* Emerging technologies

### 7. District Training Planner

Generates training plans based on:

* Industry demand
* Available seats
* Trainer capacity
* Equipment availability
* Course capacity
* District requirements
* Resource constraints

The optimization engine uses **Google OR-Tools** to generate constraint-aware plans.

### 8. What-If Simulator

Test scenarios such as:

```text
+10 Trainers
+200 Training Seats
+2 New Courses
+₹10L Equipment Budget
```

The system recalculates expected demand coverage and training requirements.

### 9. Candidate Skill Pathways

```text
Current Skills
      ↓
Industry Requirements
      ↓
Skill Gaps
      ↓
Recommended Courses
      ↓
Career Pathway
```

### 10. Explainability & Audit

Recommendations are supported by:

* Evidence sources
* Confidence scores
* Data timestamps
* Decision traces
* Recommendation IDs
* Audit logs

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────────┐
│                DATA SOURCES                 │
│ Job Posts │ Employer Surveys │ Industry     │
│ Placement │ Course Data      │ Sector Trends│
└──────────────────────┬──────────────────────┘
                       ↓
┌─────────────────────────────────────────────┐
│       DATA INGESTION & QUALITY LAYER        │
│ ETL → Validation → Deduplication →          │
│ Normalization → Anomaly Detection           │
└──────────────────────┬──────────────────────┘
                       ↓
┌─────────────────────────────────────────────┐
│             AI / NLP ENGINE                 │
│ Skill Extraction → Skill Normalization →    │
│ Role Classification → Proficiency Detection │
└──────────────────────┬──────────────────────┘
                       ↓
┌─────────────────────────────────────────────┐
│          SKILL KNOWLEDGE GRAPH              │
│ Job ↔ Skill ↔ Course ↔ Qualification ↔     │
│ District ↔ Employer                         │
└──────────────────────┬──────────────────────┘
                       ↓
          ┌────────────┴────────────┐
          ↓                         ↓
┌───────────────────┐     ┌───────────────────┐
│ DEMAND INTELLIGENCE│     │ SKILL GAP ENGINE  │
│ Demand Index      │     │ Industry Demand   │
│ Growth Trends     │     │ Curriculum        │
│ District Demand   │     │ Coverage          │
└─────────┬─────────┘     └─────────┬─────────┘
          └────────────┬────────────┘
                       ↓
┌─────────────────────────────────────────────┐
│        CURRICULUM ALIGNMENT ENGINE          │
│ Missing Skills → Module Recommendations     │
│ → Course Updates                            │
└──────────────────────┬──────────────────────┘
                       ↓
┌─────────────────────────────────────────────┐
│       TRAINING OPTIMIZATION ENGINE          │
│               Google OR-Tools                │
│ Demand + Seats + Trainers + Equipment       │
│ + Budget + Location Constraints             │
└──────────────────────┬──────────────────────┘
                       ↓
┌─────────────────────────────────────────────┐
│          EXPLAINABILITY & AUDIT             │
│ Evidence → Confidence → Decision Trace      │
│ → Audit Logs                                │
└──────────────────────┬──────────────────────┘
                       ↓
┌─────────────────────────────────────────────┐
│                APPLICATIONS                 │
│ Government │ Institutes │ Employers │       │
│ Candidates  │ Administrators                │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer           | Technology         |
| --------------- | ------------------ |
| Frontend        | React + TypeScript |
| Styling         | Tailwind CSS       |
| Backend         | Python + FastAPI   |
| Database        | PostgreSQL         |
| NLP / ML        | Scikit-learn       |
| Data Processing | Pandas             |
| Knowledge Graph | NetworkX           |
| Optimization    | Google OR-Tools    |
| API             | REST               |
| Deployment      | Docker             |

---

## 🧠 Intelligence Pipeline

```text
Raw Job Description
        ↓
Text Processing
        ↓
Skill Extraction
        ↓
Skill Normalization
        ↓
Role Classification
        ↓
Proficiency Detection
        ↓
Demand Aggregation
        ↓
Skill Gap Analysis
        ↓
Curriculum Alignment
        ↓
Training Recommendation
```

---

## 📊 Example Use Case

### Pune → IT Sector → Cybersecurity Analyst

The platform detects demand for:

```text
Linux
Networking
SIEM
Cloud Security
Incident Response
```

It compares these requirements against an existing cybersecurity course and identifies areas where curriculum coverage is insufficient.

The training planner can then determine:

* Additional training seats required
* Trainer requirements
* Required laboratory/equipment resources
* Suitable districts
* Course capacity adjustments

---

## 👥 Platform Users

### Government / Policymakers

* District-level skill intelligence
* Evidence-based training planning
* Resource allocation
* Curriculum monitoring

### Training Institutes

* Industry-aligned curriculum
* Trainer requirements
* Equipment planning
* Course improvement

### Employers

* Skill requirement validation
* Industry feedback
* Emerging skill identification

### Candidates

* Skill-gap analysis
* Relevant course recommendations
* Industry-aligned career pathways

---

## 🔐 Data & Governance

SkillForge is designed around transparent and auditable recommendations.

* Role-based access control
* Secure data storage
* Minimal personal data collection
* Data validation
* Duplicate detection
* Anomaly detection
* Explainable scoring
* Recommendation audit trails

---

## 📁 Project Structure

```text
skillforge/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── data/
│   └── ...
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── metadata.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js
* npm

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file based on `.env.example`.

```env
GEMINI_API_KEY=your_api_key
APP_URL=http://localhost:5173
```

> Never commit real API keys or secrets to GitHub.

### Start the Development Server

```bash
npm run dev
```

---

## 🎥 Demonstration Flow

```text
Select District
      ↓
Select Sector
      ↓
Select Job Role
      ↓
View Industry Demand
      ↓
Analyze Skill Gaps
      ↓
Compare Curriculum
      ↓
Generate Training Plan
      ↓
Run What-If Simulation
      ↓
View Explainable Recommendation
```

---

## 🏆 Smart India Hackathon 2026

**Problem Statement:** 26134

**Title:** Challenges in aligning skill development programs with industry requirements and emerging job market demands

**Category:** Software

**Theme:** Miscellaneous

**Team:** Web-K

**Project:** SkillForge

---

## 📚 References

* Smart India Hackathon 2026 — Problem Statement 26134
* Ministry of Skill Development & Entrepreneurship — Skill India
* National Skill Development Corporation
* Google OR-Tools
* Scikit-learn
* FastAPI
* PostgreSQL
* NetworkX

---

## 📌 Vision

> **From static training programs to continuously evolving, industry-aligned skill development.**

SkillForge aims to bridge the gap between **what industries need, what training programs teach, and what learners need to become job-ready.**
