# PetMatch — React Practice Project (Swipe-Based Pet Discovery)

PetMatch is a **React single-page application (SPA)** prototype built as a practice project for a “pet matching” concept: users can **browse pets via a swipe-style UI**, apply filters, view pet/shop details, and access a **chat flow prepared for future real-time messaging**. The system uses a React frontend with a Node.js/Express REST API and MongoDB (via Mongoose) for persistence.

> Note: This is an **educational prototype**. It is not production-hardened or deployed by default.

---

## Demo

- Demo video (prototype): [https://youtu.be/rU8-W6YDKtk](https://youtu.be/R6RgSYZyfNM)

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

![title screen](https://github.com/bububoy0907/pet-match/blob/main/media/main_page.png?raw=1)

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
```
If you have separate frontend/backend folders:
```bash
# frontend
cd client
npm install

# backend
cd ../server
npm install
```
### 3) Environment variables (backend)
Create a .env file in your backend folder (example keys):
```ini
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_for_dev_only
PORT=5000
```
### 4) Run locally
Backend:
```bash
npm run dev
# or: npm start
```
Frontend:
```bash
npm start
```
Default ports referenced in the project report:
React SPA: http://localhost:3000
Express API: http://localhost:5000

---

## Routes & Pages (Prototype)

Client routes used in the prototype:

- `/` — swipe home
- `/pet/:id`
- `/shop/:id`
- `/chat/:shopId`
- `/login`

---

## API Notes (Prototype-Level)

The report describes REST endpoints and patterns such as:

- `POST /auth/register` — user registration flow
- swipe logging via a `/swipes` endpoint pattern
- CRUD-style routes for pets / users / matches / messages 

### Authentication
- JWT (HS256 in the prototype)
- token expiry: 24 hours (prototype setting) 

---

## Engineering Notes (What I Learned / Implemented)

- **Auth state propagation:** migrated from prop-drilling to **React Context (AuthContext)** so header/login state updates immediately without refresh. 
- **Local dev CORS:** resolved cross-origin issues between SPA (3000) and API (5000) using Express CORS middleware.
- **Data modeling:** implemented Mongoose schemas for core collections (User / Pet / Match / Message / BlogPost), including a compound uniqueness constraint for matches in the report’s design.

---

## Future Improvements (Planned)

- WebSocket-based chat for true real-time messaging
- Enhanced matching (machine learning-driven improvements proposed)
- Admin panel for monitoring / verification / analytics

---
