# 🎬 Angular Movie App Demo

## Description

A clean and modular Angular demo app where you can:

```➕ Add new movies
👁️ Preview movie details
❌ Delete existing movies
🧑 Add actors
🎭 Attach actors to movies
⭐ Rate each movie from 1 to 10
```

This project demonstrates the use of Angular 17, Reactive Forms, Modular Architecture, Material Dialogs, and RxJS to build a reactive and maintainable frontend with a fake backend powered by json-server.

## 🚀 Getting Started

Clone the repository and install dependencies:

1. git clone <https://github.com/mikavuk/angular-movie-app-demo.git>

2. cd angular-movie-app-demo
3. npm install

## 🧾 Scripts

Start the fake backend server:

```bash
npm run start-server
```

Start the Angular development server:

```bash
npm start
```

## 🛠️ Tech Stack

- Angular 17 — Frontend framework

- RxJS — Reactive programming

- Angular Material — Dialogs & styling

- json-server — Mock REST API using db.json

- TypeScript — Strict typing

- SCSS — Component styling

## 📁 Project Structure

```bash
src/
└──app/
   ├── core/ # Shared core services
   ├── shared/
   ├── features/
   │   ├── movies/
   │   └── actors/
   └── app.module.ts
```

## 💾 Backend Notes

- The app uses json-server to simulate RESTful APIs.

- All movie and actor data is stored in db.json

- Supports GET, POST, PUT, DELETE out of the box

## 📸 UI Features

- Modal Dialogs for adding/editing movies

- Multi-select dropdown for actor selection

- Form validations with error messages

- Live filtering of movies and actors

- Custom rating component
