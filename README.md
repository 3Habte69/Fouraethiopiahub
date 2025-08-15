# Foura Ethiopia — Instant Deploy

## Quick deploy
1. Push this folder to GitHub.
2. Import to Vercel.
3. In Vercel → Project → Settings → Environment Variables add:
   - `MONGODB_URI` = your Atlas URI (optional for now)
   - `TEMP_MONGODB_URI` = a temporary test URI (pre-filled in .env.example)
   - `JWT_SECRET` = any strong string
   - `ADMIN_EMAILS` = habtamuayele369t@gmail.com
   - `SEED_KEY` = SEED123
4. Deploy.
5. Go to `/admin` → click **Seed Database** (or open `/api/dev/seed?key=SEED123`).

## Notes
- If `MONGODB_URI` is missing, the app uses `TEMP_MONGODB_URI`.
- Login at `/login` with the admin email to receive a JWT; UI will show admin-only buttons.
