# Maneuver Voice AI

Voice AI consultant built with LiveKit:
- `agent/`: Python LiveKit voice agent with discovery intelligence and lead capture
- `frontend/`: Next.js voice UI with transcript, agent status, and discovery summary panels

## Features

- Real-time voice conversation pipeline (STT -> LLM -> TTS)
- Knowledge-base grounded responses from `agent/src/kb.md`
- Structured discovery capture:
  - `name`, `company`, `industry`, `current_problem`, `team_size`, `timeline`, `budget`, `goals`
- Lead persistence to JSON files in `agent/src/leads/`
- LLM resilience with graceful fallback behavior
- Responsive modern frontend UI

## Quick Start

## 1) Backend

```powershell
cd agent
uv sync
copy .env.example .env.local
uv run python src/agent.py download-files
uv run python src/agent.py dev
```

Required `agent/.env.local` values:
- `LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `GOOGLE_API_KEY`

## 2) Frontend

```powershell
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Security Before Pushing

- Never commit `.env.local` files.
- Rotate any key that was ever committed to git history.
- Keep lead data private; generated lead JSON files are ignored by `.gitignore`.

## GitHub Push Notes

This workspace currently contains two nested project folders (`agent/` and `frontend/`) that each include their own git metadata.  
If you want a single GitHub monorepo, initialize/push from this root folder and remove nested `.git` folders first.
