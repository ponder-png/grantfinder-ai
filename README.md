# GrantFinder AI

GrantFinder AI is a full-stack application designed to help nonprofits, small businesses, and organizations **discover grants and RFPs**, track approvals in Google Sheets, and automatically generate tailored grant drafts using OpenAI. The drafts and approved opportunities can then be emailed to a specified recipient.

This repo contains both the **frontend** (`index.html`) and a **Node.js backend** for handling Google Sheets, Gmail, and OpenAI interactions.

---

## Features

- Search and filter grants and RFPs (mock data or integrated API)
- Approve opportunities and save to Google Sheet
- Email Google Sheet link to `ponder@kencall.org` (or configured email)
- Generate **up to 5 grant/RFP drafts daily** using OpenAI
- Email generated drafts inline to recipient
- Download individual draft files locally

---

## Repo Structure


---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/<your-username>/grantfinder-ai.git
cd grantfinder-ai
cd backend
npm install
cd backend
node server.js
0 9 * * * node /path/to/grantfinder-ai/scripts/dailyGenerate.js

---

