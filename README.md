# STB-Blog

### Table of content
- Getting Started
- Installation
- Features
- Project Dependencies
- State Management
- User Authentication
- CRUD Operations for Post, comments and likes.
- Deployment

## Getting Started

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Code Layout

```
📁 .github
      └─ 📁 workflows
          └─ CI with pnpm cache setup
📁 .vscode
      └─ Recommended extensions and settings for VSCode users
📁 docs ==> provides the styleguide and convention to note before contributing
📁 data ==> provides the posts and authors schema for contentlayer
📁 prisma
    ├─ 📁 migrations
    ├─ dev.db
    ├─ migration.sql
    └─ schema.prisma
📁 src
    ├─ 📁 app
    ├─ 📁 components
    └─ 📁 lib
📁 public (hosts the static file)
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Installation


## Features
#### Frontend

#### API


## Project Dependencies


## State Management


## User Authentication

## Database Integration
The STB-test database integration sets up the popular prisma ORM with a LibSQL Database hosted with Turso.

`Turso` is an edge-hosted, distributed database that's based on `libSQL`, an open-source and open-contribution fork of SQLite, this setup greatly minimize query latency and is easily scalable.

### Setup

Steps to replicate

Step1: Create a database on Turso

**Production deployment**

**Prerequisites**

You will need to have the following tools installed:

- [Node.js](https://nodejs.org/en/download) version 16.13 or later
- [Turso CLI](https://docs.turso.tech/reference/turso-cli)

```bash
# To create a database, run the following command on your terminal:
turso db create turso-prisma

# Create an authentication token that will allow you to connect to the database:
turso db tokens create turso-prisma

# Next, reveal the connection string details to connect to your database:
turso db show turso-prisma --url
```
Next, save the connection string and auth token for your database as seen below.
```
DATABSE_URL=
TURSO_AUTH_TOKEN=
```

**Local deployment**
- Create a file named `dev.db` in the prisma folder
- Set the environment variable `DATABASE_URL="file:./prisma/dev.db"` as such


Step 2: Run Database migrations.
From the `package.json` script run
```bash
pnpm db-setup
```



## CRUD Operations for Post, Comments and Likes.


## Deployment
### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
