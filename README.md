## Tech Stack

- Next.js (Server Components and Server Actions)
- Supabase (Auth & Storage)
- ShadcnUI & Tailwind CSS (Styling)
- Zod (Type-Safety and Data Validation)
- Jest & Playwright (Testing)

## Getting Started

1. Clone the project
```bash
git clone https://github.com/Waffenffs/Dormie.git
```

2. Install the project dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Proposed Conventions
- File names should be kebab-cased
- Component names should be CapitalCased

### BUGS
1. Login form isn't properly utilizing pending state (?)

### LATE-STAGE TODOS
1. Create a supabase schema.sql file so that others can emulate the project's database
2. Export database types to TypeScript for easier and smoother development