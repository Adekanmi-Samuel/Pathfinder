# Pathfinder

A career/life-direction coaching app that turns honest self-assessments into personalized 90-day roadmaps using AI.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (auth + PostgreSQL)
- **AI**: Claude API (Anthropic)
- **Payments**: Paystack
- **Deployment**: Netlify (frontend), Supabase (backend)

## Design System

- **Palette**: Warm parchment (#F6F3EC) base, deep ink (#1A1D29) text, amber (#C08A3E) accent
- **Typography**: Fraunces (serif headings), Work Sans (body), JetBrains Mono (labels)
- **Signature element**: Animated winding trail SVG with waypoint markers

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Supabase account
- Anthropic API key
- Paystack account (for payments)

### Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

### Environment Variables

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=sk-ant-...
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

1. Create a new Supabase project
2. Go to SQL Editor
3. Paste and run the contents of `supabase/migrations/001_initial_schema.sql`

### Run

```bash
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── assessment/page.tsx      # Assessment flow
│   │   ├── dashboard/page.tsx       # Dashboard
│   │   ├── (auth)/login/page.tsx    # Login
│   │   ├── (auth)/signup/page.tsx   # Signup
│   │   └── api/                     # Server-side API routes
│   ├── components/                  # React components
│   ├── lib/                         # Supabase, Paystack, utils
│   └── types/                       # TypeScript interfaces
├── supabase/migrations/             # SQL migrations
└── netlify.toml                     # Deployment config
```

## Deployment

### Netlify (Frontend)

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add env vars in Netlify dashboard
6. Deploy

### Supabase (Backend)

1. Create project at supabase.com
2. Run migration SQL in SQL Editor
3. Configure auth providers (optional)
4. RLS policies included in migration

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/assessment` | POST | Generate career paths via Claude |
| `/api/check-in` | POST | Save daily focus |
| `/api/checkout` | POST | Initialize Paystack payment |
| `/api/milestone/[id]` | PATCH | Toggle milestone completion |
| `/api/webhook/paystack` | POST | Handle payment events |

## License

MIT
