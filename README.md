# Photo Upload and Comment App

A complete full-stack application built with Next.js, Express, Prisma, and Supabase.

## Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Ant Design
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Storage:** Supabase Storage (bucket: "photos")

## Project Structure
```
photo-app
├── backend
│   ├── config/prisma.js
│   ├── controllers/
│   ├── middleware/upload.middleware.js
│   ├── prisma/schema.prisma
│   ├── routes/
│   ├── services/supabase.service.js
│   ├── .env.example
│   └── server.js
└── frontend
    ├── app/
    ├── next.config.js
    └── tsconfig.json
```

## Setup Instructions

### 1. Backend Setup
1. Open a terminal in `photo-app/backend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your Supabase credentials:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.uszndcyjpzizqihazrqi.supabase.co:5432/postgres"
   SUPABASE_URL="https://uszndcyjpzizqihazrqi.supabase.co"
   SUPABASE_ANON_KEY="YOUR_ANON_KEY"
   ```
4. Generate Prisma client and push schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a terminal in `photo-app/frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Features
- **Exploration Feed:** Browse all uploaded photos with comment counts.
- **Photo Upload:** Drag-and-drop upload to Supabase Storage.
- **Photo Details:** View high-quality images and read/write comments.
- **Dynamic Routing:** Individual pages for every photo.

## Database Schema
- **Photo:** id, imageUrl, createdAt, comments[]
- **Comment:** id, content, photoId, createdAt
