# TagIt.ai 🧠

**The Intelligent, AI-Powered Bookmark Manager for the Modern Web.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748)](https://www.prisma.io/)

TagIt.ai is a next-generation bookmark manager that leverages the power of Google's Gemini AI to automatically organize, summarize, and tag your saved content. Stop drowning in tabs and unorganized links—let AI do the heavy lifting.

## 🚀 Features

### 🤖 AI-Powered Intelligence
- **Auto-Tagging**: Automatically analyzes content and suggests relevant tags with confidence scores.
- **Smart Summaries**: Generates concise summaries of long articles so you can recall context instantly.
- **Semantic Search**: Search by meaning ("articles about healthy eating") rather than just keywords.
- **Vector Embeddings**: Uses Google's text embedding models for deep content understanding.

### 📚 Advanced Organization
- **Nested Collections**: Create deep hierarchies of folders and sub-collections to structure your knowledge base.
- **Reader Mode**: Distraction-free reading experience with highlighting and note-taking capabilities.
- **Duplicate Detection**: Smart content hashing prevents you from saving the same article twice.
- **Rich Metadata**: Automatically extracts titles, descriptions, favicons, and thumbnails.

### 🔐 Enterprise-Grade Security & Auth
- **Multi-Provider Auth**: Seamless sign-in with Google, GitHub, and Email/Password via NextAuth v5.
- **Role-Based Access**: Granular permissions system supporting Free, Pro, Team, and Enterprise tiers.
- **API Access**: Generate secure API keys to integrate TagIt.ai into your custom workflows and tools.

### 🎨 Modern UI/UX
- **Beautiful Interface**: Built with Shadcn UI and Tailwind CSS for a premium, accessible, and responsive feel.
- **Dark Mode**: Fully supported system-aware dark mode for comfortable reading at night.
- **Responsive Design**: Optimized experience across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **AI Engine**: [Google Gemini](https://deepmind.google/technologies/gemini/) (via Vercel AI SDK)
- **Vector Search**: Google Text Embeddings

## 🏁 Getting Started

Follow these steps to set up the project locally for development.

### Prerequisites

- **Node.js**: Version 18 or higher
- **PostgreSQL**: A running PostgreSQL instance (local or cloud providers like Neon/Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tagit.ai.git
   cd tagit.ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory. You can use `.env.example` as a reference if available.
   
   ```env
   # Database Connection
   DATABASE_URL="postgresql://user:password@localhost:5432/tagit_db"

   # Authentication (NextAuth)
   AUTH_SECRET="your-super-secret-key-generate-with-openssl-rand-base64-32"
   
   # OAuth Providers (Optional for local dev if using Credentials)
   AUTH_GOOGLE_ID="your-google-client-id"
   AUTH_GOOGLE_SECRET="your-google-client-secret"
   AUTH_GITHUB_ID="your-github-client-id"
   AUTH_GITHUB_SECRET="your-github-client-secret"

   # AI Configuration (Google Gemini)
   GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"
   ```

4. **Database Setup**
   Push the Prisma schema to your database to create the tables:
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure

```
tagit.ai/
├── app/                  # Next.js App Router pages & API routes
│   ├── (dashboard)/      # Protected dashboard routes (Bookmarks, Collections, Settings)
│   ├── api/              # Backend API endpoints (AI, Auth, Bookmarks, Search)
│   ├── auth/             # Authentication pages (Login, Signup)
│   └── reader/           # Distraction-free reader view
├── components/           # Reusable UI components (Shadcn UI, Custom)
├── lib/                  # Utility functions, DB configuration, and AI helpers
├── prisma/               # Database schema and migrations
├── public/               # Static assets (images, fonts)
└── types/                # TypeScript type definitions
```

## 🤝 Contributing

We welcome contributions from the community! Whether it's fixing bugs, improving documentation, or proposing new features, your help is appreciated.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
