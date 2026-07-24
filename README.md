# 📘 AI University Planner

Plan Smarter. Study Better. Achieve More.

## Phase 2 update: real authentication

Register and Login now actually work:
- Register creates a real user in your Supabase database (password is hashed with bcrypt, never stored in plain text)
- Login checks your email/password against the database and creates a real session
- `/dashboard` is now a protected route — visiting it while logged out redirects you to `/login`
- A working Logout button is on the dashboard

### If you're updating from Phase 1
Since React was upgraded (18 → 19) to support the new form-handling feature used here, run this after replacing your files:
```
npm install
```
This will update your installed packages to match the new `package.json`. Then restart your dev server:
```
npm run dev
```

Try it: register a new account at `/register`, you should get redirected to `/login`, then log in with those same credentials — you should land on `/dashboard` and see your name.

## What's in Phase 1 (foundation)

- Next.js 15 + TypeScript + Tailwind CSS project scaffold
- Full folder structure matching the SRD
- Prisma schema with all 6 database tables (Users, Courses, Assignments, Exams, StudyPlans, Notifications)
- Landing page, Login page, Register page
- Dark/light mode support
- Placeholder pages for every route (Dashboard, Courses, Assignments, Exams, Planner, Analytics, Profile, Settings)

## Step-by-step setup (do this in order)

### 1. Install Node.js
Download and install Node.js LTS from https://nodejs.org (version 18 or higher). Check it worked:
```
node -v
npm -v
```

### 2. Unzip this project and open a terminal in it
```
cd ai-university-planner
```

### 3. Install dependencies
```
npm install
```

### 4. Create a Supabase project (this is your database)
1. Go to https://supabase.com and sign up (free).
2. Click **New Project**. Give it a name and a strong database password (save this password somewhere).
3. Wait ~2 minutes for it to provision.
4. Go to **Project Settings → Database**.
5. Copy the **Connection Pooling** URI (port 6543) — this goes in `DATABASE_URL`.
6. Copy the **Direct Connection** URI (port 5432) — this goes in `DIRECT_URL`.

### 5. Set up your environment variables
1. Copy `.env.example` to a new file called `.env`
2. Paste in your two Supabase URLs (replace `[YOUR-PASSWORD]` with your actual DB password)
3. Generate a NextAuth secret by running:
   ```
   openssl rand -base64 32
   ```
   (On Windows without openssl, use https://generate-secret.vercel.app/32)
   Paste the result into `NEXTAUTH_SECRET`.

### 6. Push the database schema to Supabase
```
npx prisma db push
```
This creates all 6 tables in your Supabase database. You can verify by checking **Table Editor** in the Supabase dashboard.

### 7. Run the app locally
```
npm run dev
```
Open http://localhost:3000 — you should see the landing page.

### 8. Create a GitHub repository
1. Go to https://github.com/new
2. Name it `ai-university-planner`, keep it **Public**, don't initialize with a README (we already have one).
3. In your terminal:
   ```
   git init
   git add .
   git commit -m "Phase 1: project foundation"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ai-university-planner.git
   git push -u origin main
   ```

## Tech Stack
Next.js 15 · React · TypeScript · Tailwind CSS · Prisma · PostgreSQL (Supabase) · Auth.js · Recharts · Framer Motion

## Project Structure
```
app/            → pages (App Router)
components/     → reusable UI components
lib/            → prisma client, auth config, validation, utils
actions/        → server actions (CRUD logic)
hooks/          → custom React hooks
prisma/         → database schema
types/          → shared TypeScript types
```

## Next phases
- ✅ Phase 2: Auth (real register/login) + database wiring — done
- Phase 3: Courses, Assignments, Exams CRUD
- Phase 4: AI Study Planner
- Phase 5: Dashboard, Analytics, Notifications
- Phase 6: Polish (animations, loading/empty states)
- Phase 7: Deployment to Vercel
