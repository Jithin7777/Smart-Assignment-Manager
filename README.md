# Smart Assignment Manager

Smart Assignment Manager is a **TypeScript based, role-based assignment management system** built with **Next.js (App Router)**, **NextAuth**, and **Prisma with PostgreSQL**.

The application implements **full CRUD operations** for assignments and submissions, allowing:

- **Teachers** to create, read, update, and delete assignments
- **Students** to view assignments, submit work, and track their submissions

The application allows:

- **Teachers** to create, manage, and grade assignments
- **Students** to view assignments and submit their work

## Features

### Authentication & Authorization

- Credentials-based authentication using NextAuth
- JWT-based session handling
- Secure password hashing
- Role-based access control (**TEACHER / STUDENT**)

### Teacher Module

- Create new assignments
- Edit existing assignments
- View student submissions
- Grade submissions
- Teacher dashboard with statistics

### Student Module

- View available assignments
- Submit assignments
- View submission status and grades

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Authentication:** NextAuth
- **Database:** PostgreSQL (Neon) with Prisma ORM
- **Styling & UI Components:** Tailwind CSS, shadcn/ui
- **Package Manager:** pnpm

## Project Structure (Overview)

```txt
app/
├─ (auth)/login              # Authentication pages
├─ (dashboards)/
│  ├─ student/               # Student dashboard
│  └─ teacher/               # Teacher dashboard
├─ api/                      # Backend route handlers
├─ components/               # Shared UI components
├─ features/                 # Feature-based services & logic
├─ lib/                      # Prisma client & utilities
├─ prisma/                   # Prisma schema, migrations, seed
├─ types/                    # Global & NextAuth types

```

## Steps to Run the Project Locally

1. Clone the repository

```bash
git clone git@github.com:Jithin7777/Smart-Assignment-Manager.git
cd smart-assignment-manager
```

2. Install dependencies

```bash
pnpm install
```

3. Setup environment variables
   Create a .env file in the project root.

```env
# Database
DATABASE_URL="your-neon-postgresql-connection-string"

AUTH_URL=http://localhost:3000

# Generate with: pnpm dlx auth secret
AUTH_SECRET="replace-with-your-generated-secret"
```

4. Setup the database (Prisma)

```bash
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed
```

5. Start the development server

```bash
pnpm dev
```

### Demo Login Credentials (if seeded)

```txt

Teacher:
Email: teacher@example.com
Password: teacher123

Student:
Email: student@example.com
Password: student123

```

## Architecture & Design Decisions

- Feature-based folder structure for scalability
- Server Components with minimal client-side logic
- Prisma ORM for type-safe database access
- Role-based access control handled at the application level
- Shadcn/ui used for consistent UI components


##  Deployment & CI/CD

- Live Demo: [Smart Assignment Manager](https://smart-assignment-manager.vercel.app)
- Automatic deployment is enabled on Vercel for the `main` branch.
- Environment variables are securely configured in Vercel.