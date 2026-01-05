# PetMatch — React Practice Project (Swipe-Based Pet Discovery)

PetMatch is a **React single-page application (SPA)** prototype built as a practice project for a “pet matching” concept: users can **browse pets via a swipe-style UI**, apply filters, view pet/shop details, and access a **chat flow prepared for future real-time messaging**. The system uses a React frontend with a Node.js/Express REST API and MongoDB (via Mongoose) for persistence. :contentReference[oaicite:0]{index=0}

> Note: This is an **educational prototype**. It is not production-hardened or deployed by default.

---

## Demo

- Demo video (prototype): https://youtu.be/rU8-W6YDKtk

---

## Core Features

### Pet matching (swipe UX)
- Swipe-based discovery experience (left = skip, right = interested)
- Filter options (e.g., pet type/breed/traits)
- Pet cards load dynamically from the backend and keep the feed responsive via prefetching patterns described in the report

### Pet & shop detail pages
- Each pet card links into a “detail-style” view (pet profile + shop info), designed to mimic an e-commerce product detail experience

### Authentication + protected areas
- JWT-based authentication with a client-side auth state managed via React Context (AuthContext)
- Backend checks to ensure only authenticated users can access protected resources (e.g., chat/messages)

### Chat (structure prepared)
- Chat data model and routes are designed to support a future upgrade to WebSocket-based real-time messaging

---
## Screenshots

- 

---

## Tech Stack (Prototype)

**Frontend**
- React (Create React App)
- React Router DOM (SPA routing)
- Axios (API calls)
- CSS Modules (scoped styling + consistent palette)

**Backend**
- Node.js + Express (REST API)
- JWT authentication (24h expiry in prototype)
- Rate limiting (prototype protection against runaway loops during testing)
- CORS middleware for cross-origin local dev

**Database**
- MongoDB (MongoDB Atlas in prototype)
- Mongoose ODM with core collections: User, Pet, BlogPost, Match, Message

---

## Architecture Overview (High Level)

The prototype follows a layered architecture:
- **Presentation layer:** React SPA (localhost:3000)
- **Application/API:** Node.js/Express (localhost:5000) + REST endpoints
- **Service layer:** JWT verification, swipe logging, throttling/rate limiting
- **Data access:** Mongoose models
- **Storage:** MongoDB (Atlas in the prototype report)

---

## Local Development (Typical Setup)

> I’m providing a practical “standard” setup below. If your repo structure differs (e.g., not split into `client/` and `server/`), adjust the folder names accordingly.

### 1) Prerequisites
- Node.js (LTS recommended)
- npm (or yarn)
- MongoDB (Atlas or local MongoDB instance)

### 2) Install dependencies

If you have a monorepo:
```bash
npm install
